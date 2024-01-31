import { Router } from 'express';
import { Pool, PoolClient } from 'pg';
import { postToCamelCase } from './projects';

const router = Router();
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://postgres:password@localhost:5444/challenge',
});

router.get('/:postId', async (req, res) => {
  let client: PoolClient;
  try {
    client = await pool.connect();

    const postId = req.params.postId;

    const projectQuery = await client.query(
      'SELECT * FROM post WHERE id = $1',
      [postId],
    );
    if (projectQuery.rows.length === 1) {
      res.json({ project: postToCamelCase(projectQuery.rows[0]) });
    } else {
      res.send(404);
    }
  } catch (e) {
    res.status(500).send(e);
  } finally {
    if (client) client.release();
  }
});

export default router;
