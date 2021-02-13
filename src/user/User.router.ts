import { createUser, getUsers } from "./User.service";

import { Router } from "express";

const userRouter = Router();

userRouter.get("/", async (_, res) => {
  const users = await getUsers();
  res.json(users);
});

userRouter.post("/create", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await createUser(username, password);
    res.status(201);
    res.json({
      success: true,
      username: user.username,
    });
  } catch (error) {
    res.status(error.httpCode || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

export default userRouter;
