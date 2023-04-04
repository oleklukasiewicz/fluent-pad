import type { Readable, Writable } from "svelte/store";
import type { Group, Item } from "./data";

export interface IGroupModel {
    loadAll(): Promise<void>;
    load(group: Group): Promise<Group>;
    add(group: Group): Promise<void>;
    update(group: Group): Promise<void>;
    remove(groupId:string): Promise<void>;

    select(group: Group): void;
    selectIndex(index: number): void;
    selectDefault(): void;

    sort(group: Group, method: any): Group;

    getAll(): Group[];
    getDefault(): Group;
    get(groupId: string): Group;

    selectedGroupIndex: Writable<number>;
    selectedGroup: Writable<Group>;
    selectedGroupItems: Readable<Item[]>;
    selectedGroupIsDefault: Readable<boolean>;
    groupsLoaded: Writable<boolean>;
}

export interface IItemModel {
    loadAll(): Promise<void>;
    load(item: Item): Promise<Item>;
    add(item: Item): Promise<void>;
    update(item: Item): Promise<void>;
    remove(itemId: string): Promise<void>;

    select(item:Item): void;
    selectIndex(index: number): void;
    unSelect(): void;

    get(itemId: string, groupId: Group): Item;
    getAll(): Item[];

    selectedIndex: Writable<number>;
    selectedItem: Writable<Item>;
}

export interface IRelationsModel {
    
    addTo(group: Group,item: Item): void;
    removeFrom(group: Group,item: Item): void;
    setFor(item: Item, groupsIds: string[]): void;
    isItemInGroup(item: Item, group: Group): boolean;
}

export interface IStorageModel {

    storage: Writable<Group[]>;

    group: IGroupModel;
    item: IItemModel;
    relations: IRelationsModel;
}