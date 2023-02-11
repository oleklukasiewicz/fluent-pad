import { storage } from "./models/StorageModel";
import { get } from "svelte/store";

export const GENERATE_ID = function (type = TYPE.item) {
    return type + new Date().getTime();
}
export const TYPE =
{
    item: "item",
    group: "group"
}
export const DATE_FORMAT = (date:any) => {
    if (date.seconds) date = new Date(date.seconds * 1000)
    return date ? ((MONTHS[date.getMonth()]) + " " + date.getDate() + ", " + date.getFullYear()) : "";
};

const MONTHS =
    [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]