import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import "./style.scss";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../reducers/userReducer';
function NavbarCustom() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  return (
    <Navbar bg="danger" expand="lg">
      <Container>
        <Navbar.Brand className='navbar'>
          <Link className='nav_links' to="/">MERN_CLOUD</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuth ?  <Link className='nav_links' to="login">Войти</Link> : ''}
            {!isAuth ?  <Link className='nav_links'  to="register">Регистрация</Link> : ''}
            {isAuth ?  <Link className='nav_links' to="login" onClick={() => dispatch(logout())}>Выйти</Link> : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;