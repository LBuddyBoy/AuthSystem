import { createForum, getForumById, getForums } from "#db/query/forums";
import { getPostsByField } from "#db/query/posts";
import requireBody from "#middleware/requireBody";
import express from "express";
const router = express.Router();

export default router;

router.get("/", async (req, res) => {
  res.status(200).json(await getForums());
});

router.get("/:id", async (req, res) => {
  res.status(200).json(await getForumById(req.params.id));
});

router.get("/:forumId/posts", async (req, res) => {
  const { forumId } = req.params;

  res.status(200).json(await getPostsByField("forum_id", forumId));
});

router.post(
  "/",
  requireBody(["name", "description", "allows_replies", "required_permission"]),
  async (req, res) => {
    const forum = await createForum(req.body);

    if (!forum) {
      return;
    }

    res.status(201).json(forum);
  }
);
