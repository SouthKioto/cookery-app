import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Recipe } from '../../Helpers/Interfaces';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const LikedRecipes = ({ userId }) => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  const [dataAreSet, setDataAreSet] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/get-liked-recipes/${userId}`)
      .then(res => {
        setLikedRecipes(res.data);
        console.log(res.data);
        setDataAreSet(true);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(userId);
  }, [dataAreSet]);

  return (
    <>
      <Container>
        <p className='text-xl font-bold p-2 text-center'>Ulubione</p>

        {likedRecipes && likedRecipes.length > 0 ? (
          likedRecipes.map((recipe, index) => (
            <Link to={`/recipePage/${recipe.recipe_id}`} style={{ textDecoration: 'none' }}>
              <Card key={index} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))
        ) : (
          <div> nie masz ulubionych przepisów</div>
        )}
      </Container>
    </>
  );
};
