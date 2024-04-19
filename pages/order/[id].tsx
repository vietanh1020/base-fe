import { useChangeStatus, useGetOrderDetail } from "@/services";
import { FoodStatus } from "@/utils/status";
import {
  Container,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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
                  {food?.detail.options.map((op: any, index: number) => (
                    <div
                      key={index}
                      style={{ display: "flex", gap: "20px", marginTop: "6px" }}
                    >
                      {op?.data?.map((chose: any, index: number) => (
                        <div
                          key={index}
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
                      <MenuItem key={index} value={index}>
                        {item}
                      </MenuItem>
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
