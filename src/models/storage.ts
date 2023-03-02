import { _ } from 'svelte-i18n';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { writableDerived } from "svelte-writable-derived";

import type { IGroupModel, IItemModel, IStorageModel } from '../types/storage';
import type IBackend from '../types/backend';
import { Group, Item } from '../types/data';

import { isUserLogged } from './user';
import { firebaseBackend } from '../backend/firebase';

let loadedBackend: IBackend = firebaseBackend;

let _defaultGroup = new Group("default_group", get(_)("nav.all_items"));

const _findItemById = (id: string, group = _defaultGroup): Item => group.items.find((groupItem) => groupItem.id === id) || {} as Item;
const _findGroupById = (id: string): Group => get(storage).find((storageGroup: Group) => storageGroup.id === id) || {} as Group;

const _findItemIndexById = (id: string, group = _defaultGroup): number => group.items.findIndex((groupItem) => groupItem.id === id);
const _findGroupIndexById = (id: string): number => get(storage).findIndex((storageGroup) => storageGroup.id === id);


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
    (group: any) => group.items?.sort(group.sortFunction).map((item: Item, index: number) => { item.groupIndex = index; return item; }),
    (items) => items);

const selectedIndex: Writable<number> = writable(-1);

const timeForSave = 1000;
let needSave = false;
let saveTimeout = null;

const setupUpdate = function (_item) {
    clearTimeout(saveTimeout);
    needSave = true;
    saveTimeout = setTimeout(() => {
        needSave = false;
        item.update(_item);
    }
        , timeForSave);
}
const forceUpdate = function (_item) {
    if (needSave) {
        clearTimeout(saveTimeout);
        needSave = false;
        item.update(_item);
    }
}

const selectedItem: Writable<Item> = writableDerived(selectedIndex,
    ($s) => _defaultGroup.items[$s] || {} as Item,
    (value: Item) => {
        const prevItem = _defaultGroup.items[get(selectedIndex)];
        if (!value.id)
            return -1;
        if (value.id === prevItem?.id) {
            setupUpdate(value);
            return get(selectedIndex);
        } else {
            if (prevItem)
                forceUpdate(prevItem);
            return _findItemIndexById(value.id);
        }
    });

selectedGroup.subscribe((group: Group) => {
    if (!group.items)
        return;
    if (group.items.length > 0) {
        const _selectedItem: Item = get(selectedItem);
        const index: number = _selectedItem.id ? _findItemIndexById(_selectedItem.id, group) : 0;

        selectedItem.set(group.items[index !== -1 ? index : 0]);
    } else
        selectedItem.set({} as Item);
});

const _removeItemFromGroupOnly = (group: Group, id: string, dontUpdateStores = false) => {
    group.items.splice(group.items.findIndex((it) => it.id === id), 1);
    if (!dontUpdateStores)
        storage.update(_storage => _storage);
}
const _removeGroupFromItemOnly = (item: Item, groupId: string, dontUpdateStores = false) => {
    const _index: number = item.groups.findIndex((_g) => _g === groupId);
    item.groups.splice(_index, 1);

    if (get(selectedItem).id === item.id && !dontUpdateStores)
        _updateSelectedItemGroups(item);
}

const _removeItemFromGroup = (group: Group, item: Item, dontUpdateStores = false) => {
    _removeGroupFromItemOnly(item, group.id, dontUpdateStores);
    _removeItemFromGroupOnly(group, item.id, dontUpdateStores);
}
const _addItemToGroup = (group: Group, item: Item, dontUpdateStores = false) => {
    group.items.push(item);
    item.groups.push(group.id);

    if (!dontUpdateStores)
        storage.update(_storage => _storage);

    if (get(selectedItem).id === item.id && !dontUpdateStores)
        _updateSelectedItemGroups(item);
}

const _updateSelectedItemGroups = (item: Item) => {
    selectedItem.update(_item => {
        _item.groups = item.groups;
        return item;
    })
}

const _updateGroup = function (group: Group) {
    group.modifyDate = new Date();
    loadedBackend.updateGroup(group);
}

const _updateItem = function (item: Item) {
    item.modifyDate = new Date();
    loadedBackend.updateItem(item);
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
    remove: async function (groupId: string) {
        const _groupIndex: number = _findGroupIndexById(groupId);

        if (_groupIndex === 0)
            return;

        const _storage: Group[] = get(storage);
        const _group: Group = _storage[_groupIndex];

        _defaultGroup.items.forEach((_item) => {
            _removeGroupFromItemOnly(_item, _group.id);
            loadedBackend.updateItem(_item);
        });

        storage.update(_storage => {
            _storage.splice(_groupIndex, 1);
            return _storage;
        });

        if (get(selectedGroupIndex) === _groupIndex)
            group.selectDefault();

        return await loadedBackend.removeGroup(_group);
    },
    select: function (group: Group) {
        const groupIndex: number = _findGroupIndexById(group.id);
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
    itemIndexInGroup: (item: Item, group: Group) => group.items ? group.items.findIndex((_item: Item) => _item.id === item?.id) : -1,
    addItem: function (group: Group, item: Item) {
        if (Storage.group.itemIndexInGroup(item, group) !== -1)
            return;

        _addItemToGroup(group, item);
        _updateGroup(group);
        if (get(selectedItem).id !== item.id)
            _updateItem(item);
    },
    removeItem: function (group: Group, item: Item) {
        if (Storage.group.itemIndexInGroup(item, group) === -1)
            return;

        _removeItemFromGroup(group, item);
        _updateGroup(group);
        if (get(selectedItem).id !== item.id)
            _updateItem(item);
    },
    setForItem: function (item: Item, groupsId: Group[] | string[]) {
        const _storage = get(storage);

        _storage.forEach((_group) => {
            if (_group.id === _defaultGroup.id)
                return;

            const setListHaveGroupId = groupsId.findIndex((_id) => _id === _group.id || _id.id === _group.id) !== -1;
            const isItemInGroup = group.itemIndexInGroup(item, _group) !== -1;

            if (setListHaveGroupId) {

                if (!isItemInGroup) {
                    _addItemToGroup(_group, item, true);
                    _updateGroup(_group);
                }
            } else {
                if (isItemInGroup) {
                    _removeItemFromGroup(_group, item, true);
                    _updateGroup(_group);
                }
            }
        });
        storage.update(_storage => _storage);
        if (get(selectedItem).id === item.id)
            selectedItem.set(item);
        _updateItem(item);
    },
    sort: function (group: Group, method = () => 0) {
        group.sortFunction = method;

        if (group.id === get(selectedGroup).id)
            selectedGroup.update(group => group);

        return group;
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
    remove: async function (itemId: any) {
        const _index: number = _findItemIndexById(itemId);
        const _item: Item = _defaultGroup.items[_index];

        _item.groups.forEach((groupId: string) => _removeItemFromGroupOnly(_findGroupById(groupId), _item.id));

        _removeItemFromGroupOnly(_defaultGroup, _item.id);

        if (get(selectedGroup).items.length > 0) {
            if (get(selectedIndex) === _index)
                item.selectIndex(0);
        } else
            item.unSelect();

        selectedGroup.update(group => group);

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