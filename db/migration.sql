DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS business_cards;

CREATE TABLE users (
username VARCHAR PRIMARY KEY,
passwords VARCHAR
);

CREATE TABLE business_cards (
    card_id SERIAL ,
    name VARCHAR,
    phone_number VARCHAR,
    email TEXT,
    occupation TEXT,
    image TEXT,
    username VARCHAR,
    FOREIGN KEY (username) REFERENCES users(username)
);