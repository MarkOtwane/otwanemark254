import pg from 'pg';
import { ENV } from './env.js';

const pool = new pg.Pool({
  connectionString: ENV.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

export default pool;
