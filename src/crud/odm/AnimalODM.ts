import { Document, Model, Types, model } from "mongoose";
import { Animal, SearchObj } from "../../model";
import ICrud from "../ICrud";
import animalSchema from "./AnimalSchema";
import { DeleteResult } from "mongodb";

type AnimalDoc = Document<unknown, {}, Animal> & Animal & {
  _id: Types.ObjectId;
};
const AnimalMod: Model<Animal> = model<Animal>('animal', animalSchema);

class AnimalODM implements ICrud<Animal> {
  select(id: string): Promise<Animal | null> {
    return AnimalMod.findById(id);
  }

  selectSearch(params: SearchObj): Promise<Animal[]> {
    const {limit, offset, search} = params;
    return AnimalMod.find({name: {$regex: search}}, null, {limit, skip: offset});
  }

  insert(obj: Animal): Promise<Animal>{
    const newAnimal: AnimalDoc = new AnimalMod(obj);
    return newAnimal.save();
  }

  update(obj: Animal): Promise<boolean> {
    return AnimalMod.findByIdAndUpdate(obj.id, obj)
      .then((value: (AnimalDoc | null)) => Boolean(value));
  }

  delete(id: string): Promise<boolean> {
    return AnimalMod.deleteOne({id})
      .then((res: DeleteResult) => Boolean(res.deletedCount));
  }

}

export default AnimalODM;