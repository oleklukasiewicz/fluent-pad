import { writableDerived, propertyStore } from "svelte-writable-derived";
import { derived, get, type Readable, type Writable } from "svelte/store";
import type { Group, Item } from "../data/Data";

import * as storage from "../models/Storage";
import { isListHidden } from "./GroupViewModel";

export const control: object = storage.item;
export const groupControl: object = storage.group;

export const group: Writable<Group> = writableDerived(storage.selectedGroup, (s) => s, (s: Group) => s);
export const item: Writable<Item> = writableDerived(storage.selectedItem, (s) => s, (s: Item) => s);

export const id: Writable<string> = propertyStore(storage.selectedItem, "id");
export const title: Writable<string> = propertyStore(storage.selectedItem, "title");
export const content: Writable<string> = propertyStore(storage.selectedItem, "content");
export const groups: Readable<Group[]> = derived(storage.selectedItem, (val) => val.groups ? val.groups.map((_group: string) => {
    const currentGroup = get(storage.selectedGroup);
    if (_group !== currentGroup.id)
        return storage.group.get(_group) || {} as Group;
    else
        return currentGroup;
}) : []);

export const isItemExpanded: Writable<boolean> = writableDerived(isListHidden, (isHidden) => isHidden, (isHidden) => isHidden);
