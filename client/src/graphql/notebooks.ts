import { gql } from "@apollo/client";

const GET_NOTEBOOKS = gql`
    query notebooks($page: Int, $limit: Int) {
        notebooks(page: $page, limit: $limit) {
            notebooks {
                id
                name
            }
            notebookMeta {
                page
                count
                totalPages
            }
        }
    }
`;

const CREATE_NOTEBOOK = gql`
    mutation createNotebook($name: String) {
        createNotebook(name: $name) {
            ... on Notebook {
                id
                name
                createdAt
                updatedAt
            }
        }
    }
`;

const UPDATE_NOTEBOOK = gql`
    mutation updateNotebook($id: String!, $name: String) {
        updateNotebook(id: $id, name: $name) {
            ... on Notebook {
                id
                name
                createdAt
                updatedAt
            }
        }
    }
`;

const DELETE_NOTEBOOK = gql`
    mutation deleteNotebook($id: String) {
        deleteNotebook(id: $id) {
            ... on DeletedMessage {
                deleted
                message
            }
        }
    }
`;

export { GET_NOTEBOOKS, CREATE_NOTEBOOK, UPDATE_NOTEBOOK, DELETE_NOTEBOOK };
