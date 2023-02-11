import { GENERATE_ID, TYPE } from "../helpers";

export class BaseItem {
    id: string;
    createDate: Date;
    modifyDate: Date;
    title: string;
    content: string;

    constructor(id: string, title: string, content: string, createDate?: Date, modifyDate?: Date) {
        this.id = id;
        this.title = title || "";
        this.content = content || "";
        this.createDate = createDate || new Date();
        this.modifyDate = modifyDate || new Date();
    }
}

export class Group extends BaseItem {
    items: Item[];

    constructor(id: string, title?: string, createDate?: Date, modifyDate?: Date) {
        super(id || GENERATE_ID(TYPE.group), title || "", "", createDate, modifyDate);
        this.items = [];
    }
}
export class Item extends BaseItem {
    groups: string[];
    groupIndex: number;

    constructor(id: string, title?: string, content?: string, createDate?: Date, modifyDate?: Date, groups?: string[]) {
        super(id || GENERATE_ID(TYPE.item), title || "", content || "", createDate, modifyDate);
        this.groupIndex = -1;
        this.groups = groups || [];
    }
}