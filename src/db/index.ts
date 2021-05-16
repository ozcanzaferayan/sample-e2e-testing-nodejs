import { Pool, QueryConfig, QueryResult, QueryResultRow } from "pg";
import { CustomPoolClient } from "../types/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = async (
  text: string | QueryConfig<any[]>,
  params?: any[]
): Promise<QueryResult<QueryResultRow>> => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query", { text, duration, rows: res.rowCount });
  return res;
};

export const getClient = async () => {
  const client = (await pool.connect()) as CustomPoolClient;
  const patchedQuery = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  // @ts-ignore
  client.query = (...args: any[]) => {
    client.lastQuery = args;
    // @ts-ignore
    return patchedQuery.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = patchedQuery;
    client.release = release;
    return release.apply(client);
  };
  return client;
};
