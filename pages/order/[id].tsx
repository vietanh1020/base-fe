import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
} from "@mui/material";
import { FoodStatus } from "@/utils/status";
import { useChangeStatus, useGetOrderDetail } from "@/services";

const OrderDetailPage = ({ id }: any) => {
  const { data } = useGetOrderDetail(id);

  const { mutateAsync } = useChangeStatus();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Chi tiết đơn hàng
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên món ăn</TableCell>
              <TableCell>Lựa chọn</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((food: any) => (
              <TableRow key={food.id}>
                <TableCell>{food.detail.name}</TableCell>
                <TableCell>
                  {food?.detail.options.map((op: any) => (
                    <div
                      style={{ display: "flex", gap: "20px", marginTop: "6px" }}
                    >
                      {op?.data?.map((chose: any) => (
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                          }}
                        >
                          <Typography variant="h6" component="div">
                            {chose?.label}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </TableCell>

                <TableCell>
                  <Select
                    value={food.status}
                    onChange={(e) =>
                      mutateAsync({ orderId: food.id, status: e.target.value })
                    }
                  >
                    {FoodStatus.map((item, index) => (
                      <MenuItem value={index}>{item}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

export default OrderDetailPage;