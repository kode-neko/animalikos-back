import EnumSex from "./EnumSex";
import EnumSpecies from "./EnumSpecies";

interface Animal {
  name: string;
  species: EnumSpecies;
  sex: EnumSex;
  breed: string;
  bday: Date;
  enter: Date;
  desc: string;
}

export default Animal;