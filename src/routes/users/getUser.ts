// routes/user/getUsers.ts
import express, { Request, Response } from 'express';
import pool from '../../db'; // poolのインポート方法が変更されるかもしれません。

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query('SELECT * FROM useruser');
    console.log(rows); // コンソールにユーザー一覧を出力
    res.json(rows); // 必要に応じてフロントエンドにデータを返す
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;