import jwt from "jsonwebtoken";
import db from "#db/client";
import { getDefaultRole } from "./roles.js";

const RETURNS = `id, username, email, role_id, first_name, last_name`;

/**
 * 
 * @param username the username of the new account
 * @param email the email of the new account
 * @param password the unhashed password of the new account
 * 
 * @returns the account created
 * @returns undefined if it can't be created
 * 
 */
export async function createAccount({ username, email, password }) {
  const SQL = `
    INSERT INTO accounts(username, email, password, role_id)
    VALUES($1, $2, crypt($3, gen_salt('bf')), $4)
    RETURNING ${RETURNS};
    `;

  try {
    const defaultRole = await getDefaultRole();

    if (!defaultRole) {
      throw new Error("Couldn't find a default role.");
    }

    const {
      rows: [account],
    } = await db.query(SQL, [username, email, password, defaultRole.id]);

    return account;
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Username or email already exists.");
    }

    throw error;
  }
}

/**
 * 
 * @param id the id of the account
 * @param fields the update parameters
 * 
 * @returns the updated account
 * @returns undefined if it can't be updated/found
 * 
 */
export async function updateAccount(id, fields) {
  const updates = Object.entries(fields).filter(
    ([k, v]) => v !== undefined && v !== null
  );

  const sets = updates.map(([key], i) =>
    key === "password"
      ? `password = crypt($${i + 2}, gen_salt('bf'))`
      : `${key} = $${i + 2}`
  );
  const values = updates.map(([_, value]) => value);

  const SQL = `
    UPDATE accounts
    SET ${sets.join(", ")}
    WHERE id = $1
    RETURNING ${RETURNS}
    `;

  const {
    rows: [account],
  } = await db.query(SQL, [id, ...values]);

  return account || undefined;
}

/**
 * 
 * @param email the email of the account
 * 
 * @returns the account found
 * @returns undefined if it can't be found
 * 
 */
export async function getAccountByEmail(email) {
  const SQL = `
    SELECT ${RETURNS}
    FROM accounts
    WHERE email = $1;
    `;

  const {
    rows: [account],
  } = await db.query(SQL, [email]);

  return account || undefined;
}

/**
 * 
 * @param id the id of the account
 * 
 * @returns the account found
 * @returns undefined if it can't be found
 * 
 */
export async function getAccountById(id) {
  const SQL = `
    SELECT ${RETURNS}
    FROM accounts
    WHERE id = $1;
    `;

  const {
    rows: [account],
  } = await db.query(SQL, [id]);

  return account || undefined;
}

/**
 * 
 * @param email the email to query
 * @param password the password to query
 * 
 * @returns the account found
 * @returns undefined if it can't be found or incorrect creditentials
 * 
 */
export async function validateAccount({ email, password }) {
  const SQL = `
    SELECT ${RETURNS}
    FROM accounts
    WHERE email = $1 AND password = crypt($2, password)
    `;

  const {
    rows: [account],
  } = await db.query(SQL, [email, password]);

  return account || undefined;
}

/**
 * @returns the jwt and account details
 */
export async function generateJWT(id) {
  const SQL = `
    UPDATE accounts
    SET jwt = $1
    WHERE id = $2
    RETURNING ${RETURNS}
    `;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  const {
    rows: [account],
  } = await db.query(SQL, [token, id]);

  return { token, account };
}

/**
 * @returns the id of the account
 * @returns null if it's expired
 */
export async function validateJWT(token) {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    return verify.id;
  } catch (error) {
    return null;
  }
}
