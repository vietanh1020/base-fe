import { useGetBillDetail } from "@/services";
import { formatNumber } from "@/utils/format";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";

function RestaurantDetailPage({ id, table }: any) {
  const { data: bill } = useGetBillDetail(id);

  const getTotalOption = (options: any) => {
    let total = 0;
    for (let item of options) {
      for (let option of item?.data) {
        total = total + option.price;
      }
    }
    return total;
  };

  const getTotal = (listFood: any) => {
    let total = 0;

    for (let item of listFood) {
      if (item.status !== -1 && item.status !== 2)
        total = total + item.detail.price + getTotalOption(item.detail.options);
    }
    return total;
  };

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <h2>Hóa đơn: #{bill?.bill_number} </h2>
        <h2 style={{ marginLeft: "50px" }}>
          <strong>Bàn: </strong> {bill?.table}
        </h2>
      </div>

      <div>
        <strong>Khách hàng:</strong> {bill?.customerName}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Thời gian:</strong>{" "}
        {moment(bill?.createdAt).format("YYYY-MM-DD HH:mm")}
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên món ăn</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Lựa chọn</TableCell>
            <TableCell>Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bill &&
            bill?.detail.map((item: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{item.detail.name}</TableCell>
                  <TableCell>{formatNumber(item.detail.price)}</TableCell>
                  <TableCell>
                    {item?.detail.options.map((op: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginTop: "6px",
                        }}
                      >
                        {op?.data?.map((chose: any, index: number) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              gap: "12px",
                            }}
                          >
                            <strong>{chose?.label}</strong> +{" "}
                            {formatNumber(chose?.price)}
                          </div>
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{formatNumber(getTotal([item]) || 0)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <div style={{ float: "right" }}>
        <h3>Tổng {formatNumber(bill?.total)}</h3>
      </div>
    </Container>
  );
}

export async function getServerSideProps(context: any) {
  const { id, table } = context.query;

  return {
    props: {
      id,
      table,
    },
  };
}

export default RestaurantDetailPage;
