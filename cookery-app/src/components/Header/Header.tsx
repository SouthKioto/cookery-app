import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavigationButton } from '../Helpers/NavigationButton';
import { UserAccountButton } from '../Helpers/UserAccountButton';
import { useEffect, useState } from 'react';
import { User } from '../Helpers/Interfaces';

export const Header = () => {
  const [userData, setUserData] = useState<User[]>();
  const token = localStorage.getItem('userToken');
  const [userButtonVis, setUserButtonVis] = useState(false);

  useEffect(() => {
    console.log(token);
    //setUserButtonVis(!!token);
  }, [token]);

  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand>Cookery App</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to={'/home'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={'/search'}>
              Search
            </Nav.Link>
          </Nav>
          {userButtonVis ? (
            <UserAccountButton />
          ) : (
            <NavigationButton path={'/form/login'} variant={'outline-success'} buttonValue={'Login/Register'} />
          )}
        </Container>
      </Navbar>
    </>
  );
};
