import { Types } from "mongoose";

export class ObjectId {
  private readonly _value: Types.ObjectId;

  private constructor(value: string | Types.ObjectId) {
    this._value = new Types.ObjectId(value);
  }

  public static generate(): ObjectId {
    return new ObjectId(new Types.ObjectId());
  }

  public static from(value: string): ObjectId {
    return new ObjectId(value);
  }

  public toString(): string {
    return this._value.toHexString();
  }

  public toObjectId(): Types.ObjectId {
    return this._value;
  }
}
