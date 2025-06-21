DROP DATABASE IF EXISTS auth_system;
CREATE DATABASE auth_system;

\c auth_system;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

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
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    username TEXT not null UNIQUE,
    email TEXT not null UNIQUE,
    avatarURL TEXT not null DEFAULT 'https://www.gravatar.com/avatar/?d=mp&s=32',
    password TEXT not null,
    first_name TEXT,
    last_name TEXT,
    jwt TEXT
);

CREATE UNIQUE INDEX only_one_default_role ON roles (is_default) WHERE is_default IS TRUE;
