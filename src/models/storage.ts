import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { writableDerived } from "svelte-writable-derived";
import { Group, Item } from '../types/data';
import { isUserLogged } from './user';
import type IBackend from '../types/backend';
import { firebaseBackend } from '../backend/firebase';
import type { IGroupModel, IItemModel, IStorageModel } from '../types/storage';
import { _ } from 'svelte-i18n';

let loadedBackend: IBackend = firebaseBackend;

let _defaultGroup = new Group("default_group", get(_)("nav.all_items"));

const _resolveGroupId = (group: any) => typeof (group) === "object" ? group.id : group;
const _resolveItemId = (item: any) => typeof (item) === "object" ? item.id : item;

const _resolveItem = (item: any, group = _defaultGroup) => typeof (item) === "object" ? item : _findItemById(item, group);
const _resolveGroup = (group: any) => typeof (group) === "object" ? group : _findGroupById(group);

const _findItemById = function (item: any, group = _defaultGroup): Item {
    let id = _resolveItemId(item);
    return group.items.find((groupItem) => groupItem.id === id) || {} as Item;
}
const _findGroupById = function (group: any): Group {
    let id = _resolveGroupId(group);
    return get(storage).find((storageGroup: Group) => storageGroup.id === id) || {} as Group;
}

const _findItemIndexById = function (item: any, group = _defaultGroup): number {
    let id = _resolveItemId(item);
    return group.items.findIndex((groupItem) => groupItem.id === id);
}
const _findGroupIndexById = function (group: any): number {
    let id = _resolveGroupId(group);
    return get(storage).findIndex((storageGroup) => storageGroup.id === id);
}

const storage: Writable<Group[]> = writable([]);
get(storage).push(_defaultGroup);

const selectedGroupIndex: Writable<number> = writable(-1);
const selectedGroup: Writable<Group> = writableDerived(selectedGroupIndex,
    ((s) => get(storage)[s] || {} as Group),
    (value: Group) => {
        let index: any = get(selectedGroupIndex);
        let _old: Group = get(selectedGroup);

        if (index === -1)
            return;
        if (_old.id != value.id)
            index = _findGroupIndexById(value.id);
        else
            _updateSelectedItemGroups(get(selectedItem));

        storage.update((__storage) => {
            __storage[index] = value;
            return __storage;
        });
        return index;
    });

const selectedGroupIsDefault: Readable<boolean> = derived(selectedGroup, ($group: Group) => $group.id === _defaultGroup.id);
const selectedGroupItems: Writable<Item[]> = writableDerived(selectedGroup,
    (group: any) => group.items?.map((item: Item, index: number) => { item.groupIndex = index; return item; }),
    (reflecting: any, object: any) => {
        object.items = reflecting;
        return object;
    });

const selectedIndex: Writable<number> = writable(-1);

const timeForSave = 300;
let saveTimeout = null;

const selectedItem: Writable<Item> = writableDerived(selectedIndex,
    (s) => _defaultGroup.items[s] || {} as Item,
    (value: Item) => {
        if (!value.id)
            return -1;
        if (value.id === _defaultGroup.items[get(selectedIndex)]?.id) {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => item.update(value), timeForSave);
        }
        return _findItemIndexById(value.id);
    });

selectedGroup.subscribe((group: Group) => {
    if (!group.items)
        return;
    if (group.items.length > 0) {
        const _selectedItem: Item = get(selectedItem);
        const index: number = _selectedItem.id ? _findItemIndexById(_selectedItem, group) : 0;

        selectedItem.set(group.items[index !== -1 ? index : 0]);
    } else
        selectedItem.set({} as Item);
});
selectedItem.subscribe((value: Item) => {
    if (!value.id)
        return;

    let index = value.groupIndex;
    if (index != -1) {
        selectedGroupItems.update((items: Item[]) => {
            items.splice(index, 1, value);
            return items;
        })
    }
});

const _removeItemFromGroup = (group: Group, id: string) => {
    group.items.splice(group.items.findIndex((it) => it.id === id), 1);
    if (group.id === get(selectedGroup).id)
        selectedGroup.update(group => group);
}
const _updateSelectedItemGroups = (item: Item) => {
    selectedItem.update(_item => {
        _item.groups = item.groups;
        return item;
    })
}

