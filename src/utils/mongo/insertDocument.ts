import { Collection, InsertManyResult, OptionalUnlessRequiredId } from "mongodb";

async function insertDocument<T extends Document>(coll: Collection<T>, list: OptionalUnlessRequiredId<T>[]): Promise<InsertManyResult<T>> {
  return coll.insertMany(list);
}

export default insertDocument;