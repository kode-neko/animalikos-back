import {Context, Next} from 'koa';

async function getAnimalById(ctx: Context, next: Next) {
  ctx.body={msg: 'an animal by id'};
  ctx.status = 200;
}

async function getAnimalBySearch(ctx: Context, next: Next) {
  ctx.body=['animal 01', 'animal 02'];
  ctx.status = 200;
}

async function createAnimal(ctx: Context, next: Next) {
  ctx.body={msg: 'an animal created'};
  ctx.status = 201;
}

async function updateAnimal(ctx: Context, next: Next) {
  ctx.body={msg: 'an animal updated'};
  ctx.status = 200;
}

async function deleteAnimalById(ctx: Context, next: Next) {
  ctx.body={msg: 'an animal deleted'};
  ctx.status = 200;
}

export {
  getAnimalById,
  getAnimalBySearch,
  createAnimal,
  updateAnimal,
  deleteAnimalById
}