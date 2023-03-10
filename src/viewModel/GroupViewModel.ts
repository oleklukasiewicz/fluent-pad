import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { writableDerived } from "svelte-writable-derived";

import { Storage } from '../models/storage';

import type { Group, Item } from '../types/data';
import type { IItemModel, IGroupModel } from '../types/storage';
import { isMobileView as isMobile } from '../models/ui';

export const control: IItemModel = Storage.item;
export const groupControl: IGroupModel = Storage.group;

export const groups: Readable<Group[]> = derived(Storage.storage, ($groups: Group[]) =>Storage.group.getAll() || []);
export const group: Writable<Group> = writableDerived(Storage.group.selectedGroup, (s) => s, (s) => s);
export const isDefaultGroup: Readable<boolean> = derived(Storage.group.selectedGroupIsDefault, (s: any) => s);

export const items: Readable<Item[]> = derived(Storage.group.selectedGroupItems, ($selItems: Item[]) => $selItems || []);
export const selectedItem: Writable<Item> = writableDerived(Storage.item.selectedItem, (s) => s, (s) => s);

export const isListHidden: Writable<boolean> = writable(false);

export const isMobileView = derived(isMobile, $S => $S);