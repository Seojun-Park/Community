import { gql } from 'apollo-boost'

export const BOARD_DATA = gql`
    query showBoard{
        showBoard{
            id
            title
            caption
            comments{
                id
                user {
                    username
                }
                text
            }
            user {
                id
                username
            }
            hit
            createdAt
        }
    }
`;