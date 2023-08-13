import {Context} from 'koa';
import { AnimalODM } from '../crud';
import { Animal, SearchObj } from '../model';

const animalODM: AnimalODM = new AnimalODM();

function getAnimalById(ctx: Context) {
  const {id} = ctx.params;
  animalODM.selectById(id)
    .then((animal: (Animal | null)) => {
      if(animal) {
        ctx.status = 200;
        ctx.body = animal;
      }
      else {
        ctx.status = 404;
        ctx.body = {msg: 'Not Found'};
      }
    })
    .catch(() => ctx.throw('Server error', 500));
}

async function getAnimalBySearch(ctx: Context) {
  const body: SearchObj = ctx.request.body;
  animalODM.selectBySearch(body)
    .then((list: Animal[]) => {
      ctx.status = 200;
      ctx.body = list;
    })
    .catch(() => ctx.throw('Server error', 500));
}

async function createAnimal(ctx: Context) {
  const animal: Animal = ctx.request.body; 
  animalODM.insert(animal)
    .then((animal: Animal) => {
      ctx.status = 201;
      ctx.body = animal;
    })
    .catch(() => ctx.throw('Server error', 500));
}

async function updateAnimal(ctx: Context) {
  const animal: Animal = ctx.request.body; 
  animalODM.update(animal)
    .then((ok: boolean) => {
      if(ok) {
        ctx.status = 200;
        ctx.body = animal;
      }
      else {
        ctx.status = 404;
        ctx.body = {msg: 'Not Found'};
      }
    })
    .catch(() => ctx.throw('Server error', 500));
}

async function deleteAnimalById(ctx: Context) {
  const {id} = ctx.params;
  animalODM.deleteByid(id)
    .then((ok: boolean) => {
      if(ok) {
        ctx.status = 200;
      }
      else {
        ctx.status = 404;
        ctx.body = {msg: 'Not Found'};
      }
    })
    .catch(() => ctx.throw('Server error', 500));
}

export {
  getAnimalById,
  getAnimalBySearch,
  createAnimal,
  updateAnimal,
  deleteAnimalById
};