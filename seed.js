import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_CONNECTION });

db.query(`CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    post_date BIGINT,
    img_url VARCHAR(255)
  );
  
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    post_id INT references posts(id),
    content TEXT NOT NULL,
    comment_date BIGINT,
    img_url VARCHAR(255)
  );
  
  INSERT INTO posts (username, content, post_date)
  VALUES ('AllLarryNoLurr', 'larry lurr', 143432000);
  
  INSERT INTO comments (username, post_id, content, comment_date)
  VALUES ('Larry Lurr', 1, 'true', 123243421001);`);
