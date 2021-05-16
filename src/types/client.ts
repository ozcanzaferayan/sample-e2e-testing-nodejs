import { PoolClient } from "pg";

export interface CustomPoolClient extends PoolClient {
  lastQuery: any[];
}
