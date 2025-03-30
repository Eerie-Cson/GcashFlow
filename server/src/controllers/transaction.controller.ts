import { inject, injectable } from "tsyringe";

import { Request, Response } from "express";
import { TransactionService } from "../services/transaction-service";
import { Transaction } from "../types";

@injectable()
export class TransactionController {
  constructor(
    @inject(TransactionService) private transactionService: TransactionService
  ) {}

  async createTransaction(req: Request, res: Response) {
    try {
      const transactionInput: Omit<Transaction, "id" | "createdAt"> = req.body;
      const transactionCreated =
        await this.transactionService.createTransaction(transactionInput);
      res.status(200).json(transactionCreated);
    } catch (error) {
      res.status(500).json({ message: "Failed to create Transaction", error });
    }
  }

  async getTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.transactionService.getTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get Transactions", error });
    }
  }
}
