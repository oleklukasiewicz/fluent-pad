import { writableDerived } from "svelte-writable-derived";
import { derived } from "svelte/store";

import * as user from "../models/UserModel";
import * as ui from "../models/UiModel";
import * as storage from "../models/StorageModel";

export const control = storage.group;
export const itemControl = storage.item;

export const selectedGroup = writableDerived(storage.selectedGroup, (s) => s, (s) => s);
export const groups = writableDerived(storage.storage, (s) => s, (s) => s);

export const userName = derived(user.userName, $name => $name);
export const userPicture = derived(user.userPicture, $pic => $pic);
export const isUserLogged = derived(user.isUserLogged, $isLogged => $isLogged);

export const logout = user.user.logout;

export const isMobileView = derived(ui.isMobileView, $isMobile => $isMobile);

export const loadAllData = storage.loadAllDataFromFirebase;
