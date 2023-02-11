import { derived } from 'svelte/store';
import { writableDerived, propertyStore } from "svelte-writable-derived";

import * as storage from '../models/StorageModel';
import * as groupViewModel from './GroupViewModel';

import type { Item } from '../data/Data';

export const control = storage.item;

export const group = writableDerived(storage.selectedGroup, (s) => s, (s) => s);
export const title = propertyStore(storage.selectedGroup, "title");
export const isDefaultGroup = derived(storage.selectedGroupIsDefault, (s: any) => s);

export const items = derived(storage.selectedGroupItems, ($selItems: Item[]) => $selItems);
export const selectedItem = writableDerived(storage.selectedItem, (s) => s, (s) => s);

export const isItemExpanded = writableDerived(groupViewModel.isListHidden, (isHidden) => isHidden, (isHidden) => isHidden);
