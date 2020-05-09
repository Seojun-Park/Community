import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Button = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-weight: 400;
  @media screen and (min-width: 769px) {
    font-size: 12pt;
  }
`;

const ELink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    color: #2ecc71;
    transition: 0.2s linear;
  }
`;

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}> 메뉴</Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ELink to="/news">뉴스</ELink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ELink to="/market">벼룩시장</ELink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ELink to="/board">게시판</ELink>
        </MenuItem>
      </Menu>
    </div>
  );
};
