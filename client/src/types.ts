// src/types.ts
export type Transaction = {
  date: string;
  type: TransactionType;
  amount: number;
  profit: number;
  profitMethod?: string;
};
export type Balances = {
  gcash: number;
  cash: number;
  profit: number;
};

export enum TransactionType {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}
