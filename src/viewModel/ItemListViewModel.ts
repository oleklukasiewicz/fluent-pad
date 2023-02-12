import { derived, type Readable, type Writable } from 'svelte/store';
import { writableDerived, propertyStore } from "svelte-writable-derived";

import { Storage } from '../models/Storage';
import * as groupViewModel from './GroupViewModel';

import type { Group, Item } from '../types/Data';
import type { IItemModel } from '../types/Storage';

export const control: IItemModel = Storage.item;

export const group: Writable<Group> = writableDerived(Storage.group.selectedGroup, (s) => s, (s) => s);
export const title: Writable<string> = propertyStore(Storage.group.selectedGroup, "title");
export const isDefaultGroup: Readable<boolean> = derived(Storage.group.selectedGroupIsDefault, (s: any) => s);

export const items: Readable<Item[]> = derived(Storage.group.selectedGroupItems, ($selItems: Item[]) => $selItems);
export const selectedItem: Writable<Item> = writableDerived(Storage.item.selectedItem, (s) => s, (s) => s);

export const isItemExpanded: Writable<boolean> = writableDerived(groupViewModel.isListHidden, (isHidden) => isHidden, (isHidden) => isHidden);
