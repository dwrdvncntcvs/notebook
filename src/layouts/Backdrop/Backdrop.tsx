import React from "react";
import { useModalContext } from "../../contexts/modalCtx";
import scss from "./backdrop.module.scss";

const Backdrop = () => {
    const { closeModal } = useModalContext()!;

    return <div className={scss.backdrop} onClick={() => closeModal()}></div>;
};

export default Backdrop;
