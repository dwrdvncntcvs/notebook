import React, { FC, FormEvent, ChangeEvent } from "react";
import scss from "./nameActionForm.module.scss";

interface ModalNameActionFormProps {
    onSubmit: (e: FormEvent) => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    actionType: "Create" | "Update";
    title: string;
}

const ModalNameActionForm: FC<ModalNameActionFormProps> = ({
    onChange,
    onSubmit,
    value,
    title,
    actionType,
}) => {
    return (
        <form className={scss.form} onSubmit={onSubmit}>
            <input
                type="text"
                placeholder={`Enter ${title} name...`}
                onChange={onChange}
                value={value}
            />
            <button type="submit">
                {actionType} {title}
            </button>
        </form>
    );
};

export default ModalNameActionForm;
