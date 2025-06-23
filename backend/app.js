import express from "express";
import cors from "cors";
import accountRouter from "#api/accountRouter";
import authRouter from "#api/adminRouter";
import roleRouter from "#api/roleRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/account", accountRouter);
app.use("/admin", authRouter);
app.use("/roles", roleRouter);

app.use("/", (req, res) => {
    res.send("Account System Online ✅");
});

export default app;