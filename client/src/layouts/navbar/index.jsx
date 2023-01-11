import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import "./style.scss";
function NavbarCustom() {
  return (
    <Navbar bg="danger" expand="lg">
      <Container>
        <Navbar.Brand className='navbar'>
          <Link className='nav_links' to="/">MERN_CLOUD</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav_links' to="login">Войти</Link>
            <Link className='nav_links'  to="register">Регистрация</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;