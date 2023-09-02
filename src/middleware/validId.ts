import { Context, Next } from "koa";
import { Animal } from "../model";

async function validId(ctx: Context, next: Next) {
  const obj: Pick<Animal, '_id'> = ctx.request.body as Pick<Animal, '_id'>;
  if(obj._id)
    await next();
  else
    ctx.throw(401);
}

export default validId;