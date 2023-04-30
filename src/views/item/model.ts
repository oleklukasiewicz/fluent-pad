import { writableDerived, propertyStore } from "svelte-writable-derived";
import { derived, get, writable, type Readable, type Writable } from "svelte/store";

import type { Group, Item } from "$type/data";
import type { IGroupModel, IItemModel, IRelationsModel } from "$type/storage";

import { GroupMasterDetail } from "$model/group";
import { isMobileView as isMobile } from "$model/ui";
import { isItemGroupsCompact } from "$model/settings";

export const itemControl: IItemModel = GroupMasterDetail.itemControl;
export const groupControl: IGroupModel = GroupMasterDetail.groupControl;
export const relationsControl: IRelationsModel =
  GroupMasterDetail.relationsControl;

export const group: Writable<Group> = writableDerived(
  groupControl.selectedGroup,
  (s) => s,
  (s: Group) => s
);
export const item: Writable<Item> = writableDerived(
  GroupMasterDetail.item,
  (s) => s,
  (s: Item) => s
);

export const id: Writable<string> = propertyStore(item, "id");
export const title: Writable<string> = propertyStore(item, "title");
export const content: Writable<string> = propertyStore(item, "content");
export const groups: Readable<Group[]> = derived(item, (val) =>
  val.groups
    ? val.groups.map((_group: string) => {
        const currentGroup = get(GroupMasterDetail.group);
        if (_group !== currentGroup.id)
          return groupControl.get(_group) || ({} as Group);
        else return currentGroup;
      })
    : []
);

export const isItemExpanded: Writable<boolean> = writableDerived(
  GroupMasterDetail.isItemExpanded,
  (isHidden) => isHidden,
  (isHidden) => isHidden
);

export const isMobileView = derived(isMobile, ($S) => $S);
export const needSave = derived(item, (s) => s?.flags?.needSave || false);
export const isCompactItemGroup = derived(isItemGroupsCompact, ($S) => $S);