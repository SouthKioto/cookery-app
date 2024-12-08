import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Recipe } from '../Helpers/Interfaces';
import axios from 'axios';

export const Home = () => {
  const [recipesData, setRecipesData] = useState<Recipe[]>();
  const [shorterDesription, setShorterDesription] = useState<string>();

  useEffect(() => {
    axios
      .get<Recipe[]>('http://localhost:8081/recipes')
      .then(res => {
        console.log(res.data);
        setRecipesData(res.data);

        //const date = new Date();
        //console.log(date);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleChangeDescription = (data: string) => {
    try {
      const description = data;

      if (description) {
        const shortenedDescription = description.length > 15 ? description.slice(0, 10) + '...' : description;

        return shortenedDescription;
      }
    } catch (error) {
      console.error('Błąd podczas zmiany opisu:', error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-green-400 to-blue-500 min-h-screen text-white'>
      <Container className='py-5'>
        <header className='text-center mb-5'>
          <h1 className='text-4xl font-bold'>Witamy w aplikacji kulinarnej!</h1>
          <p className='text-xl mt-3'>
            Odkrywaj, gotuj i dziel się swoimi ulubionymi przepisami z naszą tętniącą życiem społecznością.
          </p>
        </header>

        {/* Section for Featured Recipes */}
        <section>
          <h2 className='text-2xl font-semibold text-center mb-4'>Najwyżej oceniane przepisy</h2>
          <Row className='g-4'>
            {recipesData ? (
              recipesData.map((data, index) => (
                <Col md={4}>
                  <Card className='shadow-lg'>
                    <Card.Body>
                      <Card.Title className='font-semibold text-lg'>{data.title}</Card.Title>
                      <Card.Text>{handleChangeDescription(data.description)}</Card.Text>
                      <Button variant='primary' className='w-full bg-green-500 hover:bg-green-600'>
                        View Recipe
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Alert variant={'danger'}>Nie udało się władować przepisów</Alert>
            )}
          </Row>
        </section>

        {/* About Section */}
        <section className='mt-5'>
          <h2 className='text-2xl font-semibold text-center mb-4'>O nas</h2>
          <p className='text-center mx-auto max-w-3xl'>
            Cookery App to najlepszy towarzysz do odkrywania niesamowitych przepisów i dzielenia się swoimi kulinarnymi
            kreacjami. Dołącz do pełnej pasji społeczności entuzjastów jedzenia i odkrywaj radość wspólnego gotowania.
          </p>
        </section>
      </Container>
    </div>
  );
};
