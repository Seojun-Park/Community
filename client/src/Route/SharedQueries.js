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

export const NOTICE_DATA = gql`
    query showNotice{
        showNotice{
            id
            title
            caption
            hit
            createdAt
        }
    }
`;

export const MARKET_DATA = gql`
    query showMarket{
        showMarket{
            id
            title
            caption
            hit
            comments{
                id
                text
                user {
                    username
                }
            }
            user {
                id
                username
            }
            createdAt
        }
    }
`