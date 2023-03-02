import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from "react";

interface ModalContextModel {
    state: "open" | "closed";
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextModel | null>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [modalState, setModalState] = useState<"open" | "closed">("closed");

    function openModal() {
        setModalState("open");
    }

    function closeModal() {
        setModalState("closed");
    }

    return (
        <ModalContext.Provider
            value={{ closeModal, openModal, state: modalState }}
        >
            {children}
        </ModalContext.Provider>
    );
};

const useModalContext = () => {
    return useContext(ModalContext);
};

export { ModalContext, ModalProvider, useModalContext };
