import { PaymentMethod } from "@stripe/stripe-js";

export type CardInfoDto = {
  cvv: string;
  country: string;
  last4: string;
  cardName: string;
  expYear: number;
  expMonth: number;
  cardNumber: string;
  type?: "visa" | "mastercard";
};

export type CardDto = {
  id: string;
  createdAt: string;
  updateAt: string;
  userId: string;
  method: string;
  info: CardInfoDto;
  addressId: string;
  isDefault: boolean;
};

export type CreateCardDto = {
  cardName: string;
  isDefault?: boolean;
  method: string;
  email?: string;
  userId?: string;
  companyId?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  metadata: PaymentMethod;
};

export type UpdateCardDto = {
  info?: {
    expMonth?: number;
    expYear?: number;
  };

  isDefault?: boolean;
};
