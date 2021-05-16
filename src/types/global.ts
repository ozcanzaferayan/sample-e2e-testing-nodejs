import { Pool } from "pg";

export interface CustomNodeJsGlobal extends NodeJS.Global {
  pool: Pool;
}
