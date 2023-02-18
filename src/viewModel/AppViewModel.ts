import { derived, type Readable } from "svelte/store";
import { isUserLogged} from "../models/user";

export const isLogged: Readable<boolean> = derived(isUserLogged, $isUserLogged => $isUserLogged);