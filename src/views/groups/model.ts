import { writable, derived, type Writable, type Readable } from "svelte/store";
import { writableDerived } from "svelte-writable-derived";

import type { Group, Item } from "$type/data";
import type { IItemModel, IGroupModel, IRelationsModel } from "$type/storage";

import { GroupMasterDetail } from "$model/group";
import { isMobileView as isMobile } from "$model/ui";
import { isItemsCompact as itemsCompact } from "$model/settings";

export const control: IItemModel = GroupMasterDetail.itemControl;
export const groupControl: IGroupModel = GroupMasterDetail.groupControl;
export const relationsControl: IRelationsModel =
  GroupMasterDetail.relationsControl;

export const groups: Readable<Group[]> = derived(
  GroupMasterDetail.storage,
  () => groupControl.getAll() || []
);
export const group: Writable<Group> = writableDerived(
  GroupMasterDetail.group,
  (s) => s,
  (s) => s
);

export const items: Readable<Item[]> = derived(
  group,
  ($selItems: Group) => $selItems.items || []
);
export const selectedItem: Writable<Item> = writableDerived(
  GroupMasterDetail.item,
  (s) => s,
  (s) => s
);

export const isListHidden: Writable<boolean> = writableDerived(
  GroupMasterDetail.isItemExpanded,
  (isHidden) => isHidden,
  (isHidden) => isHidden
);

export const isMobileView = derived(isMobile, ($S) => $S);

export const isItemsCompact = derived(itemsCompact, ($S) => $S);
