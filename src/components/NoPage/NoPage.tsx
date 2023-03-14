import React from "react";
import scss from "./noPage.module.scss";

const NoPage = () => {
    return (
        <div id={scss["no-page"]}>
            {"No Pages".split("").map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </div>
    );
};

export default NoPage;
