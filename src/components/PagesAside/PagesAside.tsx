import React, { SyntheticEvent, useState } from "react";
import { HiOutlineTrash, HiPlus, HiDotsHorizontal } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { usePageContext } from "../../contexts/pageCtx";
import { Page } from "../../models/Page";
import { PageUpdateProps } from "../../types/modalCtx";
import { getDataPreviousValue } from "../../utils/helper";
import CreatePage from "../CreatePage/CreatePage";
import UpdatePage from "../UpdatePage/UpdatePage";
import scss from "./pagesAside.module.scss";

const defaultToggle = {
    value: "",
    is: false,
};

const PagesAside = () => {
    const [toggle, setToggle] = useState(defaultToggle);
    const { openModal, name } = useModalContext()!;
    const { pages, pageId, deleteNotebookPageById, selectPage } =
        usePageContext();
    const { notebookId, notebooks } = useNotebookContext();
    const [_, setSearchParams] = useSearchParams();

    const createPageHandler = () => {
        openModal(MODAL.CREATE_PAGE);
    };

    const selectPageHandler =
        (id: string) => (e: SyntheticEvent<HTMLElement>) => {
            selectPage(id);
        };

    const deleteNotebookPageHandler = (pageId: string) => () => {
        const prevPage = getDataPreviousValue<Page>(pageId, pages);
        deleteNotebookPageById(notebookId, pageId);

        if (pages.length <= 1) {
            setSearchParams({ notebookId });
            return;
        }

        selectPage(prevPage.id);
    };

    const openUpdateModal = (props: PageUpdateProps) => () => {
        openModal(MODAL.UPDATE_PAGE, props);
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
                    pages.map(({ id, name, notebookId }) => (
                        <div className={`${scss.page} `} key={id}>
                            <div
                                className={`${scss["page-content"]} ${
                                    pageId === id ? scss.active : ""
                                }`}
                                onClick={selectPageHandler(id)}
                            >
                                {name}
                            </div>
                            <div
                                id={scss["option-toggle"]}
                                hidden={pageId !== id}
                                onClick={() =>
                                    setToggle({ is: true, value: id })
                                }
                                onMouseLeave={() => setToggle(defaultToggle)}
                            >
                                <HiDotsHorizontal />
                                {toggle.is && toggle.value === id ? (
                                    <div className={scss.actions}>
                                        <button
                                            id={scss.edit}
                                            onClick={openUpdateModal({
                                                id,
                                                name,
                                                notebookId,
                                            })}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            id={scss.delete}
                                            onClick={deleteNotebookPageHandler(
                                                id
                                            )}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))
                ) : (
                    <div id={scss["no-page"]}>
                        {"No Pages".split("").map((char, i) => (
                            <span key={i}>{char}</span>
                        ))}
                    </div>
                )}
            </div>

            {name === MODAL.UPDATE_PAGE ? <UpdatePage /> : null}
            {name === MODAL.CREATE_PAGE ? <CreatePage /> : null}
        </aside>
    );
};

export default PagesAside;
