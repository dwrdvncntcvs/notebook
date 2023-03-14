import React from "react";
import scss from "./header.module.scss"

const Header = () => {
    return (
        <header className={scss.header}>
            <h1>Notebook</h1>
        </header>
    );
};

export default Header;
