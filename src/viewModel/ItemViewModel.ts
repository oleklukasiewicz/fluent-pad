import { writableDerived, propertyStore } from "svelte-writable-derived";
import { derived, get } from "svelte/store";
import type { Group, Item } from "../data/Data";

import * as storage from "../models/StorageModel";
import { isListHidden } from "./GroupViewModel";

export const control = storage.item;
export const groupControl = storage.group;

export const group = writableDerived(storage.selectedGroup, (s) => s, (s: Group) => s);
export const item = writableDerived(storage.selectedItem, (s) => s, (s: Item) => s);

export const id = propertyStore(storage.selectedItem, "id");
export const title = propertyStore(storage.selectedItem, "title");
export const content = propertyStore(storage.selectedItem, "content");
export const groups = derived(storage.selectedItem, (val) => val.groups ? val.groups.map((_group: string) => {
    if (_group !== get(group).id)
        return storage.group.get(_group) || {};
    else
        return get(group);
}) : []);

export const isItemExpanded = writableDerived(isListHidden, (isHidden) => isHidden, (isHidden) => isHidden);
