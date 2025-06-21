import express from "express";
import {
  createAccount,
  generateJWT,
  getAccountById,
  validateAccount,
  validateJWT,
} from "#db/query/accounts";

const accountRouter = express.Router();
const router = accountRouter;

router.post("/signup", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { username, email, password } = req.body;

  try {
    const account = await createAccount({ username, email, password });

    res.status(201).json(account);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { email, password } = req.body;
  const account = await validateAccount({ email, password });

  if (!account) {
    return res.status(400).json("Incorrect password or email provided.");
  }

  const { token } = await generateJWT(account.id);

  res.status(200).json({
    token,
    account,
  });
});

router.post("/verify", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { jwt } = req.body;
  const id = await validateJWT(jwt);

  if (!id) {
    return res.status(400).json("Invalid token provided.");
  }

  const account = await getAccountById(id);

  res.status(200).json(account);
});

export default accountRouter;
