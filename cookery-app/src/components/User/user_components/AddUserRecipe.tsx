import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export const AddUserRecipe = ({ userId }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [ingredientsArray, setIngredientsArray] = useState<string[]>([]);
  const [recipeTitle, setRecipeTitle] = useState<string>('');
  const [recipeDescription, setRecipeDescription] = useState<string>('');
  const [changeAddButtonVisibility, setChangeAddButtonVisibility] = useState<boolean>(false);

  const Id = userId;

  useEffect(() => {
    checkIngredientsArray();
  }, [ingredientsArray, recipeTitle, recipeDescription]);

  const checkIngredientsArray = () => {
    if (
      ingredientsArray.length > 0 &&
      recipeTitle.length > 0 &&
      recipeDescription.length > 0 &&
      ingredients.length > 0
    ) {
      setChangeAddButtonVisibility(true);
    } else {
      setChangeAddButtonVisibility(false);
    }
  };

  const handleDeleteIndredient = (deletingIngredient: string) => {
    const newIngredients = ingredientsArray.filter(ingredient => ingredient !== deletingIngredient);
    setIngredientsArray(newIngredients);
  };

  const handleSubmitIngredients = () => {
    checkIngredientsArray();
    setIngredientsArray(ingredients ? ingredients.replace(/\s/g, '').split(',') : []);

    //console.log(ingredientsArray);
  };

  const handleAddToDatabase = e => {
    e.preventDefault();
    /*const userCreatedRecipeData = [];

    userCreatedRecipeData.push({
      recipeTitle: recipeTitle,
      recipeDescription: recipeDescription,
      recipeIngredients: ingredientsArray,
      userId: Id,
    });
    
     console.log(JSON.stringify(userCreatedRecipeData, null, 2));
    */

    console.log(Id);

    axios
      .post('http://localhost:8081/createRecipe', { recipeTitle, recipeDescription, ingredientsArray, Id })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Container fluid>
        <Row className='justify-center'>
          <Col md={10} className='bg-white p-6 rounded-lg shadow-lg'>
            {/* Recipe Title */}
            <p className='text-center text-md font-medium text-gray-600 mb-4'>Nazwa</p>
            <input
              type='text'
              placeholder='Podaj nazwę przepisu'
              className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              required
              onChange={e => setRecipeTitle(e.target.value)}
            />

            {/* Ingredients Input */}
            <p className='text-center text-md font-medium text-gray-600 my-6'>
              Podaj składniki (rozdzielone przecinkiem)
            </p>
            <textarea
              className='w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none'
              onChange={e => setIngredients(e.target.value)}
              placeholder='Np. pomidory, cebula, czosnek'
              required></textarea>
            <Button
              className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 mt-4'
              onClick={handleSubmitIngredients}>
              Dodaj składniki
            </Button>

            {/* Recipe Steps */}
            <p className='text-center text-md font-medium text-gray-600 my-6'>Wykonanie</p>
            <textarea
              className='w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none'
              placeholder='Tutaj podaj kroki wykonania przepisu'
              required
              onChange={e => setRecipeDescription(e.target.value)}></textarea>

            {/* Ingredients List */}
            {ingredientsArray.length > 0 && (
              <div className='mt-6'>
                <p className='font-semibold text-gray-700'>Składniki:</p>
                <ul className='list-disc list-inside mt-2'>
                  {ingredientsArray.map(data => (
                    <li key={data} className='flex justify-between items-center mb-2'>
                      <span className='text-gray-800'>{data}</span>
                      <Button
                        className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-lg shadow transition duration-300'
                        onClick={() => handleDeleteIndredient(data)}>
                        Usuń
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Database Button */}
            {changeAddButtonVisibility && (
              <Button
                className='bg-green-500 w-32 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300 mt-6'
                onClick={handleAddToDatabase}>
                Dodaj do bazy
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
