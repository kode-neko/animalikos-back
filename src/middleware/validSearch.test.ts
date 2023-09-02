/* eslint-disable @typescript-eslint/typedef */
import { Context } from 'koa';
import validSearch from "./validSearch";
import { fake, mock } from 'sinon';
import { SearchObj } from '../model';
import { createSearch } from '../utils/mongo';

describe('validSearch', () => {

  test('The obj is correct', async() => {
    const search: SearchObj = createSearch();
    const mockCtx: unknown = {
      request: { body: search },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validSearch(ctx, next);
    expect(next.once()).toBeTruthy();
  });

  test('The obj has missing properties', async() => {
    const search: SearchObj = createSearch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {offset, ...searchAmputed} = search; 
    const mockCtx: unknown = {
      request: { body: searchAmputed },
      throw: fake()
    };
    const ctx: Context = mockCtx as unknown as Context;
    const next = mock();
    await validSearch(ctx, next);
    expect(next.once().throws()).toBeTruthy();
  });
  
});