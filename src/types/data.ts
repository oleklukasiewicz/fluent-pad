export class BaseItem {
    id: string;
    createDate: Date;
    modifyDate: Date;
    title: string;
    flags:any;

    constructor(id: string, title: string, createDate?: Date, modifyDate?: Date,flags?:any) {
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

    constructor(id: string, title?: string, createDate?: Date, modifyDate?: Date) {
        super(id, title || "", createDate, modifyDate,{});
        this.items = [];
        this.itemsCount = 0;
        this.sortFunction = () => 0;
        this.filterFunction = () => true;
    }
}
export class Item extends BaseItem {
    groups: string[];
    content: string;
    groupIndex: number;

    constructor(id: string, title?: string, content?: string, createDate?: Date, modifyDate?: Date, groups?: string[]) {
        super(id, title || "", createDate, modifyDate);
        this.groupIndex = -1;
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