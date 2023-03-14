import React, { FC } from "react";
import scss from "./modalHeader.module.scss";

interface ModalHeaderProps {
    title: string;
}

const ModalHeader: FC<ModalHeaderProps> = ({ title }) => {
    return (
        <div className={scss.header}>
            <h2>{title}</h2>
        </div>
    );
};

export default ModalHeader;
