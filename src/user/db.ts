import { User } from "./model";
import { getClient } from "../db";

export const queryUsers = async (): Promise<User[]> => {
  const client = await getClient();
  const rows = (await client.query("SELECT * FROM users;", [])).rows;
  client.release();
  return rows.map((v) => ({
    id: v.id,
    name: v.name,
    createdDate: v.createdDate,
  }));
};
