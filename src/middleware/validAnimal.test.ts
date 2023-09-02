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


});