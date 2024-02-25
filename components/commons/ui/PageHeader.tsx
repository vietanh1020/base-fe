import { Row, Col, Image } from "react-bootstrap";
import styles from "@/styles/Payment.module.scss";
import { useSession } from "next-auth/react";
import { PaymentHeaderDto } from "@/types/Payment";

function PaymentHeader(props: PaymentHeaderDto) {
  const { data: user } = useSession() as any;

  return (
    <div>
      <Row className={`${styles.paymentHeader}`}>
        <Col>
          <h4>payment</h4>
          <Row>
            <Col>
              <div className={styles.info}>
                <div>
                  {props.page === "paymentDetails" ? `order #.` : "No."}
                </div>
                <div className="ms-2">{props.pageId} </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className={`${styles.logo}`}>
          <div className="float-end">
            <Image
              src={`/images/logo-lumyri.png`}
              width={56}
              height={63}
              alt="logo"
            />
          </div>
        </Col>
      </Row>

      <Row className={`${styles.paymentStatus}`}>
        <Col className={`col-xl-3 ${styles.date}`}>
          <p className={`float-start ${styles.textLabel}`}>Time</p>
          <div className={styles.orderDateTime}>
            <div className={styles.orderDate}>{props.date}</div>
            <div className={styles.orderTime}>{props.time}</div>
          </div>
        </Col>

        {props.billingPeriodTime && (
          <Col className={`col-xl-3 d-flex`}>
            <div className={styles.billingPeriod}>
              <div className={styles.labelBillingPeriod}></div>
              <div className={`float-start`}>{props.billingPeriodTime}</div>
            </div>
          </Col>
        )}

        {!!user?.company.name && (
          <Col>
            <div className={styles.customer}>
              <div className={`float-start ${styles.textLabel}`}>label</div>
              <div className="float-start ms-3">{user?.company.name}</div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default PaymentHeader;
