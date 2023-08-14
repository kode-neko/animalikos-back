import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

function createObjectId() {
  return new ObjectId(faker.lorem.word()).toString();
}

export default createObjectId;