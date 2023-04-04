import type { Group, Item } from "./data"
import type { User } from "./user";

export interface IStorageAPI {
    generateItemId(): string;
    generateGroupId(): string;
    item:
    {
        load: (id: string) => Promise<Item>;
        loadForGroup: (groupId: string) => Promise<Item[]>;
        loadAll: () => Promise<Item[]>;
        add: (item: Item) => Promise<void>;
        update: (item: Item) => Promise<void>;
        remove: (id: string) => Promise<void>;

    },
    group:
    {
        load: (id: string) => Promise<Group>;
        loadAll: () => Promise<Group[]>;
        add: (group: Group) => Promise<void>;
        update: (group: Group) => Promise<void>;
        remove: (id: string) => Promise<void>;
    },
}
export interface IUserAPI {
    login: () => Promise<User>;
    logout: () => Promise<boolean>;
}

export class ApiItem {
    id: string;
    createDate: Date;
    modifyDate: Date;
    title: string;
    content: string;
    groups: string[];
    constructor(id?: string, title?: string, content?: string, createDate?: Date, modifyDate?: Date, groups?: string[]) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.groups = groups;
        this.createDate = createDate;
        this.modifyDate = modifyDate;
    }
}
export class ApiGroup {
    id: string;
    createDate: Date;
    modifyDate: Date;
    title: string;
    itemsCount: number;

    constructor(id?: string, title?: string, createDate?: Date, modifyDate?: Date, itemsCount?: number) {
        this.id = id;
        this.title = title;
        this.createDate = createDate;
        this.modifyDate = modifyDate;
        this.itemsCount = itemsCount;
    }
}