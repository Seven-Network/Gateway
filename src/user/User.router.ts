import {
  createHash,
  getUserByHash,
  loginUser,
  updateUser,
} from "./User.service";

import { Router } from "express";

const userRouter = Router();

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
  res.json({
    success: false,
    message:
      "Account creation is disabled for Seven Network during closed beta period.",
  });
});

userRouter.post("/update-stats/:serverLinkPass", async (req, res) => {
  try {
    if (req.params.serverLinkPass != process.env.SERVER_LINK_PASS) {
      res.json({
        success: false,
        message: "Invalid server link password",
      });
      return;
    }

    const user = await getUserByHash(req.body.hash as string);

    var kills = parseInt(user.kills);
    kills += req.body.obtainedKills;
    user.kills = kills.toString();

    var deaths = parseInt(user.deaths);
    deaths += req.body.obtainedDeaths;
    user.deaths = deaths.toString();

    var headshots = parseInt(user.headshots);
    headshots += req.body.obtainedHeadshots;
    user.headshots = headshots.toString();

    var exp = parseInt(user.experience);
    exp += req.body.obtainedExp;
    user.experience = exp.toString();

    const kd = (parseInt(user.kills) / parseInt(user.deaths)).toFixed(2);
    user.kdr = kd;

    updateUser(user);

    res.send({
      success: true,
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
