import React, { useState } from 'react';
import BoardPresenter from './BoardPresenter'
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import { BOARD_DATA } from '../SharedQueries';

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

    // const LinkButton = ({ history }) => (
    //     <button onClick={() => { history.push('#/board/detail'); }} >
    //       Log in
    //     </button>
    //   );

    return (
        <BoardPresenter 
            data={data}
            loading={loading}
            currentPage={currentPage}
            rowPerPage={rowPerPage}
            onChangePage={handleChangePage}
            onChangeRowPage={handleChangeRowPerPage}
            hit={hit}
            setHit={setHit}
            // link={LinkButton}
            />
    )
}