import cors from "cors";
import express, { json } from "express";
import { Pool, PoolClient } from "pg";
import { CustomNodeJsGlobal } from "./types/global";
import { getUsers } from "./user/handler";

declare const global: CustomNodeJsGlobal;

const app = express();
app.use(json());
app.use(cors());

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// global.pool = pool;

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running.");
});

app.get("/", getUsers);
//app.get("/", () => console.log("asdasd"));
