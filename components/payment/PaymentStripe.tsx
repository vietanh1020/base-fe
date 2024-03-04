/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateCard } from "@/services/CardService";
import { CardInfo, CardInputWrapper, FormLabel } from "../commons/Stripe";

import { Button, TextField } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  StripeCardNumberElement,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import { IconCvc } from "../icons/IconCvc";
type CheckoutFormProps = {
  footer: boolean;
  onClose?: () => void;
};

const Footer = styled(Row)`
  margin-top: 23px;
  margin-bottom: 31px;
`;

type UserJwtDto = {
  userId: string;
  companyId: string;
  email: string;
};

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isDefault, setIsDefault] = useState(false);
  const [stripeErr, setStripeErr] = useState("");
  const [error, setError] = useState(false);
  const [cardName, setCardName] = useState("");
  const [userValid, setUserValid] = useState<UserJwtDto>();
  const [focus, setFocus] = useState("");
  const [loadState, setLoadState] = useState<boolean>();

  const { mutateAsync: createCard } = useCreateCard();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setFocus("");

    if (!cardName) {
      setError(true);
      return;
    }

    setLoadState(true);

    if (elements == null || !stripe) return;

    const { paymentMethod, error } = await stripe?.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement) as StripeCardNumberElement,
    });

    if (error?.message) toast.error(error?.message);

    if (!paymentMethod) return;

    const card = await createCard({
      cardName,
      method: paymentMethod.id,
      isDefault,
      ...userValid,
      metadata: { ...paymentMethod },
    });
  };

  const focusStripe = (field: string) => {
    if (stripeErr === field) setStripeErr("");
    setFocus(field);
  };

  const stripeOption = {
    style: {
      base: {
        fontFamily: " Roboto, Helvetica Neue, sans-serif",
        fontSize: "16px",
      },
    },
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
      <CardInputWrapper
        focus={focus === "cardNumber"}
        err={stripeErr === "cardNumber"}
      >
        <CardNumberElement
          id="cardNumber"
          onFocus={() => focusStripe("cardNumber")}
          options={{
            showIcon: true,
            ...stripeOption,
          }}
        />
      </CardInputWrapper>

      <FormLabel htmlFor="cardName">Cardholder Name</FormLabel>
      <TextField
        fullWidth
        label="Cardholder Name"
        name="cardName"
        onChange={(e: any) => setCardName(e.target.value)}
        required
        value={cardName}
      />

      <CardInfo>
        <div>
          <FormLabel htmlFor="expiry">Card Expiration</FormLabel>
          <CardInputWrapper
            focus={focus === "expiry"}
            err={stripeErr === "expiry"}
          >
            <CardExpiryElement
              id="expiry"
              options={stripeOption}
              onFocus={() => focusStripe("expiry")}
            />
          </CardInputWrapper>
        </div>

        <div className="spacing"></div>

        <div>
          <FormLabel htmlFor="cvc">CVC</FormLabel>
          <CardInputWrapper focus={focus === "cvc"} err={stripeErr === "cvc"}>
            <CardCvcElement
              id="cvc"
              options={stripeOption}
              onFocus={() => focusStripe("cvc")}
            />

            <div className="icon">
              <IconCvc />
            </div>
          </CardInputWrapper>
        </div>
      </CardInfo>

      <Footer className="mt-5 mb-5">
        <Col md={7} className="text-end">
          <Button onClick={handleSubmit}>Submit</Button>
        </Col>
      </Footer>
    </Form>
  );
};

type PaymentStripeProps = {
  footer?: boolean;
  handleClose?: () => void;
};

const PaymentStripe = ({ footer = true, handleClose }: PaymentStripeProps) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY ||
      "pk_test_51OnhRCJzOnOMQCJ1EVU16Dh7wttSuaVVnmu5zbWKG8VqAOQVAGJeeKCsaADUkgS5qT2jZNsgNQA7w3E91k29T9km00ESFP6mEX"
  );

  const options: StripeElementsOptions = {
    mode: "setup",
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentStripe;
