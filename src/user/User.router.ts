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
    const suffix = user.is_developer ? ' [Dev]' : "";
    res.json({
      success: true,
      username: `${user?.username}${suffix}`,
      verified: user?.verified,
      is_creator: user?.is_creator,
      is_developer: user?.is_developer,
      new_followers: false,
      emoji: 'https://i.pinimg.com/originals/47/f6/66/47f666d4b08af062945eba37987ebd81.jpg',
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
