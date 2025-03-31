export enum TransactionType {
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}

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
};
