import "dotenv/config";

import * as cors from "cors";
import * as express from "express";

import { connectDB } from "./database";
import requestRouter from "./middleware/request-router.middleware";
import router from "./router";
import { urlencoded } from "body-parser";

async function bootstrapServer() {
  console.log("Bootstrapping server");

  const app = express();

  app.use(cors());
  app.use(urlencoded({ extended: true }));

  await connectDB();

  app.use("/", requestRouter);

  app.use("/", router);

  const port: Number = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

bootstrapServer();
