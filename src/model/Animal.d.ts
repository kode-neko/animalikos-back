import EnumSex from "./EnumSex";
interface Animal {
    name: string;
    sex: EnumSex;
    breed: string;
    bday: Date;
    enter: Date;
    desc: string;
}
export default Animal;
