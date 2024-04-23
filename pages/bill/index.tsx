import { Scrollbar } from "@/components/nav/ScrollBar";
import { useGetBill } from "@/services";
import { formatNumber } from "@/utils/format";
import {
  Box,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";

const Customer = () => {
  const { data: users } = useGetBill();

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Hoá đơn</Typography>
            </Stack>
          </Stack>
          <Card>
            <Scrollbar>
              <Box sx={{ minWidth: 800 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No#</TableCell>
                      <TableCell>Khách hàng</TableCell>
                      <TableCell>Bàn</TableCell>
                      <TableCell>Thời gian</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users?.map((customer: any, index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{customer.bill_number}</TableCell>
                            <TableCell>{customer.customerName}</TableCell>
                            <TableCell>{customer.table}</TableCell>
                            <TableCell>
                              {moment(customer.createdAt).format(
                                "DD-MM-YYYY HH:mm"
                              )}
                            </TableCell>
                            <TableCell>
                              {formatNumber(customer.total || 0)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </Box>
            </Scrollbar>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

export default Customer;
