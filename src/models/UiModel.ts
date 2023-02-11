import { writable } from "svelte/store";

let maxWidth = "800px";

let matcher = window.matchMedia('(max-width: ' + maxWidth + ')');

export const isMobileView = writable(matcher.matches);

matcher.addEventListener("change", (e) => isMobileView.set(e.matches))