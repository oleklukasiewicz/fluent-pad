import writableDerived from "svelte-writable-derived";
import { derived, writable } from "svelte/store";

import { type IGroupMasterDetail } from "$src/types/data";
import * as Storage from "$model/storage";

export let GroupMasterDetail: IGroupMasterDetail = {
  group: writableDerived(
    Storage.group.selectedGroup,
    ($S) => $S,
    ($S) => $S
  ),
  item: writableDerived(
    Storage.item.selectedItem,
    ($S) => $S,
    ($s) => {
      return $s;
    }
  ),
  isItemExpanded: writable(false),

  select: function (item) {
    Storage.item.select(item);
  },
  selectGroup: function (group) {
    Storage.group.select(group);
  },

  itemControl: Storage.item,
  groupControl: Storage.group,
  relationsControl: Storage.relations,

  storage: derived(Storage.Storage.storage, ($S) => $S)
};
