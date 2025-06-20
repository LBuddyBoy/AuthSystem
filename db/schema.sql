DROP DATABASE IF EXISTS auth_system;
CREATE DATABASE auth_system;

\c auth_system;

CREATE EXTENSION pgcrypto;

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    username text not null,
    email text not null,
    password text not null,
    first_name text,
    last_name text,
    jwt_token text
);