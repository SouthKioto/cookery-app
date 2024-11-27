import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AiFillFacebook, AiFillGoogleCircle, AiFillTwitterCircle } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const RegisterPage = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repPassword, setRepPassword] = useState<string>('');

  const validatePassword = () => {
    if (password !== repPassword) {
      alert('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmitRegister = e => {
    e.preventDefault();

    if (validatePassword()) {
      //console.log(name, surname, email, password, repPassword);
      // dodać obsługę zwracanych mess np. user already exist
      axios
        .post('http://localhost:8081/createUser', { name, surname, email, password })
        .then(res => {
          console.log(res);
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <>
      <div className='flex items-center justify-center h-screen bg-gray-200'>
        <Container>
          <Row className='justify-content-center'>
            <Col md={6}>
              <Card className='bg-opacity-75 bg-transparent shadow-lg border-0'>
                <Card.Body className='p-5'>
                  <h2 className='text-center mb-4 font-bold text-2xl'>Register</h2>
                  <Form onSubmit={handleSubmitRegister}>
                    <Form.Group controlId='formName' className='mb-3'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        onChange={e => setName(e.target.value)}
                        type='text'
                        placeholder='Enter name'
                        className='rounded-md'
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId='formSurname' className='mb-3'>
                      <Form.Label>Surname</Form.Label>
                      <Form.Control
                        onChange={e => setSurname(e.target.value)}
                        type='text'
                        placeholder='Enter surname'
                        className='rounded-md'
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId='formEmail' className='mb-3'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        onChange={e => setEmail(e.target.value)}
                        type='email'
                        placeholder='Enter email'
                        className='rounded-md'
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId='formPassword' className='mb-3'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        placeholder='Password'
                        className='rounded-md'
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId='formRepeatPassword' className='mb-3'>
                      <Form.Label>Repeat Password</Form.Label>
                      <Form.Control
                        onChange={e => setRepPassword(e.target.value)}
                        type='password'
                        placeholder='Repeat Password'
                        className='rounded-md'
                        required
                      />
                    </Form.Group>

                    <div className='text-center'>
                      <Button variant='success' type='submit' className='w-full rounded-md'>
                        Register
                      </Button>
                    </div>
                  </Form>
                  <div className='mt-4 text-center'>
                    <p>Or register in with</p>
                    <div className='flex justify-center space-x-4'>
                      <AiFillFacebook className='text-blue-600 text-3xl cursor-pointer' />
                      <AiFillGoogleCircle className='text-red-500 text-3xl cursor-pointer' />
                      <AiFillTwitterCircle className='text-blue-400 text-3xl cursor-pointer' />
                    </div>
                  </div>
                  <div className='mt-4 text-center'>
                    <NavLink to='/form/login' className='text-secondary'>
                      You have an account? Log In
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
