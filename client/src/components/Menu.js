import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import styled from 'styled-components'

import { Link } from 'react-router-dom'

const Button = styled.button`
background: none;
border: none;
color :#ecf0f1;
font-weight: 400;
`;

const ELink = styled(Link)`
    text-decoration: none;
    color: black;
`


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
      <Button
        onClick={handleClick}
      >
          temp
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><ELink to="/news">뉴스</ELink></MenuItem>
        <MenuItem onClick={handleClose}><ELink to="/market">벼룩시장</ELink></MenuItem>
        <MenuItem onClick={handleClose}><ELink to="/board">게시판</ELink></MenuItem>
      </Menu>
    </div>
  );
};
