import { getRoleById, getRoles, updateRole } from "#db/query/roles";
import { isValidId, useAuth } from "./utils.js";
import express from "express";

const roleRouter = express.Router();
const router = roleRouter;

router.use(async (req, res, next) => {
  try {
    if (!(await useAuth(req, res))) return;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  res.status(200).json(await getRoles());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json("The id must be a positive integer.");
  }

  const role = await getRoleById(id);

  if (!role) {
    return res.status(400).json("Couldn't find a role with that id.");
  }

  res.status(200).json(role);
});

router.put("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  try {
    const { id, ...fields } = req.body;
    const role = await updateRole(id, fields);

    res.status(200).json(role);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default roleRouter;
