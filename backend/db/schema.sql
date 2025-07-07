DROP DATABASE IF EXISTS auth_system;
CREATE DATABASE auth_system;

\c auth_system;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS roles;

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    name TEXT not null UNIQUE,
    weight INTEGER not null UNIQUE,
    icon TEXT not null,
    is_default  BOOLEAN not null,
    is_staff BOOLEAN not null,
    permissions TEXT ARRAY not null DEFAULT ARRAY[]::text[],
    inheritance INTEGER ARRAY not null DEFAULT ARRAY[]::integer[]
);

CREATE TABLE accounts(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    username TEXT not null UNIQUE,
    email TEXT not null UNIQUE,
    avatar_url TEXT not null DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32',
    password TEXT not null,
    first_name TEXT,
    last_name TEXT,
    jwt TEXT
);

CREATE TABLE forums(
    id SERIAL PRIMARY KEY,
    name text not null,
    description text not null
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    forum_id INTEGER REFERENCES forums(id) ON DELETE CASCADE,
    account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
    title TEXT not null,
    body TEXT not null,
    last_edited TIMESTAMP
);

CREATE TABLE replies(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    forum_id INTEGER REFERENCES forums(id) ON DELETE CASCADE,
    account_id INTEGER REFERENCES accounts(id) ON DELETE CASCADE,
    message text
);

CREATE UNIQUE INDEX only_one_default_role ON roles (is_default) WHERE is_default IS TRUE;
