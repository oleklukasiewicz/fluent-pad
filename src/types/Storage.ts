import type { Group, Item } from "./Data";

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

    itemIndexInGroup(itemId: string, groupId: string): number;
    addItem(group: any, item: any): void;
    removeItem(group: any, item: any): void;
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
}