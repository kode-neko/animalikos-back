conn = Mongo();
db = conn.getDB('animalikos');

db.createUser({
  user: 'animalikos-admin',
  pwd: 'h9v2Ca59Zf',
  roles: [{ role: 'dbOwner', db: 'animalikos' }]
});

db.createUser({
  user: 'animalikos-user',
  pwd: 'd2xzhhdYRc',
  roles: [{role: 'readWrite', db: 'animalikos'}]
})