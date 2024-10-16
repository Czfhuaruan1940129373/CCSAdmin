import { Pool } from 'pg'

// PostgreSQL 连接配置
export const pool = new Pool({
  user: import.meta.env.DB_CON_USER,
  host: import.meta.env.DB_CON_SERVER,
  database: import.meta.env.DB_CON_DATABASE,
  password: import.meta.env.DB_CON_PASS,
  port: import.meta.env.DB_CON_PROT
})
