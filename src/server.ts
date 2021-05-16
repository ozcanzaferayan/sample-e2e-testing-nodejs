import cors from "cors";
import express, { json } from "express";
import { Pool } from "pg";
import { mw } from "request-ip";

const app = express();
app.use(json());
app.use(mw());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.connect();

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running.");
});

app.get("/", async (res: express.Response) => {
  const results = (await pool.query('SELECT * FROM users;', [])).rows;
  res.status(200).json(results);
});
