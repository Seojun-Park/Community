import React, { useState } from 'react';
import ContentPresenter from '../../components/ContentPresenter'
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import { NOTICE_DATA } from '../../SharedQueries';

export default () => {
    const { data, loading } = useQuery(NOTICE_DATA);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowPerPage, setRowPerPage] = useState(10);
    const [hit, setHit] = useState(0);

    if(loading){
        return <CircularProgress />
    }

    console.log(data);

    const handleChangePage = (e, newPage) => {
        setCurrentPage(newPage);
    }

    const handleChangeRowPerPage = e => {
        setRowPerPage(e.target.value);
    }

    return (
        <ContentPresenter 
            data={data}
            action="notice"
            loading={loading}
            currentPage={currentPage}
            rowPerPage={rowPerPage}
            onChangePage={handleChangePage}
            onChangeRowPage={handleChangeRowPerPage}
            hit={hit}
            setHit={setHit}
            />
    )
}