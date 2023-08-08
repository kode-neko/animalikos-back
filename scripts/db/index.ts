import { faker } from '@faker-js/faker';
import { MongoClient, Db, Collection, InsertManyResult } from "mongodb";
import { Animal, EnumSex } from "../../src/model";
import 'dotenv/config';

const {
  HOST_DB,
  DB_ADMIN,
  DB_ADMIN_PASS,
  DB_NAME,
  ANIMAL_MAX,
} = process.env;

const auth = {username: DB_ADMIN, password: DB_ADMIN_PASS};
const client = new MongoClient(HOST_DB as string, {auth});
let db: Db;

async function getDb() {
  if(!db) {
    await client.connect();
    db = client.db(DB_NAME);
  }
  return db;
}

async function createCollections(db: Db): Promise<(Collection<Animal>)> {
  return await db.collection('animal');
}

function createAnimals(): Animal[] {
  return Array(ANIMAL_MAX).fill(undefined).map(ele => ({
    name: faker.person.firstName(),
    sex: EnumSex[faker.person.sex()],
    breed: faker.lorem.words(),
    bday: faker.date.birthdate(),
    enter: faker.date.future(),
    desc: faker.lorem.paragraph(),
  }))
}

async function insertDataAnimals(animalCollection: Collection<Animal>, animalList: Animal[]): Promise<InsertManyResult<Animal>> {
  return animalCollection.insertMany(animalList);
}

async function initDB(): Promise<InsertManyResult<Animal>> {
  const db = await getDb();
  const animalCollection = await createCollections(db);
  const animalList = await createAnimals();
  return await insertDataAnimals(animalCollection, animalList);
}

function init() {
  try{
    initDB();
  } catch(err) {
    console.log(err);
  }
}

export default init;