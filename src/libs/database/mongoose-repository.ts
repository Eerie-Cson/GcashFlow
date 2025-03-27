import { Repository } from "../utils/repository";
import { Connection, Model, Schema, SchemaDefinition } from "mongoose";
import { ObjectId } from "../object-id";
import { Filter } from "../utils/repository";
import * as R from "ramda";

export function serializeFilterField(field: any): any {
  if (field === undefined) {
    return undefined;
  }

  if (
    field === null ||
    ["number", "string", "boolean"].includes(typeof field) ||
    field instanceof Date ||
    field instanceof Buffer
  ) {
    return field;
  }
}

export function serializeFilter(filter: any): any {
  if (!filter || typeof filter !== "object") return filter;

  const data: Record<string, unknown> = { ...filter };

  if (filter.id) {
    data["_id"] = filter.id;
    delete filter.id;
  }

  return R.map(serializeFilterField, data);
}
export class MongooseRepository<TEntity extends { id: ObjectId }>
  implements Repository<TEntity>
{
  private _model: Model<TEntity>;
  constructor(
    connection: Connection,
    name: string,
    schemaDefinition: SchemaDefinition
  ) {
    const schema = new Schema(schemaDefinition, {
      versionKey: false,
      toJSON: {
        transform: function (doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });

    this._model = connection.model<TEntity>(name, schema);
  }

  public get model() {
    return this._model;
  }
  public async create(entity: TEntity): Promise<void> {
    try {
      await this.model.create(serializeFilter(entity));
    } catch (err: any) {
      throw err;
    }
  }

  public async update(
    filter: ObjectId | Filter<TEntity>,
    data: Partial<Omit<TEntity, "id">>
  ): Promise<void> {
    const serializedData = serializeFilter(data);

    if (filter instanceof ObjectId) {
      await this.model.updateOne(
        { _id: filter.toString() },
        { $set: serializedData }
      );
      return;
    }
    await this.model.updateMany(filter, { $set: serializedData });
  }
  public async find(
    filter: ObjectId | Filter<TEntity>
  ): Promise<TEntity | null> {
    const normalizedFilter = serializeFilter(
      filter instanceof ObjectId ? { id: filter } : filter
    );
    const doc = await this.model.findOne(normalizedFilter);

    if (!doc) {
      return null;
    }

    return doc;
  }

  public async list(filter?: Filter<TEntity>): Promise<TEntity[]> {
    const normalizedFilter = filter ? serializeFilter(filter) : {};

    const result = await this.model.find(normalizedFilter);

    if (!result || result.length === 0) {
      return [];
    }
    return result;
  }

  public async delete(filter: ObjectId | Filter<TEntity>): Promise<void> {
    if (filter instanceof ObjectId) {
      await this.model.deleteOne({ _id: filter.toString() });
      return;
    }
    await this.model.deleteMany(serializeFilter(filter));
  }
}
