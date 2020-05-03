import React from 'react';
import styled from 'styled-components';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'

import clsx from 'clsx';
import { makeStyles, Drawer, List, Divider, ListItem, ListItemIcon } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MenuIcon } from './Icon';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const Wrapper = styled.div`
    @media screen and (max-width: 500px) {
        background-color: red;
    }
`;

const Navi = styled.div`
    background-size:cover;
    position: relative;
    z-index: 2;
`;

const NavCont = styled.div`
    opacity: 0;
    background-size: cover;
    position: absolute;
    z-index: 1;
    top: -5px;
    left: -10px;
`;

export default () => {

    const classes = useStyles();
    const [state, setState] = React.useState({
      left: false
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {['notice', 'market', 'immobiler', 'board'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <Nav.Link href={`/#${text}`}>{text}</Nav.Link>
            </ListItem>
            
          ))}
        </List>
        <Divider />
      </div>
    );
  

    return (
        <Wrapper>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">
                    <Navi>
                        <MenuIcon />
                        <NavCont>
                            {['left'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                            ))}
                        </NavCont>
                    </Navi>
                </Navbar.Brand>
                <Nav className="mr-auto" activeKey="/home" >
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#notice">공지사항</Nav.Link>
                    <Nav.Link href="#market">벼룩시장</Nav.Link>
                    <Nav.Link href="#immobiler">내 집 찾기</Nav.Link>
                    <Nav.Link href="#board">자유게시판</Nav.Link>
                    <Nav.Link href="#bike">test</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar>


        </Wrapper>
    )
}