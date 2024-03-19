import { sql } from "./lib/postgres";

async function setup() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS shortlinks (
      id SERIAL PRIMARY KEY,
      code TEXT UNIQUE,
      ORIGINAL_URL TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql.end();

  console.log("Tables created");
}

setup();
