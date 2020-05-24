import React from "react";
import styled from "styled-components";
import _ from "lodash";

const Wrapper = styled.nav``;

const Pagenation = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const PagenationContainer = styled.li.attrs(props => ({
  className: props.className
}))`
  &.on {
    background-color: #4cd137;
  }
  list-style: none;
  background-color: #f5f6fa;
  border: 1px solid #192a56;
  padding: 5px;
  min-width: 30px;
  text-align: center;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
`;

export default props => {
  const {
    data: { currentPage, pageSize, totalCount }
  } = props;

  const pageCount = Math.ceil(totalCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  return (
    <Wrapper>
      <Pagenation>
        {pages.map(page => (
          <PagenationContainer
            key={page}
            onClick={() =>
              props.onChangePage({ currentPage: page, pageSize, totalCount })
            }
            className={page === currentPage ? "on" : "off"}
          >
            {page}
          </PagenationContainer>
        ))}
      </Pagenation>
    </Wrapper>
  );
};
