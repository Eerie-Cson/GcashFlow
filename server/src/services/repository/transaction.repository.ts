import { MongooseRepository } from "../../libs/database/mongoose-repository";
import { ObjectId } from "../../libs/object-id";
import { Repository } from "../../libs/utils/repository";

import { Transaction } from "../../types/index";
import mongoose, { Connection } from "mongoose";

export type TransactionRepository = Repository<Transaction>;

export function TransactionFactory(
  connection: Connection
): TransactionRepository {
  return new MongooseRepository<Transaction>(connection, "Transaction", {
    id: ObjectId,
    amount: Number,
    type: String,
    createdAt: { type: Date, default: () => new Date() },
  });
}
