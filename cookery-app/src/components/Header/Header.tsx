import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavigationButton } from '../Helpers/NavigationButton';
import { UserAccountButton } from '../Helpers/UserAccountButton';
import { useAuth } from '../Context/AuthContext';
import { useEffect, useState } from 'react';

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand>Cookery</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to={'/home'}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to={'/search'}>
            Search
          </Nav.Link>
        </Nav>
        {isAuthenticated ? (
          <UserAccountButton onLogOut={logout} value={['Twoje konto', 'Wylogoj']} name={'Menu'} />
        ) : (
          <NavigationButton path={'/form/login'} variant={'outline-success'} buttonValue={'Login/Register'} />
        )}
      </Container>
    </Navbar>
  );
};
