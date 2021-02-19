import { Router } from "express";
import userRouter from "./user/User.router";

const router = Router();

router.use("/user", userRouter);

router.get("/", (_, res) => {
  res.send("Welcome to Seven Network ✨");
});

export default router;
