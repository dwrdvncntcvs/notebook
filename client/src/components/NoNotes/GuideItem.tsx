import React, { FC } from "react";
import scss from "./guideItem.module.scss";
import { Guides } from "./NoNotes";

interface GuideItemProps {
    guide: Guides;
}

const GuideItem: FC<GuideItemProps> = ({ guide }) => {
    return (
        <div className={scss["guide-item"]}>
            <div className={scss["guide-header"]}>
                <guide.Icon className={scss.icon} />
                <h3>{guide.title}</h3>
            </div>
            <div className={scss["guide-desc"]}>
                {guide.descriptions.map((description, i) => (
                    <p key={i}>{description}</p>
                ))}
            </div>
        </div>
    );
};

export default GuideItem;
