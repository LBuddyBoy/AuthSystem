import express from "express";
import accountRouter from "#api/accountRouter";
import authRouter from "#api/authRouter";
import roleRouter from "#api/roleRouter";

const app = express();

app.use(express.json());

app.use("/account", accountRouter);
app.use("/auth", authRouter);
app.use("/roles", roleRouter);

app.use("/", (req, res) => {
    res.send("Account System Online ✅");
});

export default app;