import {SearchObj} from '../model';

interface ICrud<T> {
  selectById: (id: string) => Promise<T | null>;
  selectBySearch: (params: SearchObj) => Promise<T[]>;
  insert: (obj: T) => Promise<T>;
  update: (obj: T) => Promise<boolean>;
  deleteByid: (id: string) => Promise<boolean>;
}

export default ICrud;