import { faker } from "@faker-js/faker";
import { Animal, EnumSex, EnumSpecies } from "../../model";

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

export {
  createAnimal,
  createAnimals
};