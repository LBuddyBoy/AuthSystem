import db from "#db/client";
import { MAPPED_ACCOUNT_RETURNS } from "./accounts.js";

export async function getPostsByField(field, value) {
    const SQL = `
    SELECT posts.*, row_to_json(accounts) AS account,
    (SELECT COUNT(*) FROM replies WHERE post_id = posts.id) AS replies
    FROM posts
    JOIN (
      SELECT ${MAPPED_ACCOUNT_RETURNS("accounts")}, row_to_json(roles) AS role
      FROM accounts
      JOIN roles ON roles.id = accounts.role_id
    ) accounts ON posts.account_id = accounts.id
    WHERE posts.${field} = $1
    `;

    const { rows } = await db.query(SQL, [value]);

    return rows;
}

export async function updatePost(id, fields) {
  const updates = Object.entries(fields).filter(
    ([k, v]) => v !== undefined && v !== null
  );

  const sets = updates.map(([key], i) => `${key} = $${i + 2}`);
  const values = updates.map(([_, value]) => value);

  const SQL = `
    UPDATE posts
    SET ${sets.join(", ")}
    WHERE id = $1
    RETURNING *
    `;

  const {
    rows: [post],
  } = await db.query(SQL, [id, ...values]);

  return post || undefined;
}

export async function getPostById(id) {
    const SQL = `
    SELECT posts.*, row_to_json(accounts) AS account,
    (SELECT COUNT(*) FROM replies WHERE post_id = posts.id) AS replies
    FROM posts
    JOIN (
      SELECT ${MAPPED_ACCOUNT_RETURNS("accounts")}, row_to_json(roles) AS role
      FROM accounts
      JOIN roles ON accounts.role_id = roles.id
    ) accounts ON posts.account_id = accounts.id
    WHERE posts.id = $1
    `;

    const { rows: [post] } = await db.query(SQL, [id]);

    return post;
}