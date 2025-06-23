import express from "express";
import { useAuth } from "./utils.js";
import { getAccountById, getAccounts, updateAccount } from "#db/query/accounts";
import db from "#db/client";

const authRouter = express.Router();
const router = authRouter;

router.use(async (req, res, next) => {
  try {
    if (!await useAuth(req, res)) return;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  res.status(200).json("Access Granted");
});

router.get("/stats", async (req, res) => {
  const SQL = `
  SELECT
  (SELECT COUNT(*) FROM accounts) AS accounts,
  (SELECT COUNT(*) FROM roles) AS roles;
  `;
  
  const { rows } = await db.query(SQL);

  res.status(200).json(rows[0]);
});

router.get("/accounts/:limit/:cursor", async (req, res) => {
  const limit = Number(req.params.limit);
  const cursor = req.params.cursor ? Number(req.params.cursor) : null;

  if (!limit || limit < 1) {
    return res.status(400).json("Limit must be a positive number.");
  }

  try {
    res.status(200).json(await getAccounts(limit, cursor));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.put("/account", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { id, ...fields } = req.body;

  if (!id) {
    return res.status(400).json("Missing account id.");
  }

  if (Object.entries(fields).length === 0) {
    return res.status(400).json("No fields found to update.");
  }

  if (!await updateAccount(id, fields)) {
    return res.status(400).json("There was an issue updating that account.");
  }

  const account = await getAccountById(id);

  res.status(200).json(account);
});

export default authRouter;