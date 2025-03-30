import { ObjectId } from "../object-id";

export interface Repository<T extends { id: ObjectId }> {
  create: (entity: T) => Promise<void>;
  update(
    filter: ObjectId | Filter<T>,
    data: Partial<Omit<T, "id">>,
    opts?: { upsert?: boolean }
  ): Promise<void>;
  find: (filter: ObjectId | Filter<T>) => Promise<T | null>;
  list: (filter?: Filter<T>) => Promise<T[] | null>;
  delete: (filter: ObjectId | Filter<T>) => Promise<void>;
}

export type Filter<T> = {
  [P in keyof T]?: T[P] | FilterCondition<T[P]>;
} & Record<string, unknown>;

export type FilterCondition<T> = {
  equal?: T;
  notEqual?: T;
  in?: T[];
  notIn?: T[];
  greaterThan?: T;
  greaterThanOrEqual?: T;
  lesserThan?: T;
  lesserThanOrEqual?: T;
  regex?: T;
  text?: T;
};
