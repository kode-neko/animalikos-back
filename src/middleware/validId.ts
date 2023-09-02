import { Context, Next } from "koa";
import { Animal } from "../model";

async function validId(ctx: Context, next: Next) {
  const animal: Animal = ctx.request.body;
  if(animal._id)
    await next();
  else
    ctx.throw(401);
}

export default validId;