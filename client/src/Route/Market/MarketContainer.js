import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import { MARKET_DATA } from '../../SharedQueries';
import ContentPresenter from '../../components/ContentPresenter'

export default () => {
    const { data, loading } = useQuery(MARKET_DATA);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ rowPerPage, setRowPerPage ] = useState(10);
    const [ hit, setHit ] = useState(0);

    if(loading) {
        return <CircularProgress />
    }

    const handleChangePage = (e, newPage) => {
        setCurrentPage(newPage);
    }

    const handleChangeRowPerPage = e => {
        setRowPerPage(e.target.value);
    }

    return (
        <ContentPresenter
            data={data}
            action="market"
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