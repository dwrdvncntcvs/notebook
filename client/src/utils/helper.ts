import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const formatDate = (date: Date) => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
};

function getDataPreviousValue<T extends { id: string }>(
    id: string,
    values: T[]
) {
    const objVal = values.find((value) => value.id === id);
    if (!objVal)
        throw new Error(
            `There is on data from the array with an ID of : ${id}`
        );

    const currentIndex = values.findIndex((value) => value.id === id);
    const previousObj = values[currentIndex - 1];
    const nextObj = values[currentIndex + 1];

    // This will check first if previous object is falsy
    // If note: It will return previous object
    // If it is: It will going to check if next object is falsy
    // If it is: It will return previous object
    // If not: It will return next object
    return !previousObj ? (!nextObj ? previousObj : nextObj) : previousObj;
}

export { formatDate, getDataPreviousValue };
