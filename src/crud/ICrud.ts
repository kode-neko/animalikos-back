import {SearchObj} from '../model';

interface ICrud<T> {
  select: (id: string) => Promise<T | null>;
  selectSearch: (params: SearchObj) => Promise<T[]>;
  insert: (obj: T) => Promise<T>;
  update: (obj: T) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export default ICrud;