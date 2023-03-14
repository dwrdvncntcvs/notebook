import React, { Fragment } from "react";
import scss from "./noNotes.module.scss";
import {
    HiOutlineBookOpen,
    HiOutlineDocument,
    HiOutlinePencil,
} from "react-icons/hi";
import { IconType } from "react-icons";
import GuideItem from "./GuideItem";

export interface Guides {
    Icon: IconType;
    title: string;
    descriptions: string[];
}

const NoNotes = () => {
    const guide: Guides[] = [
        {
            Icon: HiOutlineBookOpen,
            title: "Notebook",
            descriptions: [
                "Create a notebook",
                "You can use your note book to add different pages and notes",
                "All of the data currently saves on local storage of the browser",
            ],
        },
        {
            Icon: HiOutlineDocument,
            title: "Page",
            descriptions: [
                "Create a notebook page",
                "You cannot create a notes with out a page",
                "This will serve as your actual notebook page",
            ],
        },
        {
            Icon: HiOutlinePencil,
            title: "Note",
            descriptions: [
                "You can save any notes you want",
                "Currently this only save notes and not images or other media",
                "The notes you will write will only be seen by you",
            ],
        },
    ];

    return (
        <div className={scss["no-notes"]}>
            <h1>Getting Started</h1>
            <div className={scss["guide-list"]}>
                {guide.map(({ Icon, title, descriptions }, i) => (
                    <GuideItem key={i} guide={{ Icon, title, descriptions }} />
                ))}
            </div>
        </div>
    );
};

export default NoNotes;
