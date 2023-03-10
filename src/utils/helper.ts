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
    return previousObj;
}

export { formatDate, getDataPreviousValue };
