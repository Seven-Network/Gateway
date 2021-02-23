import "dotenv/config";

import * as cors from "cors";
import * as express from "express";

import { json, urlencoded } from "body-parser";

import { connectDB } from "./database";
import requestRouter from "./middleware/request-router.middleware";
import router from "./router";

async function bootstrapServer() {
  console.log("Bootstrapping server");

  const port: Number = Number(process.env.PORT) || 3000;

  const app = express();

  app.use(
    cors({
      origin: [`http://localhost:${port}`, "https://venge.io"],
      credentials: true,
    })
  );
  app.use(urlencoded({ extended: true }));
  app.use(json());

  await connectDB();

  app.use("/", requestRouter);

  app.use("/", router);

  app.use("/", express.static("src/public"));

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrapServer();
