import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import { CircularProgress, TablePagination } from "@material-ui/core";
import Pagination from "react-bootstrap/Pagination";

const Wrapper = styled.div`
  height: 100vh;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
    margin-top: 50px;
  }
`;

const Head = styled.div`
  font-size: 14pt;
  font-weight: 600;
`;

const Content = styled.table`
  margin-top: 25px;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid #95a5a6;
`;

const RowTop = styled.tr``;

const TopCell = styled.th`
  padding: 15px;
  font-size: 3pt;
  text-align: center;
  &:not(:last-child) {
    border-right: 1px solid #95a5a6;
  }
`;

const TableBody = styled.tbody``;

const Row = styled.tr`
  :hover {
    background-color: #bdc3c7;
    transition: 0.2s linear;
  }
`;

const MidCell = styled.th`
  padding: 15px;
  font-size: 3pt;
  text-align: center;
  &:not(:last-child) {
    border-right: 1px solid #95a5a6;
  }
`;

const TableFooter = styled.tfoot``;

const FRow = styled.tr``;

export default ({
  hit,
  data,
  action,
  loading,
  rowPerPage,
  currentPage,
  onChangePage,
  onChangeRowPage,
  link
}) => {
  if (loading) {
    return <CircularProgress />;
  }

  console.log(action);
  let totalDataLength;
  let slicedData;
  let emptyRow;

  if (action === "board") {
    totalDataLength = data.showBoard.length;

    slicedData = data.showBoard.slice(
      currentPage * rowPerPage,
      currentPage * rowPerPage + rowPerPage
    );
    emptyRow = rowPerPage - slicedData.length;
  } else if (action === "market") {
    totalDataLength = data.showMarket.length;

    slicedData = data.showMarket.slice(
      currentPage * rowPerPage,
      currentPage * rowPerPage + rowPerPage
    );
    emptyRow = rowPerPage - slicedData.length;
  }

  console.log(data);
  return (
    <Wrapper>
      <Head>lala</Head>
      <Content>
        <TableHead>
          <RowTop>
            <TopCell style={{ width: "5%" }}>#</TopCell>
            <TopCell style={{ width: "50%" }}>제목</TopCell>
            <TopCell style={{ width: "15%" }}>작성자</TopCell>
            <TopCell style={{ width: "15%" }}>작성일</TopCell>
            <TopCell style={{ width: "15%" }}>조회수</TopCell>
          </RowTop>
        </TableHead>
        <TableBody>
          {slicedData &&
            slicedData.map((b, index) => {
              const trimmedDate = `${b.createdAt}`.substr(2, 8);
              return (
                <React.Fragment key={index}>
                  <Row>
                    <MidCell>{`${totalDataLength - index}`}</MidCell>
                    <MidCell>
                      <Link
                        to={{
                          pathname: "/board/detail",
                          state: {
                            id: b.id,
                            title: b.title,
                            caption: b.caption,
                            craetedAt: b.createdAt,
                            username: b.user.username,
                            comments: b.comments
                          }
                        }}
                      >
                        {b.title}
                      </Link>
                    </MidCell>
                    {/* <TableCell><Link to="board/detail"><Button text={b.title} onClick={link} /></Link></TableCell> */}
                    <MidCell>{b.user.username}</MidCell>
                    <MidCell>{trimmedDate}</MidCell>
                    <MidCell>{hit}</MidCell>
                  </Row>
                </React.Fragment>
              );
            })}
          <Row style={{ height: 50.91 * emptyRow }}>
            <MidCell colSpan={5} />
          </Row>
        </TableBody>
        <TableFooter>
          <FRow>
              <TablePagination
                colSpan={5}
                count={totalDataLength}
                page={currentPage}
                rowsPerPage={rowPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                SelectProps={{
                  inputProps: { "aria-label": "Rows per page" },
                  native: true
                }}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowPage}
              />
          </FRow>
        </TableFooter>
      </Content>
    </Wrapper>
  );
};
