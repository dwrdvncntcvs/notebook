import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const formatDate = (date: Date) => {
    dayjs.extend(relativeTime);
    return dayjs(date).fromNow();
};

export { formatDate };
