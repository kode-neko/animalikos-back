import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from 'koa-cors';
import koaBody from 'koa-bodyparser';
import {animalRouter} from './router';
import { errorHandlerMw } from './middleware';

const app: Koa = new Koa();
app.use(helmet());
app.use(cors());
app.use(koaBody());

app.use(animalRouter.routes());
app.use(animalRouter.allowedMethods());
app.on('error', errorHandlerMw);

export default app;