const group: IGroupModel =
{
    load: async function (group: Group) {
        storage.update(_storage => {
            _storage.push(group);
            return _storage;
        });
        return group;
    },
    loadAll: async () =>
        await (
            await loadedBackend.loadGroups()
        ).forEach((_item) => group.load(_item)),
    add: async function (_group: Group) {
        _group.id = loadedBackend.generateGroupId();

        group.load(_group);
        group.select(_group);

        return await loadedBackend.addGroup(_group);
    },
    update: async function (group: Group) {
        group.modifyDate = new Date();
        if (get(selectedGroup).id === group.id)
            selectedGroup.set(group);
        return await loadedBackend.updateGroup(group);
    },
    remove: async function (__group: any) {
        const _groupIndex: number = _findGroupIndexById(__group);

        if (_groupIndex > 0) {
            const _storage: Group[] = get(storage);
            const _group: Group = _storage[_groupIndex];
            _storage.splice(_groupIndex, 1);

            _defaultGroup.items.forEach((_item) => {
                const _index: number = _item.groups.findIndex((_groupId) => _groupId === _group.id);
                if (_index === -1)
                    return;
                _item.groups.splice(_index, 1);

                if (get(selectedItem).id === _item.id)
                    _updateSelectedItemGroups(_item);

                loadedBackend.updateItem(_item);
            });
            storage.set(_storage);

            if (get(selectedGroupIndex) === _groupIndex)
                group.selectDefault();

            return await loadedBackend.removeGroup(_group);
        }
    },
    select: function (group: any) {
        const groupIndex: number = _findGroupIndexById(group);
        selectedGroupIndex.set(groupIndex);
        //event
    },
    selectIndex: function (index: number) {
        selectedGroupIndex.set(index);
        //event
    },
    selectDefault: function () {
        group.selectIndex(0);
    },
    getAll: () => get(storage).filter((group: Group) => group.id !== _defaultGroup.id),
    getDefault: () => _defaultGroup,
    get: (groupId: string) => _findGroupById(groupId),
    itemIndexInGroup: (itemArg: any, groupArg: any) => {
        const group: Group = _resolveGroup(groupArg);
        const item: Item = _resolveItem(itemArg);

        return group.items ? group.items.findIndex((_item: Item) => _item.id === item?.id) : -1;
    },
    addItem: function (group: any, item: any) {
        const _group: Group = _resolveGroup(group);
        const _item: Item = _resolveItem(item);

        if (Storage.group.itemIndexInGroup(_item, _group) !== -1)
            return;

        _group.items.push(_item);
        _group.modifyDate = new Date();

        _item.groups.push(_group.id);

        _updateSelectedItemGroups(_item);
        storage.update(_storage => _storage);

        loadedBackend.updateGroup(_group)
    },
    removeItem: function (group: any, item: any) {
        const _group: Group = _resolveGroup(group);
        const _item: Item = _resolveItem(item);

        if (Storage.group.itemIndexInGroup(_item, _group) === -1)
            return;

        _removeItemFromGroup(_group, _item.id);
        _group.modifyDate = new Date();

        const _index: number = _item.groups.findIndex((_g) => _g === _group.id);
        _item.groups.splice(_index, 1);

        _updateSelectedItemGroups(_item);
        storage.update(_storage => _storage);

        loadedBackend.updateGroup(_group);
        loadedBackend.updateItem(_item);
    },
    selectedGroup: selectedGroup,
    selectedGroupIndex: selectedGroupIndex,
    selectedGroupItems: selectedGroupItems,
    selectedGroupIsDefault: selectedGroupIsDefault,
}
const item: IItemModel =
{
    load: async function (item: Item) {
        _defaultGroup.items.push(item);
        item.groups.forEach((groupId) => {
            storage.update(_storage => {
                _findGroupById(groupId)?.items.push(item);
                return _storage;
            })
        });

        return item;
    },
    loadAll: async () =>
        await (
            await loadedBackend.loadItems()
        ).forEach((_item: Item) => item.load(_item)),
    add: async function (newItem: Item) {
        newItem.id = helpers.GenerateItemId();
        _defaultGroup.items.push(newItem);

        if (get(selectedGroupIndex) != 0) {
            newItem.groups.push(get(selectedGroup).id);

            selectedGroup.update(group => {
                group.items.push(newItem);
                return group;
            });
        } else
            selectedGroup.update(group => group);

        selectedItem.set(newItem);
        //event
        return await loadedBackend.addItem(newItem);

    },
    update: async function (item: Item) {
        item.modifyDate = new Date();
        let _item: Item = _findItemById(item.id) || {} as Item;
        _item = item;
        return await loadedBackend.updateItem(item);
    },
    remove: async function (rItem: any) {
        const _index: number = _findItemIndexById(rItem);
        const _item: Item = _defaultGroup.items[_index];

        _item.groups.forEach((groupId: string) => _removeItemFromGroup(_findGroupById(groupId), _item.id));

        _removeItemFromGroup(_defaultGroup, _item.id);

        if (get(selectedGroup).items.length > 0) {
            if (get(selectedIndex) === _index)
                item.selectIndex(0);
        } else
            item.unSelect();

        //event
        return await loadedBackend.removeItem(_item);
    },
    select: function (item: Item) {
        selectedItem.set(item);
    },
    selectIndex: function (index: number) {
        selectedItem.set(get(selectedGroup).items[index]);
    },
    unSelect: function () {
        selectedIndex.set(-1);
    },
    get: (itemId: string, group: Group) => _findItemById(itemId, group),
    getAll: () => _defaultGroup.items,

    selectedItem: selectedItem,
    selectedIndex: selectedIndex,
}
const helpers =
{
    GenerateGroupId: (): string => loadedBackend.generateGroupId(),
    GenerateItemId: (): string => loadedBackend.generateItemId(),
}
const loadAllData = async () => {
    await group.loadAll();
    await item.loadAll();
}
const clearAllData = async () => {
    storage.set([_defaultGroup]);
    _defaultGroup.items = [];
    selectedGroupIndex.set(-1);
    selectedIndex.set(-1);
}

isUserLogged.subscribe(async (isLogged: boolean) => {
    if (isLogged) {
        await loadAllData();
        group.selectDefault();
    } else {
        clearAllData();
    }
});

export let Storage: IStorageModel = {
    group: group,
    item: item,

    storage: storage,

    loadAllData: loadAllData,
    clearAllData: clearAllData,

    helpers: helpers
}