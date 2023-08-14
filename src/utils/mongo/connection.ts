import { MongoClient, Db, Auth } from "mongodb";
import dotenv from 'dotenv';

dotenv.config({path: './config/env/.env'});

const {
  HOST_DB,
  DB_ADMIN,
  DB_ADMIN_PASS,
  DB_NAME,
} = process.env;

let client: MongoClient;
let db: Db;

function getClient(): MongoClient {
  if(!client) {
    const auth: Auth = {username: DB_ADMIN, password: DB_ADMIN_PASS};
    client = new MongoClient(HOST_DB as string, {auth});
  }
  return client;
}

async function getDb(client: MongoClient): Promise<Db> {
  if(!db) {
    const auth: Auth = {username: DB_ADMIN, password: DB_ADMIN_PASS};
    client = new MongoClient(HOST_DB as string, {auth});
    await client.connect();
    db = client.db(DB_NAME);
  }
  return db;
}

export {
  getClient,
  getDb
};