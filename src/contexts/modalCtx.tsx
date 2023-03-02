import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from "react";

interface ModalContextModel {
    name: string;
    openModal: (name: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextModel | null>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [modalName, setModalName] = useState("");

    function openModal(name: string) {
        setModalName(name);
    }

    function closeModal() {
        setModalName("");
    }

    return (
        <ModalContext.Provider
            value={{ closeModal, openModal, name: modalName }}
        >
            {children}
        </ModalContext.Provider>
    );
};

const useModalContext = () => {
    return useContext(ModalContext);
};

const MODAL = {
    CREATE_NOTEBOOK: "createNotebook",
};

export { ModalContext, ModalProvider, useModalContext, MODAL };
