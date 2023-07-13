import type { Readable, Writable } from "svelte/store";
import type { IGroupModel, IItemModel, IRelationsModel } from "./storage";

export class BaseItem {
  id: string;
  type: string = "base";
  createDate: Date;
  modifyDate: Date;
  title: string;
  flags: any;

  constructor(
    id: string,
    title: string,
    createDate?: Date,
    modifyDate?: Date,
    flags?: any
  ) {
    this.id = id;
    this.title = title || "";
    this.createDate = createDate || new Date();
    this.modifyDate = modifyDate || new Date();
    this.flags = flags || {};
  }
}

export class Group extends BaseItem {
  items: Item[];
  itemsCount: number;
  sortFunction: any;
  filterFunction: any;

  constructor(
    id: string,
    title?: string,
    createDate?: Date,
    modifyDate?: Date,
    flags: any = {
      isEditable: true,
      isRemovable: true,
      isHidden: false,
      isAutoGenerated: false,
      isReadOnly: false,
    }
  ) {
    super(id, title || "", createDate, modifyDate, flags);
    this.items = [];
    this.type = "group";
    this.itemsCount = 0;
    this.sortFunction = () => 0;
    this.filterFunction = () => true;
  }
}
export class Item extends BaseItem {
  groups: string[];
  content: string;
  groupIndex: number;

  constructor(
    id: string,
    title?: string,
    content?: string,
    createDate?: Date,
    modifyDate?: Date,
    groups?: string[],
    flags: any = {
      needSave: false,
    }
  ) {
    super(id, title || "", createDate, modifyDate, flags);
    this.groupIndex = -1;
    this.type = "item";
    this.content = content || "";
    this.groups = groups || [];
  }
}
export class SelectionItem {
  selected: boolean;
  item: Item;

  constructor(item: Item, selected?: boolean) {
    this.item = item;
    this.selected = selected || false;
  }
}
export class SelectionGroup {
  selected: boolean;
  group: Group;

  constructor(group: Group, selected?: boolean) {
    this.group = group;
    this.selected = selected || false;
  }
}

export type IGroupMasterDetail = {
  group: Writable<Group>;
  item: Writable<Item>;
  isItemExpanded: Writable<boolean>;

  select: (item: Item) => void;
  selectGroup: (group: Group) => void;

  itemControl: IItemModel;
  groupControl: IGroupModel;
  relationsControl: IRelationsModel;

  storage: Readable<Group[]>;
};
export class HistoryItem
{
  id:string;
  createdAt:Date;
  isRelease:boolean;
  diff : any;
  constructor(id:string,createdAt:Date,diff:any,isRelease:boolean)
  {
    this.id = id;
    this.createdAt = createdAt;
    this.isRelease = isRelease;
    this.diff = diff;
  }
}