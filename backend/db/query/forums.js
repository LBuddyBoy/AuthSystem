import db from "#db/client";

export async function getForums() {
  const SQL = `
    SELECT 
      f.*,
      (SELECT COUNT(*) FROM posts WHERE forum_id = f.id) AS posts,
      (SELECT COUNT(*) FROM replies WHERE forum_id = f.id) AS replies
    FROM forums f
    `;

  const { rows } = await db.query(SQL);

  return rows;
}

export async function getForumById(id) {
  const SQL = `
    SELECT 
      f.*,
      (SELECT COUNT(*) FROM posts WHERE forum_id = f.id) AS posts,
      (SELECT COUNT(*) FROM replies WHERE forum_id = f.id) AS replies
    FROM forums f
    WHERE f.id = $1
  `;

  const { rows: [forum] } = await db.query(SQL, [id]);
  return forum;
}
