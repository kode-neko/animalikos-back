/* eslint-disable @typescript-eslint/typedef */
import {Context, Next} from 'koa';
import Ajv, {JSONSchemaType} from 'ajv';
import addFormats from 'ajv-formats';
import { Animal, EnumSex, EnumSpecies } from '../model';

const schemaAnimal: JSONSchemaType<Animal> = {
  type: 'object',
  properties: {
    _id: {type: 'string', nullable: true},
    name: {type: 'string'},
    species: {type: 'string',enum: Object.values(EnumSpecies)}, 
    sex: {type: 'string', enum: Object.values(EnumSex)}, 
    breed: {type: 'string'}, 
    bday: {type: 'string', format: "date-time"}, 
    enter: {type: 'string', format: "date-time"}, 
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
};

async function validAnimal(ctx: Context, next: Next): Promise<unknown> {
  const ajv: Ajv = new Ajv();
  addFormats(ajv, ['date-time']);
  const validate = ajv.compile(schemaAnimal);
  const animal: Animal = ctx.request.body as Animal;
  const valid: boolean = validate(animal);
  if(valid)
    await next();
  ctx.throw(401);
}

export default validAnimal;