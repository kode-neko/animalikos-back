import { Db, Collection } from "mongodb";

async function createCollection<T extends Document>(db: Db, nameColl: string): Promise<(Collection<T>)> {
  return await db.collection(nameColl);
}

export default createCollection;