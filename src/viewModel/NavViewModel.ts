import { writableDerived } from "svelte-writable-derived";
import { derived, type Readable, type Writable } from "svelte/store";

import * as user from "../models/user";
import * as ui from "../models/ui";
import { Storage } from "../models/storage";
import type { Group } from "../types/data";
import type { IGroupModel, IItemModel } from "../types/storage";

export const groupControl: IGroupModel = Storage.group;
export const itemControl: IItemModel = Storage.item;

export const selectedGroup: Writable<Group> = writableDerived(Storage.group.selectedGroup, (s) => s, (s) => s);
export const groups: Writable<Group[]> = writableDerived(Storage.storage, (s) => s, (s) => s);

export const userName: Readable<string> = derived(user.userName, $name => $name);
export const userPicture: Readable<string> = derived(user.userPicture, $pic => $pic);
export const isUserLogged: Readable<boolean> = derived(user.isUserLogged, $isLogged => $isLogged);

export const logout = user.user.logout;

export const isMobileView: Readable<boolean> = derived(ui.isMobileView, $isMobile => $isMobile);

export const loadAllData = Storage.loadAllData;
