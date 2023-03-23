import { gql } from "@apollo/client";

const GET_PAGES = gql`
    query pages($notebookId: String!, $page: Int, $limit: Int) {
        pages(notebookId: $notebookId, page: $page, limit: $limit) {
            id
            pages {
                id
                name
                createdAt
                updatedAt
            }
            pageMeta {
                page
                count
                totalPages
            }
        }
    }
`;

const CREATE_PAGE = gql`
    mutation createPage($notebookId: String, $name: String) {
        createPage(notebookId: $notebookId, name: $name) {
            id
            name
            notebookId
            createdAt
            updatedAt
        }
    }
`;

const UPDATE_PAGE = gql`
    mutation updatePage($id: String!, $name: String) {
        updatePage(id: $id, name: $name) {
            id
            name
            notebookId
            createdAt
            updatedAt
        }
    }
`;

const DELETE_PAGE = gql`
    mutation deletePage($id: String) {
        deletePage(id: $id) {
            deleted
            message
        }
    }
`;

export { GET_PAGES, CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE };
