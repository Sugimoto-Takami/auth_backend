// backend/db.ts
import { config } from 'dotenv';
config({ path: __dirname+'/.env' }); // 環境変数を読み込む

import { Pool } from 'pg';

console.log("100");
console.log(process.env.DB_USER);

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default pool;