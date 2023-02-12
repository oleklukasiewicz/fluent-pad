import { writableDerived, propertyStore } from "svelte-writable-derived";
import { derived, get, type Readable, type Writable } from "svelte/store";
import type { Group, Item } from "../types/Data";

import { Storage } from "../models/Storage";
import type { IGroupModel, IItemModel } from "../types/Storage";
import { isListHidden } from "./GroupViewModel";

export const control: IItemModel = Storage.item;
export const groupControl: IGroupModel = Storage.group;

export const group: Writable<Group> = writableDerived(Storage.group.selectedGroup, (s) => s, (s: Group) => s);
export const item: Writable<Item> = writableDerived(Storage.item.selectedItem, (s) => s, (s: Item) => s);

export const id: Writable<string> = propertyStore(Storage.item.selectedItem, "id");
export const title: Writable<string> = propertyStore(Storage.item.selectedItem, "title");
export const content: Writable<string> = propertyStore(Storage.item.selectedItem, "content");
export const groups: Readable<Group[]> = derived(Storage.item.selectedItem, (val) => val.groups ? val.groups.map((_group: string) => {
    const currentGroup = get(Storage.group.selectedGroup);
    if (_group !== currentGroup.id)
        return Storage.group.get(_group) || {} as Group;
    else
        return currentGroup;
}) : []);

export const isItemExpanded: Writable<boolean> = writableDerived(isListHidden, (isHidden) => isHidden, (isHidden) => isHidden);
