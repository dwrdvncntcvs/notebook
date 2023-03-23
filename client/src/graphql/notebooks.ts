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

export { GET_NOTEBOOKS };
