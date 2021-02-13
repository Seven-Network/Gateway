import { createConnection } from "typeorm";

export const connectDB = async () => {
  console.log("Connecting to database");
  await createConnection({
    type: "mongodb",
    url: process.env.DB_URL as string,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: ["**/*.entity.ts"]
  });
  console.log("Connected to database");
};
