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
app.use(express.json());
app.use(express.static("public"));


//ALL GENERIC REST ROUTES

//create GET ALL route (shows all users cards)
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
app.get("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await client.query(
      "SELECT * FROM business_cards WHERE user_id = $1",
      [id]
    );
    if (!results.rows) {
      console.log("this card doesn't exist");
      res.send("this card doesn't exist").status(404);
      return;
    }
    console.log(results.rows);
    res.send(results.rows[0]).status(200);
  } catch (err) {
    console.log(err.message);
    res.send(err.message).status(500);
  }
});

//create POST route
//create UPDATE route
//create DELETE route

//create listener
app.listen(PORT, () => {
  console.log("I hear you baby");
});
