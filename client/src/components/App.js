import React from "react";
import styled from "styled-components";
import Routes from "./Routes";
import { gql } from "apollo-boost";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled(Container)`
  margin: 0 auto;
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  return (
    <>
      <Router>
        <>
          {isLoggedIn && <Header />}
          <Wrapper>
            <Routes isLoggedIn={isLoggedIn} />
            {/* <Footer /> */}
          </Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
};
