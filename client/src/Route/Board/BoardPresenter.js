import React from 'react';
import styled from 'styled-components';
import {
    CircularProgress,
    TableFooter,
    TablePagination,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

const Wrapper = styled.div`
    border-radius: 1px solid #fefefe;
    border: 4px;
    background-color: white;
    min-height: 80vh;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Container = styled.div`
    position: relative;
    min-height: 70vh;
`;

const Erow = styled(TableRow)`
    :hover {
        background-color: #f2f2f2;
        transition: 0.2s linear;
        cursor: pointer;
    }
`;

export default ({
    data,
    loading
}) => {
    if(loading){
        return <CircularProgress />
    }
    console.log(data.showBoard.length);


    return (
        <Wrapper>
            <div>
                <div>
                    <h2>image section</h2>
                    <div>
                        Notice
                    </div>
                </div>
            </div>
            <Container>
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width:"5%" }}>#</TableCell>
                                <TableCell style={{ width:"70%" }}>Title</TableCell>
                                <TableCell style={{ width:"10%" }}>Created by</TableCell>
                                <TableCell style={{ width:"10%" }}>Created Date</TableCell>
                                <TableCell style={{ width:"5%" }}>Hit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {data && data.showBoard ? data.showBoard.map((b, index) => {
                    const trimmedDate = `${b.createdAt}`.substr(0,10);
                    return (
                            <Erow key={b.id} id={b.id}>
                                <TableCell >{index}</TableCell>
                                <TableCell>{b.title}</TableCell>
                                <TableCell>{b.user.username}</TableCell>
                                <TableCell>{trimmedDate}</TableCell>
                                <TableCell>hit</TableCell>
                            </Erow>
                        )}):
                            <TableRow key={loading}>
                                <TableCell><CircularProgress /></TableCell>
                            </TableRow>
                        }
                        </TableBody>
                    </Table>
                    <TableFooter>
                        <TableRow >
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            colSpan={5}
                            // count={totalBoardData.length}
                            // rowsPerPage={this.state.rowsPerPage}
                            // page={this.state.page}
                            SelectProps={{
                            inputProps: { 'aria-label': 'Rows per page' },
                            native: true,
                            }}
                            // onChangePage={this.handleChangePage}
                            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                        </TableRow>
                    </TableFooter>
            </Container>
        </Wrapper>
    )
}