const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");

db.serialize(() => {
  db.run(
    `create table users (
        id integer primary key autoincrement,
        first_name text not null,
        last_name text not null
        )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("table created successfully");
      }
    },
  );
});

db.close();
