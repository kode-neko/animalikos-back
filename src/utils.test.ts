import {cube} from './utils';

describe ('A bunch of tests for Utils', () => {
  test('multiply 3 times', () => { 
    const aux:number = cube(3);
    expect(aux).toBe(9);
  });
});