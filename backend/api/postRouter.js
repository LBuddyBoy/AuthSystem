import { getPostById, getPostsByField, updatePost } from "#db/query/posts";
import { createReply, getRepliesByPost } from "#db/query/replies";
import express from "express";
const router = express.Router();

export default router;

router.param("id", async (req, res, next, id) => {
  const post = await getPostById(req.params.id);

  if (!post) {
    return res.status(404).json("Couldn't find a post with that id.");
  }

  req.post = post;
  next();
});

router.get("/:id", async (req, res) => {
  res.status(200).json(req.post);
});

router.get("/:id/replies", async (req, res) => {
  res.status(200).json(await getRepliesByPost(req.post.id));
});

router.put("/:id/replies", async (req, res) => {
  const reply = await createReply(
    req.post.id,
    req.post.forum_id,
    req.account.id
  );

  if (!reply) return res.status(400).json("There was an error creating a reply.");
  
  res.status(201).json(reply);
});

router.put("/", async (req, res) => {
  if (!req.body) {
    return res.status(400).json("Invalid body provided.");
  }

  const { id, ...fields } = req.body;

  if (!id) {
    return res.status(400).json("Missing post id.");
  }

  if (Object.entries(fields).length === 0) {
    return res.status(400).json("No fields found to update.");
  }

  try {
    await updatePost(id, fields);
  } catch (error) {
    return res.status(400).json(error.detail);
  }

  const post = await getPostById(id);

  res.status(200).json(post);
});
