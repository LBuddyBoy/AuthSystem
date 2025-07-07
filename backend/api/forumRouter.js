import { getForumById, getForums } from "#db/query/forums";
import { getPostsByField } from "#db/query/posts";
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