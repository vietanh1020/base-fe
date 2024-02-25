/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateCard } from "@/services/CardService";
import {
  CardInfo,
  CardInputWrapper,
  FormLabel,
  Info,
  InputName,
} from "../commons/Stripe";

import styles from "@/styles/Auth.module.scss";
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
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
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

const Checkbox = styled(Form.Check)`
  .form-check-input {
    width: 20px;
    height: 21px;
    border-radius: 3px;
    margin-right: 12px;
  }
  .form-check-label {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #092c4c;
    margin-left: 0;
    margin-top: 4px;
    margin-right: 6px;
  }
`;

type UserJwtDto = {
  userId: string;
  companyId: string;
  email: string;
};

const CheckoutForm = ({ footer, onClose }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isDefault, setIsDefault] = useState(false);
  const [stripeErr, setStripeErr] = useState("");
  const [error, setError] = useState(false);
  const [cardName, setCardName] = useState("");
  const [userValid, setUserValid] = useState<UserJwtDto>();
  const [focus, setFocus] = useState("");
  const [loadState, setLoadState] = useState<boolean>();

  const { mutateAsync: createCard } = useCreateCard();
  const { user: userAuth } = useSession() as any;

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
      <InputName
        type="text"
        name="cardName"
        value={cardName}
        className={error ? "is-invalid" : ""}
        placeholder="CARD HOLDER"
        onFocus={() => {
          setError(false);
          setFocus("");
        }}
        onChange={(e: any) => setCardName(e.target.value)}
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

      <Info>
        <Col xs={1}>
          <Image
            src="/icons/info-icon.png"
            alt="info-icon"
            width="23px"
            height="23px"
          />
        </Col>
        <div className="col">
          <span>infoSummary</span>
        </div>
      </Info>

      {footer && (
        <Row className="mt-5 gx-0">
          <Col xs={4}>
            <Button className={`mb-3 ${styles.ButtonCancel}`}>back</Button>
          </Col>
          <Col xs={8}>
            <Button
              type="submit"
              disabled={!stripe || !elements || loadState}
              className={`mb-3 ${styles.ButtonSubmit}`}
            >
              savePaymentMethod
            </Button>
          </Col>
        </Row>
      )}

      {!footer && (
        <Footer className="mt-5 mb-5">
          <Col md={5} className="d-flex align-items-center">
            <Checkbox type="checkbox" label="setAsDefaultCard" />
          </Col>
          <Col md={7} className="text-end">
            <Button>Submit</Button>
          </Col>
        </Footer>
      )}
    </Form>
  );
};

type PaymentStripeProps = {
  footer?: boolean;
  handleClose?: () => void;
};

const PaymentStripe = ({ footer = true, handleClose }: PaymentStripeProps) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || ""
  );

  const options: StripeElementsOptions = {
    mode: "setup",
    currency: "usd",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm footer={footer} onClose={handleClose} />
    </Elements>
  );
};

export default PaymentStripe;
