import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';
import axios from 'axios';
import { useState } from 'react';
import { GenerateUserTokent } from '../Helpers/Utils';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [alert, setAlert] = useState<{ variant: string; message: string }>({ variant: '', message: '' });

  const navigate = useNavigate();

  const handleSubmitLogin = (e: any) => {
    e.preventDefault();

    axios
      .post('http://localhost:8081/loginUser', { email, password })
      .then(res => {
        const token = GenerateUserTokent(res.data[0].user_id);
        const storageData = [
          {
            token: token,
            isLoggedIn: true,
          },
        ];

        localStorage.setItem('userToken', JSON.stringify(storageData));
        navigate(`/users/userPage/${token}`);
      })
      .catch(error => {
        if (error.response) {
          setAlert({ variant: 'danger', message: error.response.data.error || 'Błąd logowania' });
        } else {
          setAlert({ variant: 'danger', message: 'Wystąpił błąd. Spróbuj ponownie.' });
        }
      });
  };

  return (
    <>
      <div className='flex items-center justify-center h-screen bg-gray-200'>
        <Container>
          {alert.message && (
            <Row className='justify-content-center'>
              <Col md={6}>
                <Alert variant={alert.variant}>{alert.message}</Alert>
              </Col>
            </Row>
          )}

          <Row className='justify-content-center'>
            <Col md={6}>
              <Card className='bg-opacity-75 bg-transparent shadow-lg border-0'>
                <Card.Body className='p-5'>
                  <h2 className='text-center mb-4 font-bold text-2xl'>Login</h2>
                  <Form onSubmit={handleSubmitLogin}>
                    <Form.Group controlId='formEmail' className='mb-3'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        className='rounded-md'
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId='formPassword' className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Password'
                        className='rounded-md'
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className='text-center'>
                      <Button variant='success' type='submit' className='w-full rounded-md'>
                        Log In
                      </Button>
                    </div>
                  </Form>
                  <div className='mt-4 text-center'>
                    <p>Or log in with</p>
                    <div className='flex justify-center space-x-4'>
                      <AiFillFacebook className='text-blue-600 text-3xl cursor-pointer' />
                      <AiFillGoogleCircle className='text-red-500 text-3xl cursor-pointer' />
                      <AiFillTwitterCircle className='text-blue-400 text-3xl cursor-pointer' />
                    </div>
                  </div>
                  <div className='mt-4 text-center'>
                    <NavLink to='/form/register' className='text-success'>
                      Don't have an account? Sign up
                    </NavLink>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
