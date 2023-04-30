import { derived } from "svelte/store";
import writableDerived from "svelte-writable-derived";

import { isMobileView as mobileMode } from "$model/ui";
import { group } from "$model/storage";
import {
  isGroupsCompact,
  isItemsCompact,
  isItemGroupsCompact as itemGroups,
  startupGroupId as startupGroup,
} from "$model/settings";

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
export const startupGroupId = writableDerived(
  startupGroup,
  ($S) => $S,
  ($S) => $S
);
export const isItemGroupsCompact = writableDerived(
  itemGroups,
  ($S) => $S,
  ($S) => $S
);
export const groups = derived(group.groups, ($S) =>
  [group.getDefault(), ...$S].map((group) => {
    return {
      value: group.id,
      name: group.title,
    };
  })
);
