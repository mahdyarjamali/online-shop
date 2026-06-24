const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("shop.db");
db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run(
    `create table if not exists users (
    id integer primary key autoincrement,
    name text not null,
    email text not null unique,
    password text not null,
    phone text unique,
    role text not null default 'customer' check(role in ('customer' , 'admin')),
    address text,
    created_at datetime default current_timestamp
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Users table created successfully");
      }
    },
  );
  db.run(
    `create table if not exists products (
    id integer  primary key autoincrement,
    name text not null,
    description text  not null,
    price real not null check(price >= 0),
    category text not null,
    stock integer not null default 0 check(stock >= 0),
    image text,
    created_at datetime default current_timestamp
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Products table created successfully");
      }
    },
  );
  db.run(
    `create table if not exists orders (
    id integer primary key autoincrement,
    user_id integer not null,
    total_price real not null check(total_price >= 0),
    status text not null default 'pending' check(status in ('pending' , 'paid' , 'processing' , 'shipped' , 'delivered' , 'cancelled')),
    address text not null,
    created_at datetime default current_timestamp,

    foreign key (user_id) references users(id)
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Orders table created successfully");
      }
    },
  );

  db.run(
    `create table if not exists order_items (
    id integer primary key autoincrement,
    order_id integer not null,
    product_id integer not null,
    quantity integer not null check(quantity > 0),
    price real not null check(price >= 0),

    foreign key (order_id) references orders(id),
    foreign key (product_id) references products(id)
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Order_items table created successfully");
      }
    },
  );
  db.run(
    `create table if not exists carts (
    id integer primary key autoincrement,
    user_id integer not null unique,
    
    foreign key (user_id) references users(id)
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Carts table created successfully");
      }
    },
  );

  db.run(
    `create table if not exists cart_items (
    id integer primary key autoincrement,
    cart_id integer not null,
    product_id integer not null,
    quantity integer not null check(quantity > 0),

    foreign key (cart_id) references carts(id),
    foreign key (product_id) references products(id)
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Cart_items table created successfully");
      }
    },
  );

  db.run(
    `create table if not exists discounts (
    id integer primary key autoincrement,
    code text not null unique,
    percentage integer not null check(percentage > 0 and percentage <= 100),
    expires_at datetime not null
    )`,
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Discounts table created successfully");
      }
    },
  );
});

module.exports = db