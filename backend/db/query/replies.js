import db from "#db/client";
import { MAPPED_ACCOUNT_RETURNS } from "./accounts.js";

export async function createReply(post_id, forum_id, account_id, message) {
    const sql = `
    INSERT INTO replies(post_id, forum_id, account_id, message)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `;

    const {rows: [reply]} = await db.query(sql, [post_id, forum_id, account_id, message]);

    return reply;
}

export async function getRepliesByPost(post_id) {
    const SQL = `
    SELECT replies.*, posts.id, row_to_json(accounts) AS account
    FROM replies
    JOIN posts ON replies.post_id = posts.id
    JOIN (
        SELECT ${MAPPED_ACCOUNT_RETURNS("accounts")}, row_to_json(roles) AS role
        FROM accounts
        JOIN roles ON accounts.role_id = roles.id
    ) accounts ON posts.account_id = accounts.id
    WHERE posts.id = $1
    `;

    const { rows } = await db.query(SQL, [post_id]);

    return rows;
}