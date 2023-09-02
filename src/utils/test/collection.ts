import { Collection, Db, Document, MongoClient, OptionalUnlessRequiredId } from "mongodb";

function getCollection<T extends Document>(db: Db, nameCollection: string): Collection<T> {
  return db.collection(nameCollection);
}

async function insertDataCollection<T extends Document>(coll: Collection<T>, list: T[]): Promise<void> {
  await coll.insertMany(list as OptionalUnlessRequiredId<T>[]);
}

async function deleteDataCollection<T extends Document>(coll: Collection<T>) {
  await coll.deleteMany({});
}

async function dropCollection(db: Db, client: MongoClient) {
  await db.dropCollection('animal');
  await client.close();
}

export {
  getCollection,
  insertDataCollection,
  deleteDataCollection,
  dropCollection
};