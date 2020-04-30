import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap'


const Wrapper = styled.div`
    margin-bottom: 30px;
`;

const MContainer = styled(Container)`
    background-color: #f2f2f2;
    padding: 20px;
    &:not(:last-child){
        margin-bottom: 20px;
    }
`;

export default () => {

    return (
        <Wrapper>
            <MContainer fluid>
                <Row>
                    <Col>공지사항 자리</Col>
                </Row>
            </MContainer>
            <MContainer fluid>
                <Row>
                    <Col>벼룩시장 요약</Col>
                </Row>
            </MContainer>
            <MContainer fluid>
                <Row>
                    <Col>내집찾기 요약</Col>
                </Row>
            </MContainer>
            <MContainer fluid>
                <Row>
                    <Col>광고</Col>
                </Row>
            </MContainer>
        </Wrapper>
    )
}