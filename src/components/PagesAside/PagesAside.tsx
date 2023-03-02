import React from "react";
import scss from "./pagesAside.module.scss";

const PagesAside = () => {
    return (
        <aside>
            <div className={scss["aside-header"]}>
                <button id={scss["add-page"]}>+ Page</button>
            </div>
            <div className={scss.pages}>
                <button className={scss.active}>Page 1</button>
                <button>Page 1</button>
            </div>
        </aside>
    );
};

export default PagesAside;
