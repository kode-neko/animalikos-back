import Ajv, { JSONSchemaType } from 'ajv';
import { SearchAnimal } from '../model';
import { Context, Next } from 'koa';

const schemaSearch: JSONSchemaType<SearchAnimal> = {
  type: 'object',
  properties: {
    limit: {type: 'number'},
    offset: {type: 'number'},
    search: {type: 'string', nullable: true},
  },
  required: [
    'limit',
    'offset'
  ],
  additionalProperties: false 
}

async function validSearch(ctx: Context, next: Next) {
  const ajv = new Ajv();
  const validate = ajv.compile(schemaSearch);
  const search = ctx.request.body;
  const valid = validate(search);
  if(valid)
    await next()
  else
    ctx.throw('Not valid', 402)
}

export default validSearch;