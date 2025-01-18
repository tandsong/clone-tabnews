import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();
  const result = await client.query(queryObject);
  client.end();
  return result;
}

export default {
  query: query,
};
