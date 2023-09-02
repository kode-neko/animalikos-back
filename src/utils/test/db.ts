import path from 'path';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { getClient, getDb } from "../mongo";
import { Db, MongoClient } from "mongodb";

let 
  HOST_DB: string,
  DB_ADMIN: string,
  DB_ADMIN_PASS: string,
  DB_NAME: string;

function loadConstants():void {
  dotenv.config({path: path.resolve(__dirname, '../../../config/env/.env.test')});
  HOST_DB = process.env.HOST_DB as string;
  DB_ADMIN = process.env.DB_ADMIN as string;
  DB_ADMIN_PASS = process.env.DB_ADMIN_PASS as string;
  DB_NAME = process.env.DB_NAME as string;
}

async function initMongoDb(): Promise<[MongoClient, Db]> {
  const client: MongoClient = await getClient(HOST_DB as string, DB_ADMIN as string, DB_ADMIN_PASS as string);
  const db: Db = await getDb(client, DB_NAME as string);
  return [client, db];
}

async function initMongoose(): Promise<void> {
  await mongoose.connect(HOST_DB as string, {user: DB_ADMIN, pass: DB_ADMIN_PASS, dbName: DB_NAME});
}

async function closeConnections(client: MongoClient) {
  mongoose.disconnect();
  await client.close();
}

export {
  loadConstants,
  initMongoDb,
  initMongoose,
  closeConnections
};