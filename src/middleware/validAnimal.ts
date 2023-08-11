import {Context, Next} from 'koa';
import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import { Animal, EnumSex, EnumSpecies } from '../model';

const schemaAnimal: JSONSchemaType<Animal> = {
  type: 'object',
  properties: {
    id: {type: 'string', nullable: true},
    name: {type: 'string'},
    species: {type: 'string',enum: Object.values(EnumSpecies)}, 
    sex: {type: 'string', enum: Object.values(EnumSex)}, 
    breed: {type: 'string'}, 
    bday: {type: 'string', format: "date"}, 
    enter: {type: 'string', format: "date"}, 
    desc: {type: 'string'}, 
  },
  required: [
    'name',
    'species',
    'sex',
    'breed',
    'bday',
    'enter',
    'desc'
  ],
  additionalProperties: false
}

async function validAnimal(ctx: Context, next: Next) {
  const ajv = new Ajv();
  addFormats(ajv, ['date']);
  const validate = ajv.compile(schemaAnimal);
  const animal = ctx.request.body;
  const valid = validate(animal);
  console.log(ctx.body)
  if(valid)
    await next()
  else
    ctx.throw(401);
}

export default validAnimal;