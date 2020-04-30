import React from 'react';
import styled from 'styled-components';
// import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Media from 'react-media';


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

const Bottom = styled.div`
    display: flex;
`;


export default () => {


        return (
            <Wrapper>
                <div className="orderTop">
                    <div className="orderTop_back">
                        <span>image section</span>
                        <div className="orderTop_text">
                            Notice
                        </div>
                    </div>
                </div>

                    <Container>

                    {/* <Media query="(max-width: 960px)"> */}
                        
                    <Table className="table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table_header" style={{ width:"10%" }}>#</TableCell>
                                <TableCell className="table_header" style={{ width:"60%" }}>Title</TableCell>
                                <TableCell className="table_header" style={{ width:"10%" }}>Created by</TableCell>
                                <TableCell className="table_header" style={{ width:"10%" }}>Created Date</TableCell>
                                <TableCell className="table_header" style={{ width:"5%" }}>Hit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow   className="table_row"
                                            // key ={b.id}
                                            component={Link} 
                                            to="/" 
                                            >
                                    <TableCell className="table_body">number</TableCell>
                                    <TableCell className="table_body">title</TableCell>
                                    <TableCell className="table_body">Creater</TableCell>
                                    <TableCell className="table_body">CreatedAt</TableCell> 
                                    <TableCell className="table_body">Hit</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* </Media> */}
                    <Bottom>
                        <Toolbar>
                            <div className="search" style={{ width: "30%" }}>
                                <SearchIcon className="searchIcon" />
                            </div>
                            <InputBase
                                        placeholder="Search"
                                        className="inPutRoot"
                                        inputProps={{ 'aria-label': 'search' }}
                                        name="search Keyword"
                                        // value={this.state.searchKeyword}
                                        // onChange={this.handleChangeValue} 
                                        />
                        </Toolbar>
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
                    </Bottom>
                    {/* </Media> */}
                </Container>

            </Wrapper>
        )
}