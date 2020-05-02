import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CircularProgress } from '@material-ui/core';
import MarketPresenter from './MarketPresenter'
import { MARKET_DATA } from '../SharedQueries';

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
        <MarketPresenter 
            data={data}
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