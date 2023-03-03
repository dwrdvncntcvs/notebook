import React, { useEffect, SyntheticEvent } from "react";
import { HiPlus } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import { usePageContext } from "../../contexts/pageCtx";
import CreatePage from "../CreatePage/CreatePage";
import scss from "./pagesAside.module.scss";

const PagesAside = () => {
    const { openModal, name } = useModalContext()!;
    const { pages, notebookId } = usePageContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const createPageHandler = () => {
        openModal(MODAL.CREATE_PAGE);
    };

    const pageId = searchParams.get("page");

    useEffect(() => {
        const p_id = pages[0]?.id;
        setSearchParams({ notebookId, page: p_id });
    }, [pages]);

    const selectPageHandler =
        (id: string) => (e: SyntheticEvent<HTMLButtonElement>) => {
            setSearchParams({ notebookId, page: id });
        };

    return (
        <aside>
            <div className={scss["aside-header"]}>
                <button id={scss["add-page"]} onClick={createPageHandler}>
                    <HiPlus /> Page
                </button>
            </div>
            <div className={scss.pages}>
                {pages.map(({ id, name }) => (
                    <button
                        className={pageId === id ? scss.active : ""}
                        key={id}
                        onClick={selectPageHandler(id)}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {name === MODAL.CREATE_PAGE ? <CreatePage /> : null}
        </aside>
    );
};

export default PagesAside;
