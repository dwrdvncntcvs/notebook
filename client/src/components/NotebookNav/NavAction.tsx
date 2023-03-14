import React, { FC } from "react";
import { NavActionProperties } from "./NotebookTab";

interface NavActionProps {
    navActionProperties: NavActionProperties[];
}

const NavAction: FC<NavActionProps> = ({ navActionProperties }) => {
    return (
        <>
            {navActionProperties.map(({ id, hidden, action, Icon }) => (
                <button id={id} hidden={hidden} onClick={action}>
                    <Icon />
                </button>
            ))}
        </>
    );
};

export default NavAction;
