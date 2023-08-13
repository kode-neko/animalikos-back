import mongoose from 'mongoose';
import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import koaBody from 'koa-body';
import {animalRouter} from './router';
import { errorHandlerMw } from './middleware';
import dotenv from 'dotenv';
import { MsgServer } from './constants';

dotenv.config({path: './config/env/.env'});
const {
  HOST_DB,
  DB_ADMIN,
  DB_ADMIN_PASS,
  PORT_APP
} = process.env;

mongoose.connect(HOST_DB as string, {user: DB_ADMIN, pass: DB_ADMIN_PASS})
  .then(() => {
    const app: Koa = new Koa();
    app.use(helmet());
    app.use(cors());
    app.use(koaBody());
    
    app.use(animalRouter.routes());
    app.use(animalRouter.allowedMethods());
    app.on('error', errorHandlerMw);
    
    try {
      app.listen(PORT_APP, () => console.log(MsgServer.SERVER_OK(PORT_APP as string)));
    } catch (err) {
      console.log(MsgServer.SERVER_FAIL);
    }
    
  })
  .catch(() => {
    console.log(MsgServer.DB_FAIL);
  });

