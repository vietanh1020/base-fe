/* eslint-disable react-hooks/exhaustive-deps */
import PaymentHeader from "@/components/commons/ui/PageHeader";
import { PageContent } from "@/components/commons/ui/UI";
import { IconCard } from "@/components/icons/IconCard";
import { useGetOrder } from "@/services/PaymentService";
import styles from "@/styles/Payment.module.scss";
import { MyNextPage } from "@/types";
import { Link } from "mdi-material-ui";
import moment from "moment";
import { Button, Col, Row } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Order: MyNextPage = (props: any) => {
  const { data: receiptData, isLoading } = useGetOrder(props.pageId);

  return (
    <>
      {receiptData && (
        <PageContent>
          <PaymentHeader
            page="order"
            date={moment(receiptData.createdAt).format("MMMM D, YYYY")}
            time={moment(receiptData.createdAt).format("hh:mm a")}
            pageId={receiptData.id.slice(-12)}
            billingPeriodTime={`${moment(receiptData.startAt).format("MMM D")}
            -
            ${moment(receiptData.endAt).format("MMM D, YYYY")}
            `}
            customerId={receiptData.companyId.slice(-12)}
          />

          <Row className={styles.receiptOverview}>
            <Col className={`text-uppercase ${styles.textLabel}`}>billTo:</Col>
            <Col className={styles.customerInfo}>
              <h6 className="text-end customerName">
                {`${receiptData.billTo.payment.info.cardName}`}
              </h6>
              <div className="text-end">{receiptData.billTo.zipCode}</div>
              <div className="text-end">
                {receiptData.billTo.address && `${receiptData.billTo.address},`}
              </div>
              <div className="text-end">{receiptData.billTo.province}</div>
              <div className="text-end">{receiptData.billTo.country || ""}</div>
            </Col>
          </Row>
          <Row className={styles.paymentMethod}>
            <Col className="text-uppercase">
              <Row>
                <Col>
                  <Row>
                    <Col className={`text-uppercase ${styles.textLabel}`}>
                      Payment
                    </Col>
                    <Col className="text-end">
                      <IconCard width="20" height="20" />
                    </Col>
                  </Row>
                </Col>
                <Col>{receiptData?.cardInfo?.cardNumber}</Col>

                <Col>
                  <Row>
                    <Col className="text-end">
                      <span
                        className={`${
                          receiptData.status === "Succeeded"
                            ? styles.paid
                            : receiptData.status === "Processing"
                            ? styles.processing
                            : styles.failed
                        }`}
                      >
                        {`${
                          receiptData.status === "Succeeded"
                            ? "PAID"
                            : receiptData?.status
                        }`}
                      </span>

                      {receiptData.visaFee && (
                        <span className={styles.fontWeight}>200</span>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          <div className={styles.listApi}>
            <Row
              className={`${styles.labelApi} text-uppercase ${styles.textLabel}`}
            >
              <Col>
                <span className={styles.apis}>apis:</span>
              </Col>
              <Col className={styles.numberOfCall}>number_of_calls</Col>
              <Col className={styles.amount}>amount:</Col>
            </Row>

            {receiptData.details.map((api: any, index: number) => {
              return (
                <Row key={index}>
                  <Col>
                    {/* {translate(api.title)} */}
                    {api.title}
                  </Col>
                  <Col>{api.summary}</Col>
                  <Col className={`text-end ${styles.amountApi}`}>
                    {api.amount}
                  </Col>
                </Row>
              );
            })}
          </div>

          <Row className={`pt-3 ${styles.receiptTotal}`}>
            <Col></Col>
            <Col>
              <div className={`${styles.subTotal}  mb-1`}>subTotal</div>
              <div className={`${styles.fees}  mb-1`}>tax</div>
              <div className={` mb-1 `}>total</div>
            </Col>
            <Col className={`${styles.total}`}>
              <div className={`text-end ${styles.subTotal} mb-1`}>
                ${receiptData.subTotal}
              </div>
              <div className={`text-end ${styles.fees} mb-1`}>
                ${receiptData.tax}
              </div>
              <div className={`text-end ${styles.totalMoney} mb-1`}>
                ${receiptData.total}
              </div>
            </Col>
          </Row>

          <Row className={styles.receiptAction}>
            <Col className="col-6 "></Col>
            <Col className="col-6 ">
              <Row>
                {receiptData.status === "Succeeded" && (
                  <>
                    <Col className={` ${styles.link} col-8`}>
                      <Link href={`/terms-of-service`}>
                        universalTermsOfService
                      </Link>
                    </Col>
                  </>
                )}

                <div>
                  <Button
                    className={`mt-4 float-end ${styles.btnPay}`}
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    // onClick={handlePay}
                    size="lg"
                  >
                    payNow
                  </Button>
                </div>
              </Row>
            </Col>
          </Row>
        </PageContent>
      )}
    </>
  );
};

export default Order;
