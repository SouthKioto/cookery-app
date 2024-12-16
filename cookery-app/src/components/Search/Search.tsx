import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {};

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      {/* Search Bar Section */}
      <Container className='pt-5 pb-3'>
        <Row className='justify-content-center'>
          <Col md={6}>
            <Form className='flex gap-2'>
              <Form.Control
                type='search'
                placeholder='Search...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                className='rounded-md shadow-sm focus:ring focus:ring-blue-300'
              />
              <Button
                variant='primary'
                onClick={handleSearch}
                className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600'>
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Results Section */}
      <Container className='flex-1'>
        {results.length > 0 ? (
          <div className='bg-white p-4 rounded shadow-md'>
            <h2 className='text-lg font-semibold text-gray-800 mb-3'>Results:</h2>
            <ul className='list-disc pl-5'>
              {results.map((result, index) => (
                <li key={index} className='text-gray-600 mb-1'>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className='text-center text-gray-500 mt-4'>No results found. Try searching for something else.</div>
        )}
      </Container>
    </div>
  );
};
