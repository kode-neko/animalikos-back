import Router from '@koa/router';
import {
  getAnimalById,
  getAnimalBySearch,
  createAnimal,
  updateAnimal,
  deleteAnimalById
} from '../controller'
import { validAnimalMw, validIdMw, validSearchMw } from '../middleware';

const animalRouter = new Router();

animalRouter.get('/animal/:id', getAnimalById);
animalRouter.post('/animal/search', validSearchMw, getAnimalBySearch);
animalRouter.post('/animal', validAnimalMw, createAnimal);
animalRouter.put('/animal', validIdMw, validAnimalMw, updateAnimal);
animalRouter.delete('/animal/:id', deleteAnimalById);

export default animalRouter;