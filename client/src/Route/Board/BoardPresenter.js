import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
// import Input from '../../components/Input';
// import WritePost from '../../components/writePost';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { CircularProgress } from '@material-ui/core';


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
    onSubmit,
    title,
    caption,
    username,
    data,
    loading
}) => {
    console.log(data);
    if(loading){
        return <CircularProgress />
    }
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

            {/* <Link to={`/write`}>
                <Button>write</Button>
            </Link> */}
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
                            <Erow key={b.id}>
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
            </Container>
        </Wrapper>
    )
}