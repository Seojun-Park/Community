import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import BoardPresenter from './BoardPresenter'
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';

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
    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);
    const [newData, setNewData] = useState([]);

    if(loading){
        return <CircularProgress />
    }

    const handleChangePage = (e, newPage) => {
        setCurrentPage(newPage);
        let slicedData = data.showBoard.slice(
            newPage * rowPerPage,
            newPage * rowPerPage + rowPerPage
            );
        console.log(slicedData);
        console.log(currentPage);
        console.log(newPage);
    }

    return (
        <>
            <BoardPresenter 
                data={data}
                loading={loading}
                currentPage={currentPage}
                rowPerPage={rowPerPage}
                setRowPerPage={setRowPerPage}
                setCurrentPage={setCurrentPage}
                onChangePage={handleChangePage}
                />
        </>
    )
}