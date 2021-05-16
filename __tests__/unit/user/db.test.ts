import { Pool } from "pg";
import PgMock2, { getPool } from "pgmock2";
import { CustomNodeJsGlobal } from "../../../src/types/global";
import { queryUsers } from "../../../src/user/db";

declare const global: CustomNodeJsGlobal;

describe("users", () => {
  let pool: Pool;

  beforeAll(async () => {
    const pg = new PgMock2();
    pg.add("SELECT * FROM users;", [], {
      rowCount: 1,
      rows: [{}],
    });
    pool = getPool(pg);
    global.pool = pool;
  });

  afterAll(async () => {
    pool.end();
  });

  it("should return users", async () => {
    const rows = await queryUsers();
    expect(rows.length).toBe(1);
  });
});
