//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../logo.png"
import {
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useUserAuth } from "../Context/UserAuthContext";

import { Button, ButtonProps, Flex, useColorMode } from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';


function Header(props: ButtonProps) {
  const { user } = useUserAuth();
  console.log(user);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <Image
              borderRadius='full'
              boxSize='150px'
              src={Logo}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            {
              !user ?
                <>
                  <Nav.Link>
                    <Link to="/login">
                      Log In
                    </Link>
                  </Nav.Link>
                </>
                :
                <>
                  <Menu>
                    <MenuButton as={Button} colorScheme='pink'>
                      Profile
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title='Profile'>
                        <MenuItem>
                          <Link to="/profile">My Account</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/">Home</Link>
                        </MenuItem>
                        <MenuItem>
                          Wishlist
                        </MenuItem>
                        <MenuItem>
                          Payments
                        </MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuGroup title='Help'>
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                </>
            }
            {
              /* 
                Ideally, only the button component should be used (without Flex).
                Props compatible with <Button /> are supported. 
              */
            }
            <Nav.Link>
              <Flex h="3vh" justifyContent="center" alignItems="center">
                <Button
                  aria-label="Toggle Color Mode"
                  onClick={toggleColorMode}
                  _focus={{ boxShadow: 'none' }}
                  w="fit-content"
                  {...props}>
                  {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
                </Button>
              </Flex>
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;