import { Document, Model, Types, model } from "mongoose";
import { Animal, SearchObj } from "../../model";
import ICrud from "../ICrud";
import animalSchema from "./AnimalSchema";
import { DeleteResult } from "mongodb";

type AnimalDoc = Document<unknown, {}, Animal> & Animal & {
  _id: Types.ObjectId;
};

class AnimalODM implements ICrud<Animal> {

  private static instance: AnimalODM;
  private AnimalModel: Model<Animal>;

  constructor() {
    if(AnimalODM.instance) {
      return AnimalODM.instance;
    }
    this.AnimalModel = model<Animal>('animal', animalSchema);
    AnimalODM.instance = this;
  }

  selectById(id: string): Promise<Animal | null> {
    return this.AnimalModel.findById(id);
  }

  selectBySearch(params: SearchObj): Promise<Animal[]> {
    const {limit, offset, search} = params;
    return this.AnimalModel.find({name: {$regex: search}}, null, {limit, skip: offset});
  }

  insert(obj: Animal): Promise<Animal>{
    const newAnimal: AnimalDoc = new this.AnimalModel(obj);
    return newAnimal.save();
  }

  update(obj: Animal): Promise<boolean> {
    return this.AnimalModel.findByIdAndUpdate(obj.id, obj)
      .then((value: (AnimalDoc | null)) => Boolean(value));
  }

  deleteByid(id: string): Promise<boolean> {
    return this.AnimalModel.deleteOne({id})
      .then((res: DeleteResult) => Boolean(res.deletedCount));
  }

}

export default AnimalODM;