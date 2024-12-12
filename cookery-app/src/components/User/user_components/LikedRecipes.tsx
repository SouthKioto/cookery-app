import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Recipe } from '../../Helpers/Interfaces';

export const LikedRecipes = () => {
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);
  return (
    <>
      <Container>
        <p className='text-xl font-bold p-2 text-center'>Ulubione</p>

        {/* Add your liked recipes here */}

        {likedRecipes.length > 0 ? (
          likedRecipes.map(recipe => (
            <div key={recipe.recipe_id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))
        ) : (
          <div> nie masz ulubionych przepisów</div>
        )}
      </Container>
    </>
  );
};
