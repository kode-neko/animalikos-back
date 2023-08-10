import Koa from 'koa';
import {animalRouter} from './router';

const app = new Koa();

app.use(animalRouter.routes());
app.use(animalRouter.allowedMethods());

app.listen(4000)