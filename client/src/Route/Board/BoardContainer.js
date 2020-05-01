import React from 'react';
import { gql } from 'apollo-boost';
import BoardPresenter from './BoardPresenter'
import { useQuery } from '@apollo/react-hooks';

const BOARD_DATA = gql`
    query showBoard{
        showBoard{
            title
            caption
            user {
                id
                username
            }
            createdAt
        }
    }
`;

export default () => {
    const { data, loading } = useQuery(BOARD_DATA);

    return (
        <>
            <BoardPresenter 
                data={data}
                loading={loading}
                />
        </>
    )
}