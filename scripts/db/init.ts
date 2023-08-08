import { faker } from '@faker-js/faker';
import { MongoClient, Db, Collection, InsertManyResult } from "mongodb";
import { Animal, EnumSex, EnumSpecies } from "../../src/model";
import dotenv from 'dotenv';
import { getClient, getDb } from './connection';

dotenv.config({path: './config/env/.env'});

const {
  ANIMAL_MAX,
} = process.env;

async function createCollections(db: Db): Promise<(Collection<Animal>)> {
  return await db.collection('animal');
}

function createAnimals(): Animal[] {
  return Array(parseInt(ANIMAL_MAX as string)).fill({}).map(ele => ({
    name: faker.person.firstName(),
    species: ['cat', 'dog'][Math.floor(Math.random() * 2)] as EnumSpecies,
    sex: faker.person.sex() as EnumSex,
    breed: faker.lorem.words(),
    bday: faker.date.birthdate(),
    enter: faker.date.future(),
    desc: faker.lorem.paragraph(),
  }))
}

async function insertDataAnimals(animalCollection: Collection<Animal>, animalList: Animal[]): Promise<InsertManyResult<Animal>> {
  return animalCollection.insertMany(animalList);
}

async function initDB(db: Db): Promise<InsertManyResult<Animal>> {
  const animalCollection = await createCollections(db);
  const animalList = await createAnimals();
  return await insertDataAnimals(animalCollection, animalList);
}

function init() {
  const client: MongoClient= getClient();
  getDb(client)
    .then(db => initDB(db))
    .then(() => console.log('ok'))
    .catch(err => console.log(err))
    .finally(() => client.close());
}

init();