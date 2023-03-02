export const DATE_FORMAT = (date: any) => {
    if (date?.seconds) date = new Date(date.seconds * 1000)
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
    ];