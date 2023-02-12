import type { Group, Item } from "./Data"
import type { User } from "./User";

export default interface IBackend {
    generateItemId(): string;
    loadItems(): Promise<Item[]>;
    loadItem(id: string): Promise<Item>;
    addItem(item: Item): Promise<Item>;
    updateItem(item: Item): Promise<Item>;
    removeItem(item: Item): Promise<void>;

    generateGroupId(): string;
    loadGroups(): Promise<Group[]>;
    loadGroup(id: string): Promise<Group>;
    addGroup(group: Group): Promise<Group>;
    updateGroup(group: Group): Promise<Group>;
    removeGroup(group: Group): Promise<void>;

    loadUser(): Promise<User>;
    logoutUser(): Promise<boolean>;
}