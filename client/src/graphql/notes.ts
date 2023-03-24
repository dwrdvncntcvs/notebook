import { gql } from "@apollo/client";

const GET_NOTES = gql`
    query notes($pageId: String!, $page: Int, $limit: Int) {
        notes(pageId: $pageId, page: $page, limit: $limit) {
            id
            notes {
                id
                note
                createdAt
                updatedAt
            }
            noteMeta {
                page
                count
                totalPages
            }
        }
    }
`;

const CREATE_NOTE = gql`
    mutation createNote($pageId: String, $data: NoteInput) {
        createNote(pageId: $pageId, data: $data) {
            id
            note
            createdAt
        }
    }
`;

const UPDATE_NOTE = gql`
    mutation updateNote($noteId: String, $data: NoteInput) {
        updateNote(id: $noteId, data: $data) {
            id
            note
            createdAt
        }
    }
`;

const DELETE_NOTE = gql`
    mutation deleteNote($id: String) {
        deleteNote(id: $id) {
            ... on DeletedMessage {
                deleted
                message
            }
        }
    }
`;

export { GET_NOTES, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE };
