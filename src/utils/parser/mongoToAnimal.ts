import { AnimalMongo } from "../../crud/odm/AnimalODM";
import { Animal } from "../../model";

function mongoToAnimal(animalMongo: AnimalMongo): (Animal | null) {
  if(animalMongo) {
    return ({
      // _id: animalMongo._id,
      name: animalMongo.name ,
      species: animalMongo.species ,
      sex: animalMongo.sex ,
      breed: animalMongo.breed ,
      bday: animalMongo.bday ,
      enter: animalMongo.enter ,
      desc: animalMongo.desc ,
    });
  }
  else 
    return null;
}

export default mongoToAnimal;