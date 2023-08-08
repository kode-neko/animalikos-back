import { MongoClient } from "mongodb";
import { getClient, getDb } from './connection';

function drop() {
  const client: MongoClient = getClient();
  getDb(client)
    .then(db => db.dropDatabase)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => client.close());
}

drop();