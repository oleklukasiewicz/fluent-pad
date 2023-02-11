import { derived, get, writable, type Writable } from 'svelte/store';
import { writableDerived } from "svelte-writable-derived";
import { Group, Item } from '../data/Data';
import {
    addGroupToFirestore, addItemToFirestore, GenerateGroupId, GenerateItemId, removeGroupInFirestore, removeItemInFirestore, updateGroupInFirestore, updateItemInFirestore, loadGroupsFromFirestore,
    loadItemsFromFirestore
} from '../backend/firebase';
import { isUserLogged } from './UserModel';

let _defaultGroup = new Group("default_group", "All items");
let _blankGroup = new Group("blank_group", "No group");
let _blankItem = new Item("blank_item", "No item");

const _resolveGroupId = (group: any) => typeof (group) === "object" ? group.id : group;
const _resolveItemId = (item: any) => typeof (item) === "object" ? item.id : item;

const _resolveItem = (item: any, group = _defaultGroup) => typeof (item) === "object" ? item : _findItemById(item, group);
const _resolveGroup = (group: any) => typeof (group) === "object" ? group : _findGroupById(group);

const _findItemById = function (item: any, group = _defaultGroup): Item {
    let id = _resolveItemId(item);
    return group.items.find((groupItem) => groupItem.id === id) || _blankItem;
}
const _findGroupById = function (group: any): Group {
    let id = _resolveGroupId(group);
    return get(storage).find((storageGroup: Group) => storageGroup.id === id) || _blankGroup;
}

const _findItemIndexById = function (item: any, group = _defaultGroup): number {
    let id = _resolveItemId(item);
    return group.items.findIndex((groupItem) => groupItem.id === id);
}
const _findGroupIndexById = function (group: any): number {
    let id = _resolveGroupId(group);
    return get(storage).findIndex((storageGroup) => storageGroup.id === id);
}

export const storage: Writable<Group[]> = writable([]);
get(storage).push(_defaultGroup);

export const selectedGroupIndex: Writable<number> = writable(-1);

export const selectedGroup: Writable<any> = writableDerived(selectedGroupIndex,
    ((s) => get(storage)[s] || {}),
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

export const selectedGroupIsDefault: any = derived(selectedGroup, ($group: any) => $group.id === _defaultGroup.id);
export const selectedGroupItems: Writable<Item[]> = writableDerived(selectedGroup,
    (group: any) => group.items?.map((item: Item, index: number) => { item.groupIndex = index; return item; }),
    (reflecting: any, object: any) => {
        object.items = reflecting;
        return object;
    });

export const selectedIndex: Writable<number> = writable(-1);

export const selectedItem: Writable<any> = writableDerived(selectedIndex,
    (s) => _defaultGroup.items[s] || {},
    (value: Item) => {
        if (!value.id)
            return -1;
        if (value.id === _defaultGroup.items[get(selectedIndex)]?.id)
            item.update(value);
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
        selectedItem.set({});
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

export let group =
{
    load: function (group: Group) {
        storage.update(_storage => {
            _storage.push(group);
            return _storage;
        });
    },
    loadAllFromFirebase: async () =>
        await (
            await loadGroupsFromFirestore()
        ).forEach((_item) => group.load(_item)),
    add: async function (_group: Group) {
        _group.id = GenerateGroupId();

        group.load(_group);
        group.select(_group);

        addGroupToFirestore(_group, _group.id);
    },
    update: function (group: Group) {
        if (get(selectedGroup).id === group.id)
            selectedGroup.set(group);
        updateGroupInFirestore(group);
    },
    remove: function (__group: string) {
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

                updateItemInFirestore(_item);
            });
            storage.set(_storage);

            if (get(selectedGroupIndex) === _groupIndex)
                group.selectDefault();

            //event
            removeGroupInFirestore(_group);
        }
    },
    select: function (group: Group) {
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
    getAll: () => get(storage).slice(1),
    getDefault: () => _defaultGroup,
    get: (groupId: string) => _findGroupById(groupId),
    itemIndexInGroup: (itemArg: any, groupArg: any) => {
        const group: Group = _resolveGroup(groupArg);
        const item: Item = _resolveItem(itemArg);

        return group.items.findIndex((_item: Item) => _item.id === item?.id);
    },
    addItem: function (group: any, item: any) {
        const _group: Group = _resolveGroup(group);
        const _item: Item = _resolveItem(item);

        _group.items.push(_item);
        _item.groups.push(_group.id);

        _updateSelectedItemGroups(_item);
    },
    removeItem: function (group: any, item: any) {
        const _group: Group = _resolveGroup(group);
        const _item: Item = _resolveItem(item);

        _removeItemFromGroup(_group, _item.id);

        const _index: number = _item.groups.findIndex((_g) => _g === _group.id)
        _item.groups.splice(_index, 1);

        _updateSelectedItemGroups(_item);

        updateItemInFirestore(_item);
    }
}
export let item =
{
    load: function (item: Item) {
        _defaultGroup.items.push(item);
        item.groups.forEach((groupId) => _findGroupById(groupId)?.items.push(item));
        //event
    },
    loadAllFromFirebase: async () =>
        await (
            await loadItemsFromFirestore()
        ).forEach((_item: Item) => item.load(_item)),
    add: async function (newItem: Item) {
        newItem.id = GenerateItemId();
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
        addItemToFirestore(newItem, newItem.id);

    },
    update: function (item: Item) {
        if (get(selectedItem).id === item)
            selectedItem.set(item);
        updateItemInFirestore(item);
    },
    remove: function (rItem: any) {
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
        removeItemInFirestore(_item);
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
    get: (itemId: string, group: Group) => _findItemById(itemId, group)
}
export let loadAllDataFromFirebase = async () => {
    await group.loadAllFromFirebase();
    await item.loadAllFromFirebase();
}
export let clearAllData = () => {
    storage.set([_defaultGroup]);
    _defaultGroup.items = [];
}
isUserLogged.subscribe(async (isLogged: boolean) => {
    if (isLogged) {
        await loadAllDataFromFirebase();
        group.selectDefault();
    } else {
        clearAllData();
    }
});