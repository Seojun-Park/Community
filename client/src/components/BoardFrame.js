import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pagenation from "./Pagenation";
import _ from "lodash";
import Avatar from "./Avatar";

const Container = styled.div`
  height: 100%;
`;

const TableFrame = styled.div`
  height: 100%;
  border-top: 2px solid #2f3640;
  border-bottom: 2px solid #2f3640;
`;

const TableHead = styled.div`
  border-bottom: 2px solid #2f3640;
  display: flex;
  width: 100%;
  padding: 8px 0;
  margin-bottom: 8px;
`;

const TableHeadCell = styled.div.attrs(props => ({
  className: props.className
}))`
  &.number {
    width: 10%;
    border-right: 1px solid #2f3640;
    overflow: hidden;
  }
  &.title {
    width: 40%;
    border-right: 1px solid #2f3640;
    overflow: hidden;
  }
  &.status {
    width: 15%;
    border-right: 1px solid #2f3640;
    overflow: hidden;
  }
  &.writer {
    width: 20%;
    border-right: 1px solid #2f3640;
    overflow: hidden;
  }
  &.createdat {
    width: 15%;
    overflow: hidden;
  }
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const TableBody = styled.div`
  height: 65vh;
`;

const TableRow = styled.ul`
  display: flex;
  align-items: center;
  overflow: hidden;
  :hover {
    background-color: #dcdde1;
    transition: 0.2s linear;
  }
`;

const TableBodyCell = styled.li.attrs(props => ({
  className: props.className
}))`
  &.number {
    width: 10%;
    text-align: center;
    overflow: hidden;
  }
  &.title {
    width: 40%;
    margin-left: 20px;
    cursor: pointer;
    overflow: hidden;
  }
  &.status {
    width: 15%;
    text-align: center;
    overflow: hidden;
  }
  &.writer {
    width: 20%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
  }
  &.createdat {
    width: 15%;
    text-align: center;
    overflow: hidden;
  }

  padding: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const ELink = styled(Link)`
  :hover {
    text-decoration: none;
  }
`;

export default ({ data: props, action }) => {
  const [data, setData] = useState({
    pageSize: 20,
    totalCount: props.length,
    currentPage: 1
  });

  const [onData, setOnData] = useState([]);

  const sliceDatabyPage = (props, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    setOnData(
      _(props)
        .slice(startIndex)
        .take(pageSize)
        .value()
    );
  };

  useEffect(() => {
    sliceDatabyPage(props, data.currentPage, data.pageSize);
  }, [props, data.currentPage, data.pageSize]);

  return (
    <Container>
      <TableFrame>
        <TableHead>
          <TableHeadCell className="number">#</TableHeadCell>
          <TableHeadCell className="title">제목</TableHeadCell>
          <TableHeadCell className="status">거래상황</TableHeadCell>
          <TableHeadCell className="writer">작성자</TableHeadCell>
          <TableHeadCell className="createdat">작성일</TableHeadCell>
        </TableHead>
        <TableBody>
          {onData.length !== 0
            ? onData.map((d, i) => {
                const trimmedDate = `${d.createdAt}`.substr(5, 5);
                return (
                  <TableRow key={i}>
                    <TableBodyCell className="number">{i}</TableBodyCell>
                    <TableBodyCell className="title">
                      <ELink to={`/detail/${action}/${d.id}`}>{d.title}</ELink>
                    </TableBodyCell>
                    {d.status === "one" && (
                      <TableBodyCell className="status">판매중</TableBodyCell>
                    )}
                    {d.status === "two" && (
                      <TableBodyCell className="status">예약중</TableBodyCell>
                    )}
                    {d.status === "three" && (
                      <TableBodyCell className="status">판매완료</TableBodyCell>
                    )}
                    <TableBodyCell className="writer">
                      <Avatar url={d.user.avatar} size={"sm"} />
                      {d.user.username}
                    </TableBodyCell>
                    <TableBodyCell className="createdat">
                      {trimmedDate}
                    </TableBodyCell>
                  </TableRow>
                );
              })
            : "none"}
        </TableBody>
      </TableFrame>
      <Pagenation data={data} onChangePage={setData} />
    </Container>
  );
};
