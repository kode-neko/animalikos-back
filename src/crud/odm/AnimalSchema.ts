import { Schema } from "mongoose";
import { Animal, EnumSex, EnumSpecies } from "../../model";

const animalSchema: Schema<Animal> = new Schema<Animal>({
  _id: {type: String, unique: true},
  name: {type: String, required: true},
  species: {type: String, required: true, enum: Object.values(EnumSpecies)},
  sex: {type: String, required: true, enum: Object.values(EnumSex)},
  breed: {type: String, required: true},
  bday: {type: String, required: true},
  enter: {type: String, required: true},
  desc: {type: String, required: true}
}, {});

export default animalSchema;