// src/App.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import { useGetInvoice } from "@/services/PaymentService";

const PaymentHistoryApp = () => {
  const { data: paymentHistory } = useGetInvoice();
  // Replace this data with your payment history

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push("/payment/" + id);
  };

  return (
    <div style={{ margin: "0 24px" }}>
      <h1>Lịch sử thanh toán </h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Số tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentHistory?.map((payment: any) => (
              <TableRow
                key={payment.id}
                onClick={() => handleClick(payment.id)}
              >
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.cardNumber}</TableCell>
                <TableCell>{payment.content}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}$</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentHistoryApp;
