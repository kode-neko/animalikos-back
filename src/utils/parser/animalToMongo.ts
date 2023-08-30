import { Animal } from "../../model";
import { AnimalMongodb } from "../mongo";

function animalToMongo(animal: Animal): AnimalMongodb {
  return ({
    _id: animal.id as string,
    name: animal.name ,
    species: animal.species ,
    sex: animal.sex ,
    breed: animal.breed ,
    bday: animal.bday ,
    enter: animal.enter ,
    desc : animal.desc ,
  });
}

export default animalToMongo;