import React from "react";
import { HiPlus } from "react-icons/hi";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import CreatePage from "../CreatePage/CreatePage";
import scss from "./pagesAside.module.scss";

const PagesAside = () => {
    const { openModal, name } = useModalContext()!;

    const createPageHandler = () => {
        openModal(MODAL.CREATE_PAGE);
    };

    return (
        <aside>
            <div className={scss["aside-header"]}>
                <button id={scss["add-page"]} onClick={createPageHandler}>
                    <HiPlus /> Page
                </button>
            </div>
            <div className={scss.pages}>
                <button className={scss.active}>Page 1</button>
                <button>Page 1</button>
            </div>

            {name === MODAL.CREATE_PAGE ? <CreatePage /> : null}
        </aside>
    );
};

export default PagesAside;
