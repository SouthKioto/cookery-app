import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';

interface IIngredientsProps {
  handleDeleteIndredient: () => void;
}
export const GenerateDish = () => {
  const [ingredients, setIngredients] = useState<string>();
  const [ingredientsArray, setIngredientsArray] = useState<string[]>([]);
  const [changeGenerateRecipeButtonVisibility, setChangeGenerateRecipeButtonVisibility] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [recipeDetails, setRecipeDetails] = useState<any>(null);

  useEffect(() => {
    checkIngredientsArray();
  }, [ingredientsArray]);

  const checkIngredientsArray = () => {
    if (ingredientsArray.length > 0) {
      setChangeGenerateRecipeButtonVisibility(true);
    } else {
      setChangeGenerateRecipeButtonVisibility(false);
    }
  };

  const handleDeleteIndredient = (deletingIngredient: string) => {
    const newIngredients = ingredientsArray.filter(ingredient => ingredient !== deletingIngredient);
    setIngredientsArray(newIngredients);
  };

  const handleSubmitIngredients = () => {
    checkIngredientsArray();
    setIngredientsArray(ingredients ? ingredients.replace(/\s/g, '').split(',') : []);
  };

  const handleGenerateRecipe = async () => {
    console.log('Generowanie przepisu...');
    const apiKey = 'efe93d181e014131b7c109b6d4fb1d5a';
    const ingredientsList = ingredients?.replace(/\s/g, ''); // Usuń spacje
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);

      if (response.data && response.data.length > 0) {
        const randomRecipe = response.data[Math.floor(Math.random() * response.data.length)];
        setResponse(randomRecipe);

        await fetchRecipeDetails(randomRecipe.id);
      } else {
        setResponse(null);
        setRecipeDetails(null);
      }
    } catch (error) {
      console.error('Błąd pobierania przepisów:', error);
      setResponse(null);
    }
  };

  const fetchRecipeDetails = async (id: number) => {
    const apiKey = 'efe93d181e014131b7c109b6d4fb1d5a';
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      setRecipeDetails(response.data); // Zapisz szczegóły przepisu
    } catch (error) {
      console.error('Błąd pobierania szczegółów przepisu:', error);
    }
  };

  return (
    <Container fluid>
      <Row className='justify-center'>
        <Col md={10} className='bg-white p-6 rounded-lg shadow-lg'>
          <p className='text-center text-md font-medium text-gray-600 mb-4'>
            Podaj składniki (rozdzielone przecinkiem)
          </p>
          <textarea
            className='w-full h-40 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none'
            onChange={e => setIngredients(e.target.value)}
            placeholder='Np. pomidory, cebula, czosnek'></textarea>
          <div className='mt-4 flex justify-between'>
            <Button
              className='bg-green-500 w-32 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300'
              title='Zatwierdź składniki'
              onClick={handleSubmitIngredients}>
              Zatwierdź składniki
            </Button>
            {changeGenerateRecipeButtonVisibility && (
              <Button
                className='bg-blue-500 w-32 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300'
                onClick={handleGenerateRecipe}>
                Generuj przepis
              </Button>
            )}
          </div>
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
        </Col>
      </Row>
      {recipeDetails && (
        <Row>
          <div style={{ marginTop: '20px' }}>
            <h3 className='font-bold'>Przepis:</h3>
            <div
              style={{
                padding: '10px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}>
              <h4 className='font-bold text-xl'>{recipeDetails.title}</h4>
              <img
                src={recipeDetails.image}
                alt={recipeDetails.title}
                style={{ maxWidth: '100%', borderRadius: '5px' }}
              />
              <h5 className='font-bold'>Składniki:</h5>
              <ul>
                {recipeDetails.extendedIngredients.map((ingredient: any) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
              <h5 className='font-bold'>Kroki wykonania:</h5>
              <ol>
                {recipeDetails.analyzedInstructions[0]?.steps.map((step: any, index: number) => (
                  <li key={index}>{step.step}</li>
                )) || <p>Brak kroków wykonania.</p>}
              </ol>
            </div>
          </div>
        </Row>
      )}
    </Container>
  );
};
