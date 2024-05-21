import { useChangeStatus, useGetOrderDetail } from "@/services";
import { FoodStatus } from "@/utils/status";
import {
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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
const Modal = styled(Dialog)(({ theme }) => ({
  margin: 0,
  "& .MuiDialogContent-root": {
    margin: 0,
    // padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    // padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function DetailOrder({ handleClose, show, data }: any) {
  const { mutateAsync } = useChangeStatus();

  const { data: listDetail } = useGetOrderDetail(data?.id);

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên món ăn</TableCell>
                <TableCell>Lựa chọn</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listDetail?.map((food: any) => (
                <TableRow key={food.id}>
                  <TableCell>{food.detail.name}</TableCell>
                  <TableCell>
                    {food?.detail.options.map((op: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "20px",
                          marginTop: "6px",
                        }}
                      >
                        {op?.label}:
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
                      sx={{ width: "200px" }}
                      value={food.status}
                      disabled={food.status === -1}
                      onChange={(e) =>
                        mutateAsync({
                          orderId: food.id,
                          status: e.target.value,
                          device: data.deviceToken,
                        })
                      }
                    >
                      {food.status === -1 && (
                        <MenuItem value={-1}>Đã hủy</MenuItem>
                      )}
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
      </DialogContent>
    </Modal>
  );
}
