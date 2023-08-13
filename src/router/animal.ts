import Router from '@koa/router';
import {
  getAnimalById,
  getAnimalBySearch,
  createAnimal,
  updateAnimal,
  deleteAnimalById
} from '../controller';
import { validAnimalMw, validIdMw, validSearchMw } from '../middleware';
import { koaBody } from 'koa-body';

const animalRouter: Router = new Router();

animalRouter.get('/animal/:id', getAnimalById);
animalRouter.post('/animal/search', koaBody(), validSearchMw, getAnimalBySearch);
animalRouter.post('/animal', koaBody(), validAnimalMw, createAnimal);
animalRouter.put('/animal', koaBody(), validIdMw, validAnimalMw, updateAnimal);
animalRouter.delete('/animal/:id', deleteAnimalById);

export default animalRouter;