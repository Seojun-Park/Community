import React, { useState } from "react";
import styled from "styled-components";
import { BOARD_SEARCH, RENT_SEARCH, MARKET_SERACH } from "../SharedQueries";
import useInput from "../hooks/useInput";
import { useQuery } from "@apollo/react-hooks";

const Container = styled.div``;

const SearchBar = styled.input``;


export default ({ action, onChange }) => {
  const term = useInput("");

  if (action === "board") {
    const { data } = useQuery(BOARD_SEARCH, {
      skip: term.value === "",
      variables: {
        term: term.value
      }
    });
    if (data && data.searchBoard) {
      onChange(data.searchBoard);
      term.setValue("");
    }
  } else if (action === "market") {
    const { data } = useQuery(MARKET_SERACH, {
      skip: term.value === "",
      variables: {
        term: term.value
      }
    });
    if (data && data.searchMarket) {
      onChange(data.searchMarket);
      term.setValue("");
    }
  } else if (action === "rent") {
    const { data } = useQuery(RENT_SEARCH, {
      skip: term.value === "",
      variables: {
        term: term.value
      }
    });
    if (data && data.searchRent) {
      onChange(data.searchRent);
      term.setValue("");
    }
  }

  return (
    <Container>
      <SearchBar
        placeholder="Search"
        setValue={term.value}
        onChange={term.onChange}
      />
    </Container>
  );
};
