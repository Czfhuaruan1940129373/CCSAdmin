import { Pool } from 'pg'
import { QueryResult } from './types'

// 定义一个变量来保存连接池(在整个程序中只允许创建一个连接池实例)
let pool: Pool | null = new Pool({
  user: 'dbuser',
  host: '192.168.0.2',
  database: 'ccsdb_dev',
  password: 'yajiangdb2024!',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 0
})

// 定义一个函数来创建连接池
function createPostgresPool(config: {
  user: string
  host: string
  database: string
  password: string
  port: number
  max: number
  idleTimeoutMillis: number
  connectionTimeoutMillis: number
}): Pool {
  return new Pool({
    ...config
  })
}

/**
 * 初始化数据库连接
 *
 * @param dbConfig 数据库配置信息
 * @param dbConfig.user 数据库用户名
 * @param dbConfig.host 数据库主机地址
 * @param dbConfig.database 数据库名称
 * @param dbConfig.password 数据库密码
 * @param dbConfig.port 数据库端口
 * @param dbConfig.max 连接池最大连接数
 * @param dbConfig.idleTimeoutMillis 连接空闲超时时间（毫秒）
 * @param dbConfig.connectionTimeoutMillis 连接超时时间（毫秒）
 * @returns 无返回值
 */
export async function initializeDatabaseConnection(dbConfig: {
  user: string
  host: string
  database: string
  password: string
  port: number
  max: number
  idleTimeoutMillis: number
  connectionTimeoutMillis: number
}) {
  pool = createPostgresPool(dbConfig)
}

/**
 * 检查数据库连接池是否已初始化，若未初始化则进行初始化(注意执行sql语句时需要先调用该函数)
 *
 * @returns 无返回值
 */
async function checkedPool() {
  if (!pool)
    await initializeDatabaseConnection({
      user: 'dbuser',
      host: '192.168.0.2',
      database: 'ccsdb_dev',
      password: 'yajiangdb2024!',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 1000
    })
}

/**
 * 执行PostgreSQL查询操作
 *
 * @param text SQL查询语句
 * @param params SQL查询参数，以对象形式传递
 * @returns 查询结果
 */
export const pgQuery = async (text, params) => {
  if (!pool)
    await initializeDatabaseConnection({
      user: 'dbuser',
      host: '192.168.0.2',
      database: 'ccsdb_dev',
      password: 'yajiangdb2024!',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 1000
    })
  const res = await pool.query(text, params)
  return {
    rows: res.rows,
    rowsCount: res.rowsCount
  } as QueryResult
}

/**
 * 从连接池中异步获取一个数据库客户端
 *
 * @returns 返回一个数据库客户端实例，该实例已被修改了 query 和 release 方法以追踪最后执行的查询和自动清除超时
 */
export const getClient = async () => {
  await checkedPool()
  const client = await pool.connect()
  const query = client.query
  const release = client.release
  // set a timeout of 1 minute, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 1 minute!')
    console.error(`The last executed query on this client was: ${client.lastQuery}`)
  }, 60000)
  client.query = (...args) => {
    client.lastQuery = args
    console.log(`Running query: ${args}`)
    return query.apply(client, args)
  }
  client.release = () => {
    clearTimeout(timeout)
    client.query = query
    client.release = release
    return release.apply(client)
  }
  return client
}

/**
 * 在事务中执行 SQL 语句(示例)
 *
 * @returns 无返回值
 */
export const executedSQLInTran = async () => {
  const client = getClient() as any

  try {
    await client.query('BEGIN')
    const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
    const res = await client.query(queryText, ['brianc'])

    const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
    const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
    await client.query(insertPhotoText, insertPhotoValues)
    await client.query('COMMIT')
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }
}
