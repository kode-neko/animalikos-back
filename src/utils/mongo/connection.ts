import { MongoClient, Db, Auth } from "mongodb";

let client: MongoClient;
let db: Db;

async function getClient(hostDb: string, dbAdmin: string, dbAdminPass: string): Promise<MongoClient> {
  if(!client) {
    const auth: Auth = {username: dbAdmin, password: dbAdminPass};
    client = new MongoClient(hostDb, {auth});
    await client.connect();
  }
  return client;
}

async function getDb(client: MongoClient, dbName: string): Promise<Db> {
  if(!db) {
    db = client.db(dbName);
  }
  return db;
}

export {
  getClient,
  getDb
};