import Ajv, { JSONSchemaType,ValidateFunction } from 'ajv';
import { SearchObj } from '../model';
import { Context, Next } from 'koa';

const schemaSearch: JSONSchemaType<SearchObj> = {
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
};

async function validSearch(ctx: Context, next: Next) {
  const ajv: Ajv = new Ajv();
  const validate: ValidateFunction<SearchObj> = ajv.compile(schemaSearch);
  const search: SearchObj = ctx.request.body;
  const valid: boolean = validate(search);
  if(valid)
    await next();
  else
    ctx.throw('Not valid', 402);
}

export default validSearch;