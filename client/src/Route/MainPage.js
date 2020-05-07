import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { BOARD_DATA } from './SharedQueries';
import FatText from '../components/FatText'

const Wrapper = styled.div`
    margin-top : 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const MContainer = styled(Container)`
    margin-top: 20px;
    background-color: #f2f2f2;
    padding: 20px;
    &:not(:last-child){
        margin-bottom: 20px;
    }
`;

const ContentRow = styled(Row)`
    display: flex;
`;

const Content = styled.div`
    display: block;
    width: 20%;
    margin: 0 auto;
    padding: 5px;
    &:first{
        width: 50%;
    }
    &:not(:first-child){
        width: 10%;
    }
    &:not(:last-child){
        margin-right: 30px;
    }
`;

export default () => {
    const { data, loading } = useQuery(BOARD_DATA);
    if(loading){
        return <CircularProgress />
    }
    else if (!loading) {
        const { showBoard } = data;

        // Descending 찾기
        let reverseData = showBoard.reverse()
        const sliceData = reverseData.slice((showBoard.length + 15) - (showBoard.length));
        // const sliceData = reverseData.slice(5, 10);
        reverseData = sliceData.reverse()
        
        return (
            <Wrapper>
                <FatText text="Notice" />
                <MContainer fluid>
                    <ContentRow>
                        <Content>공지사항 요약</Content>
                    </ContentRow>
                </MContainer>

                <FatText text="Board" />
                <MContainer fluid>
                    {showBoard && reverseData.map((b, index) => {
                        const trimmedDate = `${b.createdAt}`.substr(5,5) + "  " +`${b.createdAt}`.substr(11,5);
                        return (
                                <ContentRow key={b.id}>
                                    <Content>{b.title}</Content>
                                    <Content>{b.user.username}</Content>
                                    <Content>{trimmedDate}</Content>
                                </ContentRow>
                        )
                    })}
                </MContainer>
                <FatText text="Market" />
                <MContainer fluid>
                    <ContentRow>
                        <Content>벼룩시장 요약</Content>
                    </ContentRow>
                </MContainer>
                <FatText text="Immobiler" />
                <MContainer fluid>
                    <ContentRow>
                        <Content>내집찾기 요약</Content>
                    </ContentRow>
                </MContainer>
                <MContainer fluid>
                    <ContentRow>
                        <Content>광고</Content>
                    </ContentRow>
                </MContainer>
            </Wrapper>
        )
    }
}