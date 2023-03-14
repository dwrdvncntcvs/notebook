import React, { SyntheticEvent, FC } from "react";
import { usePageContext } from "../../contexts/pageCtx";
import { Page } from "../../models/Page";

import scss from "./pageItem.module.scss";
import PageItemOption from "./PageItemOption";

interface PageItemProps {
    page: Page;
}

const PageItem: FC<PageItemProps> = ({ page }) => {
    const { pageId, selectPage } = usePageContext();

    const selectPageHandler =
        (id: string) => (e: SyntheticEvent<HTMLElement>) => {
            selectPage(id);
        };

    return (
        <div className={`${scss.page} `}>
            <div
                className={`${scss["page-content"]} ${
                    pageId === page.id ? scss.active : ""
                }`}
                onClick={selectPageHandler(page.id)}
            >
                {page.name}
            </div>
            <PageItemOption page={page} />
        </div>
    );
};

export default PageItem;
