import { derived, type Readable } from "svelte/store";
import { isUserLogged } from "$model/user";

export const isLogged: Readable<boolean> = derived(isUserLogged, $isUserLogged => $isUserLogged);