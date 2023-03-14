import React, { FC, PropsWithChildren } from "react";
import scss from "./notebookGrid.module.scss";

const NotebookGrid: FC<PropsWithChildren> = ({ children }) => {
    return <div className={scss.grid}>{children}</div>;
};

export default NotebookGrid;
