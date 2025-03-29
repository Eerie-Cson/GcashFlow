import { Router } from "express";
import { container } from "tsyringe";
import { TransactionController } from "../controllers/transaction.controller";

export default function createTransactionRouter() {
  const router = Router();
  const transactionController = container.resolve(TransactionController);

  router.post(
    "/create-product",
    transactionController.createTransaction.bind(transactionController)
  );
  router.get(
    "/",
    transactionController.getTransactions.bind(transactionController)
  );

  return router;
}
