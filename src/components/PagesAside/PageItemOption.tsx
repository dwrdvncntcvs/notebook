import React, { useState, FC } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { MODAL, useModalContext } from "../../contexts/modalCtx";
import { useNotebookContext } from "../../contexts/notebookCtx";
import { usePageContext } from "../../contexts/pageCtx";
import { Page } from "../../models/Page";
import { PageUpdateProps } from "../../types/modalCtx";
import { getDataPreviousValue } from "../../utils/helper";
import scss from "./pageItemOption.module.scss";

const defaultToggle = {
    value: "",
    is: false,
};

interface PageItemOptionProps {
    page: Page;
}

const PageItemOption: FC<PageItemOptionProps> = ({ page }) => {
    const [toggle, setToggle] = useState(defaultToggle);
    const { openModal, name } = useModalContext()!;
    const { pages, pageId, deleteNotebookPageById, selectPage } =
        usePageContext();
    const { notebookId } = useNotebookContext();
    const [_, setSearchParams] = useSearchParams();

    const toggleHandler = (pageId: string) => () => {
        setToggle({ is: true, value: pageId });
    };

    const unToggleHandler = () => {
        setToggle(defaultToggle);
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
        <div
            id={scss["option-toggle"]}
            hidden={pageId !== page.id}
            onClick={toggleHandler(page.id)}
            onMouseLeave={unToggleHandler}
        >
            <HiDotsHorizontal />
            {toggle.is && toggle.value === page.id ? (
                <div className={scss.actions}>
                    <button id={scss.edit} onClick={openUpdateModal(page)}>
                        Edit
                    </button>
                    <button
                        id={scss.delete}
                        onClick={deleteNotebookPageHandler(page.id)}
                    >
                        Delete
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default PageItemOption;
