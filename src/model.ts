import { derived, type Readable } from "svelte/store";
import * as Storage from "./models/storage";
import { isUserLogged } from "./models/user";

export const isLogged: Readable<boolean> = derived(isUserLogged, $isUserLogged => $isUserLogged);