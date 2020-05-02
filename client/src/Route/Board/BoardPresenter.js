import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    TablePagination,
    TableFooter,
    CircularProgress,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

const Wrapper = styled(Table)``;

const Erow = styled(TableRow)`
    :hover {
        background-color: #f2f2f2;
        transition: 0.2s linear;
        cursor: pointer;
    }
`;
const Head = styled(TableCell)`
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 25pt;
    border: none;
`;

export default ({
    hit,
    data,
    loading,
    rowPerPage,
    currentPage,
    onChangePage,
    onChangeRowPage,
}) => {
    if(loading){
        return <CircularProgress />
    }
    let totalDataLength = data.showBoard.length;

    let slicedData = data.showBoard.slice(
        currentPage * rowPerPage,
        currentPage * rowPerPage + rowPerPage
        );
    let emptyRow = rowPerPage - slicedData.length;

    console.log(data);
    return (
        <Wrapper>
            <TableHead>
                <TableRow>
                    <Head>Notice</Head>
                </TableRow>
            </TableHead>
            <TableHead>
                <TableRow>
                    <TableCell style={{ width:"5%" }}>#</TableCell>
                    <TableCell style={{ width:"60%" }}>Title</TableCell>
                    <TableCell style={{ width:"15%" }}>Created by</TableCell>
                    <TableCell style={{ width:"15%" }}>Created Date</TableCell>
                    <TableCell style={{ width:"5%" }}>Hit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {slicedData ? slicedData.map((b, index) => {
                    const trimmedDate = `${b.createdAt}`.substr(2,8);
                    return (
                        <Erow key={b.id}>
                            <TableCell>{`${totalDataLength - index}`}</TableCell>
                            <TableCell><Link to={{
                                    pathname:"/board/detail",
                                    state:{
                                        id: b.id,
                                        title: b.title,
                                        caption: b.caption,
                                        craetedAt: b.createdAt,
                                        username: b.user.username,
                                        comments: b.comments
                                    }
                                }}>{b.title}</Link></TableCell>
                            <TableCell>{b.user.username}</TableCell>
                            <TableCell>{trimmedDate}</TableCell>
                            <TableCell>{hit}</TableCell>
                        </Erow>
                        )})
                        :
                        <TableRow key={loading}>
                            <TableCell><CircularProgress /></TableCell>
                        </TableRow>
                    }
                <TableRow style={{ height: 50.91 * emptyRow }}>
                    <TableCell colSpan={5} />
                </TableRow>
            </TableBody>

            <TableFooter>
                <TableRow >
                    <TablePagination
                        colSpan={5}
                        count={data.showBoard.length}
                        page={currentPage}
                        rowsPerPage={rowPerPage}
                        rowsPerPageOptions={[10, 25, 50]}
                        SelectProps={{
                            inputProps: { 'aria-label': 'Rows per page' },
                            native: true,
                            }}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowPage}
                    />
                </TableRow>
            </TableFooter>
        </Wrapper>
    )
}