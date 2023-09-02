/* eslint-disable @typescript-eslint/typedef */
import { Context } from 'koa';
import validId from "./validId";
import { fake, mock } from 'sinon';

describe('validAnimal', () => {

  test('Object has an id', async() => {
    const mockCtx: unknown = {
      request: { body: { _id: '' } },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validId(ctx, next);
    expect(next.once()).toBeTruthy();
  });

  test('Object doesn\'t has an id', async() => {
    const mockCtx: unknown = {
      request: { body: {} },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validId(ctx, next);
    expect(next.once().throws()).toBeTruthy();
  });

});