import type { Readable, Writable } from "svelte/store";
import type { Group, Item } from "./data";

export interface IGroupModel {
    loadAll(): Promise<void>;
    load(group: Group): Promise<Group>;
    add(group: Group): Promise<Group>;
    update(group: Group): Promise<Group>;
    remove(group: any): Promise<void>;

    select(group: any): void;
    selectIndex(index: number): void;
    selectDefault(): void;

    getAll(): Group[];
    getDefault(): Group;
    get(groupId: string): Group;

    itemIndexInGroup(itemId: any, groupId: any): number;
    addItem(group: any, item: any): void;
    removeItem(group: any, item: any): void;

    selectedGroupIndex: Writable<number>;
    selectedGroup: Writable<Group>;
    selectedGroupItems: Writable<Item[]>;
    selectedGroupIsDefault: Readable<boolean>;
}

export interface IItemModel {
    loadAll(): Promise<void>;
    load(group: Item): Promise<Item>;
    add(group: Item): Promise<Item>;
    update(group: Item): Promise<Item>;
    remove(group: any): Promise<void>;

    select(group: any): void;
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