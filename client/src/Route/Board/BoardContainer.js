import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import BoardPresenter from './BoardPresenter'
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';

const BOARD_DATA = gql`
    query showBoard{
        showBoard{
            id
            title
            caption
            user {
                id
                username
            }
            hit
            createdAt
        }
    }
`;

export default () => {
    const { data, loading } = useQuery(BOARD_DATA);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);
    const [hit, setHit] = useState(0);

    if(loading){
        return <CircularProgress />
    }

    const handleChangePage = (e, newPage) => {
        setCurrentPage(newPage);
    }

    const handleChangeRowPerPage = e => {
        setRowPerPage(e.target.value);
    }

    const handleHit = e => {
        setHit(hit + 1)
    }

    const handleClick = (id) => {
        console.log(id)
        return (
            <Link to="#board/detail" />

        )
    }

    return (
        <BoardPresenter 
            data={data}
            loading={loading}
            currentPage={currentPage}
            rowPerPage={rowPerPage}
            onChangePage={handleChangePage}
            onChangeRowPage={handleChangeRowPerPage}
            hit={hit}
            handleClick={handleClick}
            />
    )
}