import { injectable, inject } from "tsyringe";
import { TransactionRepository } from "./repository/transaction.repository";
import { TransactionType } from "../types";
import { Token } from "./lib/token";
import { ObjectId } from "../libs/object-id";

@injectable()
export class TransactionService {
  constructor(
    @inject(Token.TransactionRepository)
    private transactionRepository: TransactionRepository
  ) {}

  async createTransaction(params: { amount: number; type: TransactionType }) {
    await this.transactionRepository.create({
      ...params,
      id: ObjectId.generate(),
      createdAt: new Date(),
    });
    return true;
  }

  async getTransactions() {
    return this.transactionRepository.list();
  }
}
