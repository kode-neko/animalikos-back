import Router from '@koa/router';
import {
  getAnimalById,
  getAnimalBySearch,
  createAnimal,
  updateAnimal,
  deleteAnimalById
} from '../controller'

const animalRouter = new Router();

animalRouter.get('/animal/:id', getAnimalById);
animalRouter.post('/animal/search', getAnimalBySearch);
animalRouter.post('/animal', createAnimal);
animalRouter.put('/animal', updateAnimal);
animalRouter.delete('/animal/:id', deleteAnimalById);

export default animalRouter;