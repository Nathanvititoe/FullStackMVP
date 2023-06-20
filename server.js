const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
// const client = new Pool ({
//     connectionString:process.env.DATABASE_URL
// });
const client = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  database: "mvp",
});

const PORT = 3001;
// const PORT = process.env.PORT;
app.use(express.static("public"));
app.use(express.json());

//default home route
// app.get('/', async (req, res) => {
// const results = await client.query('SELECT * FROM business_cards WHERE username = nathanvititoe');
// res.send('nathan account').status(200);
// });
//ALL BUSINESS CARD REST ROUTES

//create GET ALL route (shows all cards)
app.get("/cards", async (req, res) => {
  try { 
    const results = await client.query("SELECT * FROM business_cards");
    if (!results.rows) {
      console.log("couldn't reach database");
      res.send("bad url").status(400);
      return;
    }
    res.send(results.rows).status(200);
  } catch (err) {
    console.log(err.message);
    res.send(err.message).status(500);
  }
});

//create  GET ONE route (shows all of A users cards)
app.get("/cards/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const results = await client.query(
      "SELECT * FROM business_cards WHERE username = $1",
      [username]
    );
    if (!results.rows) {
      console.log("this card doesn't exist");
      res.send("this card doesn't exist").status(404);
      return;
    }
    res.send(results.rows).status(200);
  } catch (err) {
    console.log(err.message);
    res.send(err.message).status(500);
  }
});

//create POST route for new business cards
app.post("/cards", async (req, res) => {
  try {
    const { name, phone_number, email, occupation, backgroundColor, textColor, username } = req.body;
    const results = await client.query(
      "INSERT INTO business_cards (name, phone_number, email, occupation, background_color, text_color, username)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [name, phone_number, email, occupation,backgroundColor, textColor, username]
    );
    res.send(results.rows).status(201);
  } catch (err) {
    console.error(err);
    res.send(err).status(500);
  }
});

//create UPDATE route for each business card
app.put("/cards/:id", async (req, res) => {
    try {
       const { id } = req.params;
       const { name, phone_number, email, occupation, card_id } = req.body;
        const results = await client.query('UPDATE business_cards SET name = $1, phone_number = $2, email = $3, occupation = $4 WHERE card_id = $5', [name, phone_number, email, occupation, card_id]);
        if(!results.rows) {
            console.log('this card does not exist');
            res.send('this card does not exist').status(400);
            return;
        }
        res.send(results.rows[0]).status(200);
    } catch (err) {
        console.log(err.message);
        res.send(err.message).status(500);
    }
});
//create DELETE route (deletes a card)
app.delete("/cards/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const results = await client.query(
        "DELETE FROM business_cards WHERE card_id = $1",
        [id]
      );
      if (!results.rows) {
        console.log("this card does not exist");
        res.send("this card does not exist").status(400);
      }
      res.status(200).send(results.rows[0]);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  });

//CREATE REST ROUTES FOR USERS
//GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM users");
    if (!results.rows) {
      console.log("no users available");
      res.send("no users available").status(400);
      return;
    }
    res.send(results.rows).status(200);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});
//GET A USER
app.get('/users/:username', async (req, res) => {
    try { 
        const { username } = req.params;
        const results = await client.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
          );
          if (!results.rows) {
            console.log("this user doesn't exist");
            res.send("this user doesn't exist").status(404);
            return;
          }
          res.send(results.rows[0]).status(200);
        } catch (err) {
          console.log(err.message);
          res.send(err.message).status(500);
        }
});
// create POST route for new users
app.post("/users", async (req, res) => {
  try {
    const { username, passwords } = req.body;
    const user = await client.query("SELECT $1 FROM users", [username]);
    console.log(user.rows);
    // if (user.rows.length === 0) {
    //     console.log("this user exists already");
    //     res.send("this user exists already");
    //     return;
    // }
    const results = await client.query(
      "INSERT INTO users(username, passwords)VALUES ($1, $2)",
      [username, passwords]
    );
    if (passwords.length < 5) {
      console.log("password must be atleast 5 characters");
      res.send("password must be atleast 5 characters");
    }
    res.send(`${username} created`).status(201);
  } catch (err) {
    console.log(err.message);
    res.send(err.message).status(500);
  }
});

//CHANGE USER INFO
app.put('/users/:user', async (req, res) => {
    try {
        const { user } = req.params;
        const { username, passwords} = req.body;
        const results = await client.query('UPDATE users SET passwords = $1 WHERE username = $2', [passwords, username]);
        if(!results.rows) {
            console.log('this user does not exist');
            res.send('this user does not exist').status(400);
            return;
        }
        res.send(results.rows[0]).status(200);
    } catch (err) {
        console.log(err.message);
        res.send(err.message).status(500);
    }

});
//DELETE ACCOUNT
app.delete("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const results = await client.query(
      "DELETE FROM users WHERE username = $1",
      [username]
    );
    if (!results.rows) {
      console.log("this user does not exist");
      res.send("this user does not exist").status(400);
    }
    res.status(200).send(results.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
});

//create listener
app.listen(PORT, () => {
  console.log("I hear you baby");
});
