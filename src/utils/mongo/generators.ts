import { faker } from "@faker-js/faker";
import { Animal, EnumSex, EnumSpecies, SearchObj } from "../../model";

function createAnimal(): Animal {
  return {
    name: faker.person.firstName(),
    species: ['cat', 'dog'][Math.floor(Math.random() * 2)] as EnumSpecies,
    sex: faker.person.sex() as EnumSex,
    breed: faker.lorem.words(),
    bday: faker.date.birthdate().toISOString(),
    enter: faker.date.future().toISOString(),
    desc: faker.lorem.paragraph(),
  };
}

function createAnimals(max: number): Animal[] {
  return Array(max).fill({}).map(() => createAnimal());
}

function createSearch(): SearchObj {
  return {
    limit: faker.number.int({min: 10, max: 20}),
    offset: faker.number.int({min: 2, max: 10}),
    search: faker.lorem.word(),
  };
}

export {
  createAnimal,
  createAnimals,
  createSearch
};