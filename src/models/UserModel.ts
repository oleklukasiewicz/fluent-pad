import { writable } from "svelte/store";
import { userAuth, userLogOut } from "../backend/firebase";
import type { User } from "../data/User";

export const isUserLogged = writable(false);
export const userName = writable(null);
export const userPicture = writable(null);

export const user =
{
    login: async function () {
        const _user: any = await userAuth();

        if (_user.uid === null)
            return false;

        isUserLogged.set(true);
        userName.set(_user.displayName);
        userPicture.set(_user.photoURL);
    },
    logout: async function () {
        await userLogOut();

        isUserLogged.set(false);
        userName.set(null);
        userPicture.set(null);
    }
}
