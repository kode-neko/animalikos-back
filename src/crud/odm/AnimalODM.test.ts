import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { createAnimal } from '../../utils/mongo';
import AnimalODM from './AnimalODM';
import animalFixtures from '../../../fixtures/animal.json';
import { Animal } from '../../model';
import { faker } from '@faker-js/faker';
import { closeConnections, deleteDataCollection, dropCollection, getCollection, initMongoDb, initMongoose, insertDataCollection, loadConstants } from '../../utils/test';

describe('AnimalODM', () => {

  let client: MongoClient;
  let db: Db;
  let animalCollection: Collection<Animal>;
  const animalODM: AnimalODM = new AnimalODM();

  beforeAll(async() => {
    loadConstants();
    [client, db] = await initMongoDb();
    await initMongoose();
    animalCollection = await getCollection<Animal>(db, 'animal');
  });

  beforeEach(async() => {
    await insertDataCollection<Animal>(animalCollection, animalFixtures as Animal[]);
  });

  afterEach(async() => {
    await deleteDataCollection<Animal>(animalCollection);
  });

  afterAll(async() => {
    await dropCollection(db, client);
    await closeConnections(client);
  });
  
  test('Get animal by id', async() => {
    const animalRes: (Animal | null) = await animalODM.selectById(animalFixtures[0]._id as string) as Animal;
    Object.keys((key: string) => expect(animalRes[key]).toEqual(animalFixtures[0][key]));
  });

  test('Get animal by wrong id', async() => {
    const wrongId: string = new ObjectId().toJSON();
    const animalRes: (Animal | null) = await animalODM.selectById(wrongId);
    expect(animalRes).toBeNull();
  });
  
  test('Create animal', async() => {
    const animal: Animal = createAnimal();
    const animalCreated: Animal = await animalODM.insert(animal);
    const animalWithId: Animal = {...animal, _id: animalCreated._id};
    Object.keys((key: string) => expect(animalWithId[key]).toEqual(animalCreated[key]));
  });
  
  test('Update animal', async() => {
    const animalModified: Animal = {...animalFixtures[0], name: faker.person.firstName()} as Animal;
    const ok: boolean = await animalODM.update(animalModified);
    expect(ok).toBeTruthy();
  });
  
  test('Update animal with unexisted id', async() => {
    const animalModified: Animal = {...animalFixtures[0], _id: new ObjectId().toString()} as Animal;
    const ok: boolean = await animalODM.update(animalModified);
    expect(ok).toBeFalsy();
  });

  test('Delete animal by id', async() => {
    const ok: boolean = await animalODM.deleteByid(animalFixtures[0]._id);
    const animalCollSize: number = await animalCollection.countDocuments();
    expect(ok).toBeTruthy();
    expect(animalCollSize).toBe(4);
  });

  test('Delete animal by unexisted id', async() => {
    const ok: boolean = await animalODM.deleteByid(new ObjectId().toString());
    const animalCollSize: number = await animalCollection.countDocuments();
    expect(ok).toBeFalsy();
    expect(animalCollSize).toBe(5);
  });
  
});