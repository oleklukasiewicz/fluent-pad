import { type IGroupMasterDetail } from "$src/types/data";
import * as Storage from "$model/storage";
import { writable } from "svelte/store";

export let GroupMasterDetail: IGroupMasterDetail = {
  group: writable(null),
  item: writable(null),

  select: function (item) {
    Storage.item.select(item);
  },
  selectGroup: function (group) {
    Storage.group.select(group);
  },

  itemControl: Storage.item,
  groupControl: Storage.group,
};
