// UNSUPPORTED - https://github.com/vercel/next.js/issues/75220

// import { SQL } from "bun";

// const sql = new SQL({
//     adapter: "sqlite",
//     filename: "origami.db",
//     create: true,
// });

// export default sql;

import { drizzle } from 'drizzle-orm/libsql/node';

// Use environment variable with fallback to local path for builds
const dbPath = process.env.DATABASE_PATH || "file:./origami.db";

const db = drizzle({ connection: {
  url: dbPath, 
}});

export default db;
