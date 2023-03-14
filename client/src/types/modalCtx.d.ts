export interface ModalContextModel {
    name: string;
    openModal: (name: string, props?: any) => void;
    closeModal: () => void;
    props: any;
}

export interface ModalState {
    name: string;
    props: any;
}

export interface UpdateProps {
    name: string;
    id: string;
}

export interface PageUpdateProps extends UpdateProps {
    notebookId: string;
}

export type Action =
    | { type: "openModal"; payload: { name: string; props: any } }
    | { type: "closeModal" };
