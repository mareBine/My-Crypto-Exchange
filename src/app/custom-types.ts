export class Transaction {
  id: number;
  timestamp: number;
  amount: number;
  currency: string; // TODO: lahko bi bil tipa Currency
  type: string;
}

export class ExchangeRate {
  timestamp: number;
  from: string;
  to: string;
  rate: number;
}

export class Currency {
  id: number;
  currency: string;
}

export class Account {
  timestamp: number;
  amounts: object;
}
