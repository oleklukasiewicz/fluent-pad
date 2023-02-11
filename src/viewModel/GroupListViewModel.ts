import { writableDerived } from "svelte-writable-derived";
import { derived, type Readable, type Writable } from "svelte/store";

import * as user from "../models/User";
import * as ui from "../models/UI";
import * as storage from "../models/Storage";
import type { Group } from "../data/Data";

export const control: object = storage.group;
export const itemControl: object = storage.item;

export const selectedGroup: Writable<Group> = writableDerived(storage.selectedGroup, (s) => s, (s) => s);
export const groups: Writable<Group[]> = writableDerived(storage.storage, (s) => s, (s) => s);

export const userName: Readable<string> = derived(user.userName, $name => $name);
export const userPicture: Readable<string> = derived(user.userPicture, $pic => $pic);
export const isUserLogged: Readable<boolean> = derived(user.isUserLogged, $isLogged => $isLogged);

export const logout = user.user.logout;

export const isMobileView: Readable<boolean> = derived(ui.isMobileView, $isMobile => $isMobile);

export const loadAllData = storage.loadAllDataFromFirebase;
