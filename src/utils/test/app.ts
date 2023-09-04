import Koa from 'koa';
import app from "../../app";
import { MsgServer } from "../../constants";

async function initApp(): Promise<Koa> {
  const {PORT_APP} = process.env;
  await app.listen(PORT_APP, () => console.log(MsgServer.SERVER_OK(PORT_APP as string)));
  return app;
}

export {
  initApp
};