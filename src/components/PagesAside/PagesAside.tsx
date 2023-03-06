import React, { SyntheticEvent } from "react";
import { HiPlus } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { usePageContext } from "../../contexts/pageCtx";
import CreatePage from "../CreatePage/CreatePage";
import scss from "./pagesAside.module.scss";

const PagesAside = () => {
    const { openModal, name } = useModalContext()!;
    const { pages, pageId } = usePageContext();
    const { notebookId, notebooks } = useNotebookContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const createPageHandler = () => {
        openModal(MODAL.CREATE_PAGE);
    };

    const selectPageHandler =
        (id: string) => (e: SyntheticEvent<HTMLButtonElement>) => {
            setSearchParams({ notebookId, page: id });
        };

    return (
        <aside className={notebooks.length === 0 ? scss.hidden : ""}>
            <div className={scss["aside-header"]}>
                <button id={scss["add-page"]} onClick={createPageHandler}>
                    <HiPlus /> Page
                </button>
            </div>
            <div className={scss.pages}>
                {pages !== undefined ? (
                    pages.map(({ id, name }) => (
                        <button
                            className={pageId === id ? scss.active : ""}
                            key={id}
                            onClick={selectPageHandler(id)}
                        >
                            {name}
                        </button>
                    ))
                ) : (
                    <div id={scss["no-page"]}>
                        {"No Pages".split("").map((char, i) => (
                            <span key={i}>{char}</span>
                        ))}
                    </div>
                )}
            </div>

            {name === MODAL.CREATE_PAGE ? <CreatePage /> : null}
        </aside>
    );
};

export default PagesAside;
