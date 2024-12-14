import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '../Helpers/Interfaces';
import { Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import { GenerateDish } from './user_components/GenerateDish';
import { AddUserRecipe } from './user_components/AddUserRecipe';
import { UserRecipesList } from './user_components/UserRecipesList';
import { GetUserIdFromToken } from '../Helpers/Utils';
import { LikedRecipes } from './user_components/LikedRecipes';

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await GetUserIdFromToken();
      setUserId(id);
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      axios
        .get<User[]>(`http://localhost:8081/users/${userId}`)
        .then(res => setUsers(res.data))
        .catch(error => console.error(error));
    }
  }, [userId]);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
    console.log(userId);
  };

  return (
    <>
      {/* 
      <table style={{ border: '1px solid black' }}>
        <tr style={{ border: '1px solid black' }}>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
          <th>Password</th>
        </tr>

        
        ))}
      </table>            
      */}

      <Container className='py-8 px-4 bg-gray-50 min-h-screen'>
        <Row className='justify-center'>
          <Col md={6} className='bg-white p-6 rounded-lg shadow-lg'>
            <p className='text-center text-xl font-bold text-gray-800'>
              Witaj {users[0]?.user_name} {users[0]?.user_surname}!
            </p>
          </Col>
        </Row>

        <div className='mt-6'></div>
        <Row className='justify-center'>
          <Col md={6} className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='text-gray-800'>
              <p className='text-lg font-semibold mb-4'>Konto:</p>
              <ul className='space-y-2'>
                <li>
                  <p className='font-bold'>
                    <span className='text-gray-600'>Imię:</span> {users[0]?.user_name}
                  </p>
                </li>
                <li>
                  <p className='font-bold'>
                    <span className='text-gray-600'>Nazwisko:</span> {users[0]?.user_surname}
                  </p>
                </li>
                <li>
                  <p className='font-bold'>
                    <span className='text-gray-600'>Email:</span> {users[0]?.user_email}
                  </p>
                </li>
                <li className='flex items-center'>
                  <p className='font-bold'>
                    <span className='text-gray-600'>Hasło:</span>{' '}
                    {passwordVisibility ? users[0]?.user_password : '*'.repeat(users[0]?.user_password.length)}
                  </p>
                  <Button
                    className='ml-4 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700'
                    onClick={handlePasswordVisibility}>
                    {passwordVisibility ? 'Ukryj' : 'Pokaż'}
                  </Button>
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <div className='mt-6'></div>

        <Row className='w-100 justify-content-center'>
          <Col md={7}>
            <Accordion defaultActiveKey='0' className='shadow-lg'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header className='text-lg font-semibold'>Generuj przepis na danie</Accordion.Header>
                <Accordion.Body>
                  <GenerateDish />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey='1'>
                <Accordion.Header className='text-lg font-semibold'>Dodaj własny przepis</Accordion.Header>
                <Accordion.Body>
                  <AddUserRecipe userId={users[0]?.user_id} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        <div className='mt-6'></div>

        <Row className='w-100 justify-content-center'>
          <Col md={7} className='bg-white p-6 rounded-lg shadow-lg'>
            <UserRecipesList userId={userId} />
          </Col>
        </Row>

        <div className='mt-6'></div>

        <Row className='w-100 justify-content-center'>
          <Col md={7} className='bg-white p-6 rounded-lg shadow-lg'>
            <LikedRecipes userId={userId} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
