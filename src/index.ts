import mongoose from 'mongoose';
import Koa from 'koa';
import koaBody from 'koa-body';
import {animalRouter} from './router';
import { errorHandlerMw } from './middleware';
import dotenv from 'dotenv';

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
    app.use(koaBody());
    
    app.use(animalRouter.routes());
    app.use(animalRouter.allowedMethods());
    app.on('error', errorHandlerMw);
    
    try {
      app.listen(PORT_APP, () => console.log(`Server on port ${PORT_APP}`));
    } catch (err) {
      console.log('Error launching server');
    }
    
  })
  .catch(() => {
    console.log('Error conection DB');
  });

