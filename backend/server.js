const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cookery_app',
});

//get
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';

  db.query(sql, (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});

app.get('/users/:id', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';

  const id = req.params.id;

  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});

//post
app.post('/loginUser', (req, res) => {
  const sql = 'SELECT * FROM users WHERE user_email = ? AND user_password = ?';
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      return res.json(results);
    } else {
      return res.status(401).json({ error: 'Invalid email, password or user doesn exist' });
    }
  });
});

app.post('/createUser', (req, res) => {
  const checkUserSql = 'SELECT * FROM users WHERE user_email = ?';
  const insertUserSql = 'INSERT INTO users (user_name, user_surname, user_email, user_password) VALUES (?, ?, ?, ?)';

  const { name, surname, email, password } = req.body;

  db.query(checkUserSql, [email], (err, results) => {
    if (err) {
      return res.json({ error: 'Database error: ' + err });
    }
    if (results.length > 0) {
      return res.json({ message: 'User already exists' });
    }

    db.query(insertUserSql, [name, surname, email, password], (err, results) => {
      if (err) {
        return res.json({ error: 'Error: ' + err });
      } else {
        return res.json({ message: 'User created successfully', userId: results.insertId });
      }
    });
  });
});

app.post('/createRecipe', (req, res) => {
  const sqlCheck = 'Select * from recipe where title = ? and description = ? and ingredients = ?';
  const sqlInsert = 'INSERT INTO recipe (title, description, ingredients, user_id) VALUES (?,?,?,?)';

  const { recipeTitle, recipeDescription, ingredientsArray, Id } = req.body;

  const ingredientsJSON = JSON.stringify(ingredientsArray);

  db.query(sqlCheck, [recipeTitle, recipeDescription, ingredientsJSON], (err, results) => {
    if (err) {
      return res.json({ error: 'Error: ' + err });
    } else {
      db.query(sqlInsert, [recipeTitle, recipeDescription, ingredientsJSON, Id], (err, results) => {
        if (err) {
          return res.json({ error: 'Error: ' + err });
        } else {
          return res.json({ message: 'Recipe created successfully', recipeId: results.insertId });
        }
      });
    }
  });
});

app.listen(8081, () => {
  console.log('Server running on port 8081');
});
