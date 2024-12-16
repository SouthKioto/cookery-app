import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Recipe } from '../../Helpers/Interfaces';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export const UserRecipesList: React.FC<{ userId: number | undefined }> = ({ userId }) => {
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [token, setToken] = useState();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!userId) return;
    axios
      .get<Recipe[]>(`http://localhost:8081/userRecipes/${userId}`)
      .then(res => {
        //console.log(res.data);
        setUserRecipes(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <p className='text-xl font-bold p-2 text-center'>
              {isAuthenticated ? 'Twoje Przepisy' : 'Utworzone przepisy'}
            </p>
            {userRecipes
              ? userRecipes.map((recipe, index) => (
                  <Link to={`/recipePage/${recipe.recipe_id}`} style={{ textDecoration: 'none' }}>
                    <Card key={index} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text>{recipe.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                ))
              : 'Nie utworzyłeś jeszcze swoich przepisów'}
          </Col>
        </Row>
      </Container>
    </>
  );
};
