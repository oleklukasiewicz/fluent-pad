import { writable, type Writable } from 'svelte/store';

export const isListHidden: Writable<boolean> = writable(false);