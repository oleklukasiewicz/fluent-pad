import { derived, type Readable } from "svelte/store";
import { isUserLogged, user } from "$model/user";
import { isMobileView as isMobile } from "$model/ui";

export const isLogged: Readable<boolean> = derived(isUserLogged, $isUserLogged => $isUserLogged);
export  const login = user.login;

export const isMobileView = derived(isMobile, $isMobileView => $isMobileView);