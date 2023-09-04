import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MsgServer } from './constants';
import app from './app';

dotenv.config({path: './config/env/.env'});
const {
  HOST_DB,
  DB_ADMIN,
  DB_ADMIN_PASS,
  PORT_APP
} = process.env;

mongoose.connect(HOST_DB as string, {user: DB_ADMIN, pass: DB_ADMIN_PASS})
  .then(() => {  
    try {
      app.listen(PORT_APP, () => console.log(MsgServer.SERVER_OK(PORT_APP as string)));
    } catch (err) {
      console.log(MsgServer.SERVER_FAIL);
    }
  })
  .catch(() => {
    console.log(MsgServer.DB_FAIL);
  });

