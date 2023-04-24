import { derived } from "svelte/store";
import writableDerived from "svelte-writable-derived";

import { isMobileView as mobileMode } from "$model/ui";
import { isGroupsCompact, isItemsCompact } from "$model/settings";

export const isMobileView = derived(mobileMode, ($isMobile) => $isMobile);

export const isGroupsCompactMode = writableDerived(
  isGroupsCompact,
  ($S) => $S,
  ($S) => $S
);
export const isItemsCompactMode = writableDerived(
  isItemsCompact,
  ($S) => $S,
  ($S) => $S
);
