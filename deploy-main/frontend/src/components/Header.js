import React, { useEffect } from "react";

/* REACT BOOTSTRAP */
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { logout } from "../actions/userActions";

/* COMPONENTS */
import SearchBox from "./SearchBox";

/* TRANSLATIONS */
import NavTra from './navTra';

import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  /* HANDLER */
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  const [age, setAge] = React.useState("TH");

  const handleChange = (event) => {
    setAge(event.target.value);
    window.localStorage.setItem("lang", event.target.value);
  };
  useEffect(() => {
    let lang = window.localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang.toLowerCase());
      setAge(lang);
    }
  }, []);


  return (
    <header>
      <Navbar bg="warning" variant="black" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src='logo.png' width={145} height={145}/>
            </Navbar.Brand>
          </LinkContainer>
          

          
          <Navbar.Toggle aria-controls="navbarScroll" 
          >
            About
            </Navbar.Toggle>
      
          <Navbar.Collapse id="navbarScroll">
            
            <SearchBox />
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            > 
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> {t('Cart')}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>{t('Profile')}</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    {t('Logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> {t('Login')}
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>{t('Manage Users')}</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>{t('Manage Package')}</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>{t('Manage Orders')}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {t('Logout')}
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <NavTra>{t('translation')}</NavTra>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
