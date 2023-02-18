import { derived, type Readable } from "svelte/store";
import { isUserLogged, user } from "../models/User";

export const isLogged: Readable<boolean> = derived(isUserLogged, $isUserLogged => $isUserLogged);
export  const login = user.login;