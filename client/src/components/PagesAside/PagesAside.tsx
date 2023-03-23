import React from "react";
import { HiPlus } from "react-icons/hi";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { usePageContext } from "../../contexts/pageCtx";
import CreatePage from "../CreatePage/CreatePage";
import NoPage from "../NoPage/NoPage";
import UpdatePage from "../UpdatePage/UpdatePage";
import PageItem from "./PageItem";
import scss from "./pagesAside.module.scss";

const PagesAside = () => {
    const { openModal, name } = useModalContext()!;
    const { pages } = usePageContext();
    const { notebooks } = useNotebookContext();

    const createPageHandler = () => {
        openModal(MODAL.CREATE_PAGE);
    };

    return (
        <aside className={notebooks.length === 0 ? scss.hidden : ""}>
            <div className={scss["aside-header"]}>
                <button id={scss["add-page"]} onClick={createPageHandler}>
                    <HiPlus /> Page
                </button>
            </div>
            <div className={scss.pages}>
                {pages.length > 0 ? (
                    pages.map((page) => <PageItem key={page.id} page={page} />)
                ) : (
                    <NoPage />
                )}
            </div>

            {name === MODAL.UPDATE_PAGE ? <UpdatePage /> : null}
            {name === MODAL.CREATE_PAGE ? <CreatePage /> : null}
        </aside>
    );
};

export default PagesAside;
