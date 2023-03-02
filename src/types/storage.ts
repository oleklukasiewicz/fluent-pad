import type { Readable, Writable } from "svelte/store";
import type { Group, Item } from "./data";

export interface IGroupModel {
    loadAll(): Promise<void>;
    load(group: Group): Promise<Group>;
    add(group: Group): Promise<Group>;
    update(group: Group): Promise<Group>;
    remove(groupId:string): Promise<void>;

    select(group: Group): void;
    selectIndex(index: number): void;
    selectDefault(): void;

    sort(group: Group, method: any): Group;

    getAll(): Group[];
    getDefault(): Group;
    get(groupId: string): Group;

    itemIndexInGroup(item: Item, group: Group): number;
    addItem(group: Group, item: Item): void;
    removeItem(group: Group, item: Item): void;
    setForItem(item: Item, groupsIds: string[]): void;

    selectedGroupIndex: Writable<number>;
    selectedGroup: Writable<Group>;
    selectedGroupItems: Writable<Item[]>;
    selectedGroupIsDefault: Readable<boolean>;
}

export interface IItemModel {
    loadAll(): Promise<void>;
    load(item: Item): Promise<Item>;
    add(item: Item): Promise<Item>;
    update(item: Item): Promise<Item>;
    remove(itemId: string): Promise<void>;

    select(item:Item): void;
    selectIndex(index: number): void;
    unSelect(): void;

    get(itemId: string, groupId: Group): Item;
    getAll(): Item[];

    selectedIndex: Writable<number>;
    selectedItem: Writable<Item>;
}

export interface IStorageModel {

    storage: Writable<Group[]>;

    group: IGroupModel;
    item: IItemModel;

    clearAllData(): Promise<void>;
    loadAllData(): Promise<void>;

    helpers: object;
}