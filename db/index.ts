import { SQL } from "bun";

// File-based database
const sql = new SQL({
    adapter: "sqlite",
    filename: "origami.db",
    create: true,
});

export default sql;
