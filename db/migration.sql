DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS business_cards;

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR
);

CREATE TABLE business_cards (
    card_id SERIAL PRIMARY KEY,
    name VARCHAR,
    phone_number INTEGER,
    email TEXT,
    occupation TEXT,
    image TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);