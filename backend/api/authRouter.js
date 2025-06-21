import express from "express";
import { useAuth } from "./utils.js";

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

  const account = await updateAccount(id, fields);

  if (!account) {
    return res.status(400).json("There was an issue updating that account.");
  }

  res.status(200).json(account);
});

export default authRouter;