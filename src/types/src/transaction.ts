import { Node } from "./node";
export type Transaction = Node & {
  amount: number;
  type: TransactionType;
  createdAt: Date;
};

export enum TransactionType {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}
