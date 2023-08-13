import mongoose from 'mongoose';
import Koa from 'koa';
import koaBody from 'koa-body';
import {animalRouter} from './router';
import { errorHandlerMw } from './middleware';

mongoose.connect('mongodb://localhost:3010/?authSource=animalikos')
  .then(() => {
    const app: Koa = new Koa();
    app.use(koaBody());
    
    app.use(animalRouter.routes());
    app.use(animalRouter.allowedMethods());
    app.on('error', errorHandlerMw);
    
    try {
      app.listen(4000, () => console.log('Server on port 4000'));
    } catch (err) {
      console.log('Error launching server');
    }
    
  })
  .catch(() => {
    console.log('Error conection DB');
  });

