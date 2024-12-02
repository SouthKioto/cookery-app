import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';

interface IIngredientsProps {
  handleDeleteIndredient: () => void;
}
export const GenerateDish = () => {
  const [ingredients, setIngredients] = useState<string>();
  const [ingredientsArray, setIngredientsArray] = useState<string[]>([]);
  const [changeGenerateRecipeBuuttonVisibility, setChangeGenerateRecipeButtonVisibility] = useState<boolean>(false);

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
    setIngredientsArray(ingredients ? ingredients.replace(/\s/g, '').split(',') : []);
    checkIngredientsArray();
    //console.log(ingredientsArray);
  };
  return (
    <Container fluid>
      <Row className='justify-center'>
        <Col md={6} className='bg-white p-6 rounded-lg shadow-lg'>
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
            {changeGenerateRecipeBuuttonVisibility && (
              <Button className='bg-blue-500 w-32 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-300'>
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
    </Container>
  );
};
