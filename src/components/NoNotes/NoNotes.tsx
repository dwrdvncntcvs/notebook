import React, { Fragment } from "react";
import scss from "./noNotes.module.scss";
import {
    HiOutlineBookOpen,
    HiOutlineDocument,
    HiOutlinePencil,
} from "react-icons/hi";

const NoNotes = () => {
    const guide = [
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
                "This will serve as your actual notebook page"
            ],
        },
        {
            Icon: HiOutlinePencil,
            title: "Note",
            descriptions: [
                "You can save any notes you want",
                "Currently this only save notes and not images or other media",
                "The notes you will write will only be seen by you"
            ],
        },
    ];

    return (
        <div className={scss["no-notes"]}>
            <h1>Getting Started</h1>
            <div className={scss["guide-list"]}>
                {guide.map(({ Icon, title, descriptions }, i) => (
                    <Fragment key={i}>
                        <div className={scss["guide-item"]}>
                            <div className={scss["guide-header"]}>
                                <Icon className={scss.icon} />
                                <h3>{title}</h3>
                            </div>
                            <div className={scss["guide-desc"]}>
                                {descriptions.map((description, i) => (
                                    <p key={i}>{description}</p>
                                ))}
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default NoNotes;
