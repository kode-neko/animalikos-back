import { Schema } from "mongoose";
import { Animal, EnumSex, EnumSpecies } from "../../model";
import { ObjectId } from "mongodb";

const animalSchema = new Schema<Animal>({
  id: {type: ObjectId},
  name: {type: String, required: true},
  species: {type: String, required: true, enum: Object.values(EnumSpecies)},
  sex: {type: String, required: true, enum: Object.values(EnumSex)},
  breed: {type: String, required: true},
  bday: {type: String, required: true},
  enter: {type: String, required: true},
  desc: {type: String, required: true}
}, {id: true, _id: false});

export default animalSchema;