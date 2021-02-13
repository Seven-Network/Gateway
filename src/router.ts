import { Router } from "express";
import userRouter from "./user/User.router";

const router = Router();

router.use("/user", userRouter);

export default router;
