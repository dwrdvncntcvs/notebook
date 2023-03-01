import React from "react";

const PagesAside = () => {
    return (
        <aside>
            <div className="aside-header">
                <h2>Pages</h2>
                <button id="add-page">+ Page</button>
            </div>
            <ul>
                <li>
                    <button className="active">Page 1</button>
                </li>
                <li>
                    <button>Page 1</button>
                </li>
            </ul>
        </aside>
    );
};

export default PagesAside;
