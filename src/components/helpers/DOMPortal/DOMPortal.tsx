import React, { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface DOMPortalProps {
    elementId: string;
}

const DOMPortal: FC<PropsWithChildren & DOMPortalProps> = ({
    elementId,
    children,
}) => {
    const element = document.getElementById(elementId) as HTMLElement;
    return createPortal(children, element);
};

export default DOMPortal;
