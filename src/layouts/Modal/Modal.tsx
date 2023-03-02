import React, { FC, ReactNode, useEffect } from "react";
import DOMPortal from "../../components/helpers/DOMPortal/DOMPortal";
import Backdrop from "../Backdrop/Backdrop";
import scss from "./modal.module.scss";

interface ModalProps {
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
}

const Modal: FC<ModalProps> = ({ header, body, footer }) => {
    return (
        <DOMPortal elementId="overlay-root">
            <Backdrop />
            <div className={`${scss.modal}`}>
                {header}
                {body}
                {footer}
            </div>
        </DOMPortal>
    );
};

export default Modal;
