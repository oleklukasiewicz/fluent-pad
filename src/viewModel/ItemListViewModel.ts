import { derived, type Readable, type Writable } from 'svelte/store';
import { writableDerived, propertyStore } from "svelte-writable-derived";

import * as storage from '../models/Storage';
import * as groupViewModel from './GroupViewModel';

import type { Group, Item } from '../data/Data';

export const control: object = storage.item;

export const group: Writable<Group> = writableDerived(storage.selectedGroup, (s) => s, (s) => s);
export const title: Writable<string> = propertyStore(storage.selectedGroup, "title");
export const isDefaultGroup: Readable<boolean> = derived(storage.selectedGroupIsDefault, (s: any) => s);

export const items: Readable<Item[]> = derived(storage.selectedGroupItems, ($selItems: Item[]) => $selItems);
export const selectedItem: Writable<Item> = writableDerived(storage.selectedItem, (s) => s, (s) => s);

export const isItemExpanded: Writable<boolean> = writableDerived(groupViewModel.isListHidden, (isHidden) => isHidden, (isHidden) => isHidden);
