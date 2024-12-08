import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Recipe } from '../Helpers/Interfaces';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';

import { useAuth } from '../Context/AuthContext';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  const [authorId, setAuthorId] = useState<number>();
  const [token, setToken] = useState<string>();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    axios
      .get<Recipe[]>(`http://localhost:8081/recipes/${recipeId}`)
      .then(res => {
        setRecipeData(res.data);
        //handleCheckToken();
        if (isAuthenticated) {
          const storedToken = localStorage.getItem('userToken');
          if (storedToken) {
            try {
              const tokenParsed = JSON.parse(storedToken);
              setToken(tokenParsed[0]?.token);
            } catch (e) {
              console.error(e);
            }
          }
        } else {
          setAuthorId(recipeData[0]?.user_id);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [recipeId]);

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleParseIngredients = (ingredients: string) => {
    try {
      return JSON.parse(ingredients);
    } catch {
      return [];
    }
  };

  return (
    <Container className='mt-10 flex justify-center' fluid>
      <Card className='w-full md:w-2/3 lg:w-1/2 shadow-lg rounded-lg overflow-hidden'>
        <Card.Body className='p-6 bg-gray-50'>
          <div className='flex justify-between items-center mb-4'>
            <Card.Title className='text-3xl font-extrabold text-gray-800'>
              {recipeData[0]?.title || 'Recipe Title'}
            </Card.Title>
            <div onClick={toggleFavorite} className='cursor-pointer text-yellow-500'>
              {isFavorite ? <AiFillStar size={30} /> : <AiOutlineStar size={30} />}
            </div>
          </div>

          <Card.Text className='text-gray-600 text-lg leading-relaxed mb-6'>
            {recipeData[0]?.description || 'No description available.'}
          </Card.Text>

          <h2 className='text-2xl font-semibold text-gray-700 mb-3'>Ingredients</h2>
          <ListGroup className='mb-6'>
            {handleParseIngredients(recipeData[0]?.ingredients).map((ingredient: string, index: number) => (
              <ListGroup.Item key={index} className='bg-white border-gray-200 rounded-lg shadow-sm p-2 mb-2'>
                {ingredient}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Link
            to={`http://localhost:5173/users/userPage/${isAuthenticated ? token : authorId}`}
            className='text-gray-700 text-sm font-medium mb-4'>
            <strong>Author:</strong> {recipeData[0]?.author || 'Unknown'}
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};
