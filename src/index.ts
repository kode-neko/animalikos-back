import Koa from 'koa';
import koaBody from 'koa-body';
import {animalRouter} from './router';
import { errorHandlerMw } from './middleware';

const app: Koa = new Koa();
app.use(koaBody());

app.use(animalRouter.routes());
app.use(animalRouter.allowedMethods());
app.on('error', errorHandlerMw);

app.listen(4000);