import { Db, MongoClient, Collection } from 'mongodb';
import request from 'supertest';
import animalFixtures from '../../fixtures/animal.json';
import { Animal } from '../model';
import { closeConnections, deleteDataCollection, dropCollection, getCollection, initMongoDb, initMongoose, insertDataCollection, loadConstants } from '../utils/test';
import app from '../app';

describe('Animal Controller', () => {

  let client: MongoClient;
  let db: Db;
  let animalCollection: Collection<Animal>;

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

  test('GET /:id - Exists id', async() => {
    const id: string = animalFixtures[0]._id;
    // eslint-disable-next-line @typescript-eslint/typedef
    const res = await request(app.callback()).get(`/animal/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBe(animalFixtures[0]);
  });
});