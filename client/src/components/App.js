import React, { createContext } from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import GlobalStyle from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Header from "./Header";
import Footer from "./Footer";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

export const AppContext = createContext();

const Wrapper = styled.div``;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);
  return (
    <AppContext.Provider value={isLoggedIn}>
      <ThemeProvider theme={Theme}>
        <Router>
          <GlobalStyle />
          <Wrapper>
            <Header isLoggedIn={isLoggedIn} />
            <Routes />
            <Footer />
          </Wrapper>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </ThemeProvider>
    </AppContext.Provider>
  );
};
