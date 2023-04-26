import { get, writable, type Writable } from "svelte/store";

import { firebaseUserAPI } from "$api/firebase";

import type { IUserModel, User } from "$type/user";

import { group, clearStorage } from "./storage";
import { settingsModel } from "./settings";

export const isUserLogged: Writable<boolean> = writable(false);
export const userName: Writable<string> = writable(null);
export const userPicture: Writable<string> = writable(null);

export const user: IUserModel = {
  login: async function () {
    const _user: User = await firebaseUserAPI.login();

    if (_user.uid === null) return false;

    isUserLogged.set(true);
    userName.set(_user.displayName);
    userPicture.set(_user.photoURL);

    return true;
  },
  logout: async function () {
    await firebaseUserAPI.logout();

    isUserLogged.set(false);
    userName.set(null);
    userPicture.set(null);

    return true;
  },
};

isUserLogged.subscribe(async (isLogged: boolean) => {
  if (isLogged) {
    await settingsModel.load();
    await group.loadAll();
    
    const startupGroup = group.get(get(settingsModel.startupGroupId));

    if (startupGroup?.id) group.select(startupGroup);
    else group.selectDefault();
  
  } else {
    clearStorage();
    settingsModel.loadDefault();
  }
});
