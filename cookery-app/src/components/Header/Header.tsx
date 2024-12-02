import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavigationButton } from '../Helpers/NavigationButton';
import { UserAccountButton } from '../Helpers/UserAccountButton';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [userButtonVis, setUserButtonVis] = useState(false);

  const checkUserToken = () => {
    const tokenString = localStorage.getItem('userToken');

    if (tokenString) {
      try {
        const token = JSON.parse(tokenString);
        if (Array.isArray(token) && token[0]?.isLoggedIn !== undefined) {
          setUserButtonVis(!!token[0].isLoggedIn);
        } else {
          setUserButtonVis(false);
        }
      } catch (err) {
        console.error('Błąd parsowania tokena:', err);
        setUserButtonVis(false);
      }
    } else {
      setUserButtonVis(false);
    }
  };

  useEffect(() => {
    checkUserToken();

    const handleStorageChange = () => {
      checkUserToken();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Funkcja wylogowująca
  const handleLogOut = () => {
    localStorage.removeItem('userToken');
    setUserButtonVis(false);
  };

  return (
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
          <UserAccountButton onLogOut={handleLogOut} />
        ) : (
          <NavigationButton
            path={'/form/login'}
            variant={'outline-success'}
            buttonValue={'Login/Register'}
            onLogin={checkUserToken}
          />
        )}
      </Container>
    </Navbar>
  );
};
