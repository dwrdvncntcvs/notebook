import React from "react";
import scss from "./pagesAside.module.scss";

const PagesAside = () => {
    return (
        <aside>
            <div className={scss["aside-header"]}>
                <button id={scss["add-page"]}>+ Page</button>
            </div>
            <ul>
                <li>
                    <button className={scss.active}>Page 1</button>
                </li>
                <li>
                    <button>Page 1</button>
                </li>
            </ul>
        </aside>
    );
};

export default PagesAside;
