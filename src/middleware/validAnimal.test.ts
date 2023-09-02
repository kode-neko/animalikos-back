/* eslint-disable @typescript-eslint/typedef */
import { Context } from 'koa';
import { createAnimal } from "../utils/mongo/generators";
import validAnimal from "./validAnimal";
import { Animal } from '../model';
import { fake, mock } from 'sinon';

describe('validAnimal', () => {

  test('Animal is correct', async() => {
    const animal: Animal = createAnimal();
    const mockCtx: unknown = {
      request: { body: animal },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validAnimal(ctx, next);
    expect(next.once()).toBeTruthy();
  });

  test('Animal is wrong', async() => {
    const animal: Animal = createAnimal();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {name, ...animalAmputed} = animal; 
    const mockCtx: unknown = {
      request: { body: animalAmputed },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validAnimal(ctx, next);
    expect(next.once().throws()).toBeTruthy();
  });

  test('Animal with wrong date', async() => {
    const animal: Animal = createAnimal();
    const animalWrongDate: unknown = {...animal, bday: ''}; 
    const mockCtx: unknown = {
      request: { body: animalWrongDate },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validAnimal(ctx, next);
    expect(next.once().throws()).toBeTruthy();
  });

});