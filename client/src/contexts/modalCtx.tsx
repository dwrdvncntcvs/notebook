import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useReducer,
} from "react";
import { Action, ModalContextModel, ModalState } from "../types/modalCtx";

const modalInitialState: ModalState = {
    name: "",
    props: {},
};

const modalReducer = (state: ModalState, action: Action) => {
    switch (action.type) {
        case "openModal":
            return {
                ...state,
                name: action.payload.name,
                props: action.payload.props,
            };
        case "closeModal":
            return {
                ...state,
                name: "",
                props: {},
            };
        default:
            return state;
    }
};

const ModalContext = createContext<ModalContextModel | null>(null);

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(modalReducer, modalInitialState);

    function openModal(name: string, props = {}) {
        dispatch({ type: "openModal", payload: { name, props } });
    }

    function closeModal() {
        dispatch({ type: "closeModal" });
    }

    return (
        <ModalContext.Provider value={{ ...state, closeModal, openModal }}>
            {children}
        </ModalContext.Provider>
    );
};

const useModalContext = () => {
    return useContext(ModalContext);
};

const MODAL = {
    CREATE_NOTEBOOK: "createNotebook",
    CREATE_PAGE: "createPage",
    UPDATE_NOTEBOOK: "updateNotebook",
    UPDATE_PAGE: "updatePage",
};

export { ModalContext, ModalProvider, useModalContext, MODAL };
