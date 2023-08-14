import dotenv from 'dotenv';
import { MongoClient, Db, Collection, OptionalUnlessRequiredId, ObjectId, WithId } from "mongodb";
import { createAnimal, getClient, getDb } from '../../utils/mongo';
import AnimalODM from './AnimalODM';
import animalFixtures from '../../../fixtures/animal.json';
import { Animal, EnumSex, EnumSpecies } from '../../model';
import { faker } from '@faker-js/faker';

dotenv.config({path: '../../../config/env/.env.test'});

describe('AnimalODM', () => {

  let client: MongoClient;
  let db: Db;
  let animalCollection: Collection<Animal>;
  const animalODM: AnimalODM = new AnimalODM();

  beforeAll(async() => {
    client = getClient();
    db = await getDb(client);
    animalCollection = await db.collection('animal');
  });

  beforeEach(async() => {
    await animalCollection.insertMany(animalFixtures as OptionalUnlessRequiredId<Animal>[]);
  });

  afterEach(async() => {
    await animalCollection.deleteMany({});
  });

  afterAll(async() => {
    await db.dropDatabase();
  });
  
  test('Get animal by id', async() => {
    const animalRes: (Animal | null) = await animalODM.selectById(animalFixtures[0].id as string);
    expect(animalRes).toEqual(animalFixtures[0]);
  });

  test('Get animal by wrong id', async() => {
    const wrongId: string = "64d2ad00aed4ebf2f0dd834m";
    const animalRes: (Animal | null) = await animalODM.selectById(wrongId);
    expect(animalRes).toEqual(null);
  });
  
  test('Create animal', async() => {
    const animal: Animal = createAnimal();
    const animalCreated: Animal = await animalODM.insert(animal);
    const animalWithId: Animal = {...animal, id: animalCreated.id};
    expect(animalWithId).toEqual(animalCreated);
  });
  
  test('Update animal', async() => {
    const animalModified: Animal = {...animalFixtures[0], name: faker.person.firstName()} as Animal;
    const ok: boolean = await animalODM.update(animalModified);
    expect(ok).toBeTruthy();
  });
  
  test('Update animal with unexisted id', async() => {
    const animalModified: Animal = {...animalFixtures[0], id: new ObjectId().toString()} as Animal;
    const ok: boolean = await animalODM.update(animalModified);
    expect(ok).toBeFalsy();
  });

  test('Delete animal by id', async() => {
    const ok: boolean = await animalODM.deleteByid(animalFixtures[0].id);
    const animal: (WithId<Animal> | null) = await animalCollection.findOne({id: animalFixtures[0].id});
    const animalCollSize: number = await animalCollection.countDocuments();
    expect(ok).toBeTruthy();
    expect(animal).toBeNull();
    expect(animalCollSize).toBe(4);
  });

  test('Delete animal by unexisted id', async() => {
    const ok: boolean = await animalODM.deleteByid(new ObjectId(faker.lorem.word()).toString());
    const animalCollSize: number = await animalCollection.countDocuments();
    expect(ok).toBeFalsy();
    expect(animalCollSize).toBe(5);
  });
  
});