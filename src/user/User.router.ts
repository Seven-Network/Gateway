import {
  createHash,
  createUser,
  getUserByHash,
  loginUser,
} from "./User.service";

import { Router } from "express";

const userRouter = Router();

// userRouter.get("/", async (_, res) => {
//   const users = await getUsers();
//   res.json(users);
// });

userRouter.post("/details", async (req, res) => {
  try {
    const user = await getUserByHash(req.query.hash as string);
    const hash = await createHash(user.id.toString(), user.username);
    const suffix = user.is_developer ? '\\[[rainbow]Dev[/rainbow]]' : "";
    res.json({
      success: true,
      username: `${user?.username}${suffix}`,
      verified: user?.verified,
      is_creator: user?.is_creator,
      is_developer: user?.is_developer,
      new_followers: false,
      emoji: 'data:image/jpeg;base64,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',
      hash: hash
    });
  } catch (error) {
    res.status(error.httpCode || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await loginUser(username, password);
    const hash = await createHash(user.id.toString(), user.username);
    res.status(201);
    res.json({
      success: true,
      username: user.username,
      hash: hash,
    });
  } catch (error) {
    res.status(error.httpCode || 500);
    res.json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

userRouter.post("/logout", (_, res) => {
  res.status(201);
  res.json({
    success: true,
  });
});

userRouter.post("/create", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await createUser(username, password);
    const hash = await createHash(user.id.toString(), user.username);
    res.status(201);
    res.json({
      success: true,
      username: user.username,
      hash: hash,
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
