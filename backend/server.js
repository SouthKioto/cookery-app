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
  const sql = 'SELECT * FROM users WHERE user_id = ?';

  const id = req.params.id;

  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});

app.get('/userRecipes/:id', (req, res) => {
  const sqlSelectRecipes =
    'SELECT recipe_id, title, description, ingredients, cooking_time, add_date, concat(users.user_name, " ", users.user_surname) as author, users.user_id FROM `recipe` JOIN user_recipe USING(recipe_id) JOIN users USING(user_id) WHERE user_id = ?';

  const id = req.params.id;

  db.query(sqlSelectRecipes, [id], (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});

app.get('/recipes/:id', (req, res) => {
  const sqlSelectRecipes =
    'SELECT recipe_id, title, description, ingredients, cooking_time, add_date, concat(users.user_name, " ", users.user_surname) as author, users.user_id FROM `recipe` JOIN user_recipe USING(recipe_id) JOIN users USING(user_id) WHERE recipe_id = ?';

  const id = req.params.id;

  db.query(sqlSelectRecipes, [id], (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});

app.get('/nevest-recipes', (req, res) => {
  const sqlSelectAll = 'SELECT * from recipe ORDER BY add_date DESC LIMIT 6';

  db.query(sqlSelectAll, (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});

/*app.get('/nevest-recipes', (req, res) => {
  const sqlSelectAll = 'SELECT * from recipe ORDER BY add_date DESC LIMIT 6';

  db.query(sqlSelectAll, (error, result) => {
    if (error) {
      return res.json('Error: ' + error);
    } else {
      return res.json(result);
    }
  });
});*/

app.get('/searchRecipes/:query', (req, res) => {});

app.get('/get-liked-recipes/:userId', (req, res) => {
  const sql = 'SELECT * FROM `recipe` JOIN user_liked_recipes USING(recipe_id) WHERE user_id = ?';

  const id = req.params.userId;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    } else if (result.leght === 0) {
      return res.status(404).json({ error: 'Not found recipes' });
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
  const sqlCheck = 'SELECT * FROM recipe WHERE title = ? AND description = ? AND ingredients = ?';
  const sqlInsertRecipe =
    'INSERT INTO recipe (title, description, ingredients, cooking_time, add_date) VALUES (?, ?, ?, ?,?)';
  const sqlInsertUserRecipe = 'INSERT INTO user_recipe (user_id, recipe_id) VALUES (?, ?)';

  const { recipeTitle, recipeDescription, ingredientsArray, recipeCookingTime, Id } = req.body;

  const ingredientsJSON = JSON.stringify(ingredientsArray);

  db.query(sqlCheck, [recipeTitle, recipeDescription, ingredientsJSON, recipeCookingTime], (err, results) => {
    if (err) {
      return res.json({ error: 'Error: ' + err });
    }

    if (results.length > 0) {
      return res.json({ message: 'Recipe already exists' });
    } else {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let currentDate = `${year}-${month}-${day}`;

      db.query(
        sqlInsertRecipe,
        [recipeTitle, recipeDescription, ingredientsJSON, recipeCookingTime, date],
        (err, result) => {
          if (err) {
            return res.json({ error: 'Error: ' + err });
          }

          const recipeId = result.insertId;

          db.query(sqlInsertUserRecipe, [Id, recipeId], (err, results) => {
            if (err) {
              return res.json({ error: 'Error: ' + err });
            }
            return res.json({ message: 'Recipe created successfully', recipeId: recipeId });
          });
        }
      );
    }
  });
});

app.post('/add-to-liked-recipes', (req, res) => {
  //const sqlCheckLiked = 'INSERT INTO liked_recipes  ';
  const { userId, recipeId } = req.body;
  const sqlCheckExistLikedRecipe = 'SELECT * FROM `user_liked_recipes` WHERE user_id = ? AND recipe_id = ?';
  const sqlInsertLiked = 'INSERT INTO user_liked_recipes (user_id, recipe_id) VALUES (?,?)';

  db.query(sqlCheckExistLikedRecipe, [userId, recipeId], (err, results) => {
    if (err) {
      return res.json({ error: 'Error:' + err });
    } else if (results.length > 0) {
      return res.json({ message: 'Like are already exist' });
    } else {
      db.query(sqlInsertLiked, [userId, recipeId], (err, results) => {
        if (err) {
          return res.json({ error: 'Error:' + err });
        }
      });
    }
  });
});

app.post('/remove-from-liked-recipes', (req, res) => {
  const { userId, recipeId } = req.body;
  const sqlCheckExistLikedRecipe = 'SELECT * FROM `user_liked_recipes` WHERE user_id = ? AND recipe_id = ?';
  const sqlDeleteLiked = 'DELETE FROM user_liked_recipes WHERE user_id = ? AND recipe_id = ?';

  db.query(sqlCheckExistLikedRecipe, [userId, recipeId], (err, results) => {
    if (err) {
      return res.json({ error: 'Error:' + err });
    } else if (results.length > 0) {
      db.query(sqlDeleteLiked, [userId, recipeId], (err, results) => {
        if (err) {
          return res.json({ error: 'Error:' + err });
        } else {
          return res.json({ message: 'Like removed successfully' });
        }
      });
    }
  });
});

app.post('/is-liked-recipe', (req, res) => {
  const sqlCheck = 'SELECT * FROM user_liked_recipes WHERE user_id = ? AND recipe_id = ?';
  const { userId, recipeId } = req.body;

  db.query(sqlCheck, [userId, recipeId], (err, result) => {
    if (err) {
      return res.json({ error: 'Database error: ' + err });
    } else if (result.length > 0) {
      return res.json({ liked: true });
    } else {
      return res.json({ liked: false });
    }
  });
});

app.listen(8081, () => {
  console.log('Server running on port 8081');
});
