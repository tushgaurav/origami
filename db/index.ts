// UNSUPPORTED - https://github.com/vercel/next.js/issues/75220

// import { SQL } from "bun";

// const sql = new SQL({
//     adapter: "sqlite",
//     filename: "origami.db",
//     create: true,
// });

// export default sql;

import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({ connection: {
  url: "file:./origami.db", 
}});

export default db;
