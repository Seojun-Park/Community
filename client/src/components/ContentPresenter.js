import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CircularProgress, TablePagination } from "@material-ui/core";

const Wrapper = styled.div`
  height: 100vh;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 769px) {
    margin-top: 50px;
  }
`;

const Head = styled.header`
  font-size: 14pt;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span``;

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeadCol = styled.div`
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const Content = styled.table`
  margin-top: 25px;
`;

const TableHead = styled.thead`
  border-bottom: 1.5px solid #2c3e50;
  border-top : 1.5px solid #2c3e50;
  background-color: #ecf0f1;
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
  border-bottom: 1px solid #bdc3c7;
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

const Button = styled.button`
  padding: 8px;
  color: white;
  border: none;
  background-color: #2ecc71;
  border-radius: 3px;
  font-size: 10pt;
  :hover {
    background-color: #16a085;
    transition: 0.2s linear;
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
  onChangeRowPage
}) => {
  if (loading) {
    return <CircularProgress />;
  }

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
  } else if (action === "notice") {
    totalDataLength = data.showNotice.length;

    slicedData = data.showNotice.slice(
      currentPage * rowPerPage,
      currentPage * rowPerPage + rowPerPage
    );
    emptyRow = rowPerPage - slicedData.length;
  }

  console.log(data);
  return (
    <Wrapper>
      <Head>
        <Title>{action}</Title>
        <HeadContainer>
          <HeadCol>
            <Link to={`${action}/write`}>
              <Button>Add</Button>
            </Link>
          </HeadCol>
        </HeadContainer>
      </Head>
      <Content>
        <TableHead>
          <RowTop>
            <TopCell style={{ width: "3%" }}>#</TopCell>
            <TopCell style={{ width: "50%" }}>제목</TopCell>
            <TopCell style={{ width: "20%" }}>작성자</TopCell>
            <TopCell style={{ width: "20%" }}>작성일</TopCell>
            <TopCell style={{ width: "3%" }}>Hit</TopCell>
          </RowTop>
        </TableHead>
        <TableBody>
          {slicedData &&
            slicedData.map((b, index) => {
              const trimmedDate = `${b.createdAt}`.substr(5, 5);
              return (
                <React.Fragment key={index}>
                  <Row>
                    <MidCell>{`${totalDataLength - index}`}</MidCell>
                    <MidCell>
                      <Link to={`${action}/${b.id}`}>{b.title}</Link>
                    </MidCell>
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
