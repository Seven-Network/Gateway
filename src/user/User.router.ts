import {
  createHash,
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

    // Modify object before sending it over the internet
    const suffix = user.is_developer ? " [rainbow]DEV[/rainbow]" : "";
    user.username = user.username += suffix;
    delete user.passwordHash;
    user.hash = hash;

    res.json(user);
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

userRouter.post("/create", async (_, res) => {
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
  res.json({
    success: false,
    message: "Account creation is disabled for Seven Network during closed beta period.",
  });
});

export default userRouter;
