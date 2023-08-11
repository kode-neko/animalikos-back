import { Context } from "koa";

async function errorHandler(err: Error, ctx: Context) {
  console.log(ctx.message);
  console.log(ctx.status);
}

export default errorHandler;