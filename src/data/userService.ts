// backend/ src/data/userService.ts
import pool from '../db';

// nullの場合の対応？
async function getUserByField(fieldName: string, value: string) {
    try {
        const query = `SELECT id, name, email, password FROM useruser WHERE ${fieldName} = $1`;
        const result = await pool.query(query, [value]);
        return result.rows[0];
    } catch (e) {
        console.error('Error occurred:', e);
        return null;
    }
}

export default getUserByField;