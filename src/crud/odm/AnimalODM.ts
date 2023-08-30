import { Document, Model, model } from "mongoose";
import { Animal, SearchObj } from "../../model";
import ICrud from "../ICrud";
import animalSchema from "./AnimalSchema";
import { ObjectId } from "mongodb";

type AnimalDoc = Document<unknown, {}, Animal> & Animal & {
  _id: string;
};

type AnimalMongo = (Document<unknown, {}, Animal> & Animal & Required<{
  _id: string;
}>) | null

class AnimalODM implements ICrud<Animal> {

  private static instance: AnimalODM;
  private AnimalModel: Model<Animal>;

  constructor() {
    if(AnimalODM.instance) {
      return AnimalODM.instance;
    }
    this.AnimalModel = model<Animal>('animal', animalSchema, 'animal');
    AnimalODM.instance = this;
  }

  selectById(id: string): Promise<Animal | null> {
    return this.AnimalModel.findById(id).exec();
  }

  selectBySearch(params: SearchObj): Promise<Animal[]> {
    const {limit, offset, search} = params;
    return this.AnimalModel.find({name: {$regex: search}}, null, {limit, skip: offset});
  }

  insert(obj: Animal): Promise<Animal>{
    const _id: string = new ObjectId().toJSON();
    const newAnimal: AnimalDoc = new this.AnimalModel({...obj, _id});
    return newAnimal
      .validate()
      .then(() => newAnimal.save())
      .then((ele: Animal) => ele);
  }

  update(obj: Animal): Promise<boolean> {
    const {_id, ...rest} = obj;
    return this.AnimalModel.findByIdAndUpdate(_id, rest)
      .exec()
      .then((ele: unknown) => Boolean(ele));
  }

  deleteByid(id: string): Promise<boolean> {
    return this.AnimalModel.findByIdAndRemove(id, {lean: true})
      .exec()
      .then((ele: unknown) => Boolean(ele));
  }

}

export default AnimalODM;
export {
  AnimalMongo
};