import { writable, type Writable } from "svelte/store";
import { firebaseBackend } from "../backend/firebase";
import type { User } from "../types/User";

export const isUserLogged: Writable<boolean> = writable(false);
export const userName: Writable<string> = writable(null);
export const userPicture: Writable<string> = writable(null);

export const user =
{
    login: async function () {
        const _user: User = await firebaseBackend.loadUser();

        if (_user.uid === null)
            return false;

        isUserLogged.set(true);
        userName.set(_user.displayName);
        userPicture.set(_user.photoURL);
    },
    logout: async function () {
        await firebaseBackend.logoutUser();

        isUserLogged.set(false);
        userName.set(null);
        userPicture.set(null);
    }
}
