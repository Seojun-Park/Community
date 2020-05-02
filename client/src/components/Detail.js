import React from 'react';
import styled from 'styled-components';
import FatText from './FatText';
import { Typography } from '@material-ui/core';


const Wrapper = styled.div`
    margin-top: 50px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Head = styled.div`
    display: flex;
    flex-direction: column;
    height: 20%;
`;

const Container = styled.div`
    margin-top: 30px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    background-color: white;
    padding: 20px;
    height: 80%;
`;

export default (data) => {
    const { state } = data.location;
    console.log(data)
    console.log(state)
    return (
        <Wrapper>
            <Head>
                <FatText text="제목" />
                <Typography variant="h4" component="span">{state.title}</Typography>
            </Head>
            <Container>
                <Typography variant="body1" component="span">{state.caption}</Typography>
            </Container>
        </Wrapper>
    )
}