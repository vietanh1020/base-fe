import PaymentStripe from "@/components/payment/PaymentStripe";
const ModalCardAdd = () => {
  return (
    <div style={{ margin: " 0 100px" }}>
      <PaymentStripe footer={false} handleClose={() => {}} />
    </div>
  );
};

export default ModalCardAdd;
