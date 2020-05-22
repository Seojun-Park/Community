import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import GlobalStyle from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Header from "./Header";
import Footer from "./Footer";

const Wrapper = styled.div``;

export default () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Routes />
        <Footer />
      </Wrapper>
    </Router>
    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
  </ThemeProvider>
);
