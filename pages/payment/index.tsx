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

const PaymentHistoryApp = () => {
  // Replace this data with your payment history
  const paymentHistory = [
    {
      id: 1,
      date: "2024-03-20",
      amount: 100.0,
      content: "Phí sử dụng dịch vụ T2",
      cardNumber: "**** **** 4242",
      status: "Paid",
    },
    {
      id: 2,
      date: "2024-02-24",
      amount: 50.0,
      content: "Phí sử dụng dịch vụ T2",
      cardNumber: "**** **** 4242",
      status: "Pending",
    },
    // Add more payment history items as needed
  ];

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push("/payment/" + id);
  };

  return (
    <div style={{ margin: "0 24px" }}>
      <h1>Payment History</h1>
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
            {paymentHistory.map((payment) => (
              <TableRow
                key={payment.id}
                onClick={() => handleClick(payment.id)}
              >
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.cardNumber}</TableCell>
                <TableCell>{payment.content}</TableCell>
                <TableCell>${payment.amount.toFixed(2)}</TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PaymentHistoryApp;
