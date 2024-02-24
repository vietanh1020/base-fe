import {
  Box,
  CardContent,
  CardMedia,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { styles } from "./style";

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

export default function CreateOrder({ handleClose, show, food }: any) {
  const { price, name, image, description, options } = food;

  const [count, setCount] = useState(0);

  const decrease = () => {
    if (count > 0) setCount(count - 1);
  };

  const increase = () => {
    setCount(count + 1);
  };

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        <CardMedia
          component="img"
          image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder${image}`}
          alt={name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              fontWeight: 700,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" color="text.secondary" pb={1}>
              {name}
            </Typography>

            <Typography gutterBottom variant="body2" component="h1">
              {price}
            </Typography>
          </Box>

          <Typography>{description}</Typography>

          <div>
            {options.map(({ data, label, id }: any) => {
              return (
                <div key={id}>
                  <FormLabel sx={{ mt: 2, fontSize: 18 }}>{label}</FormLabel>
                  <RadioGroup defaultValue="outlined">
                    {data.map((item: any) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "between",
                          }}
                        >
                          <FormControlLabel
                            value={item.label}
                            control={<Radio />}
                            label={item.label}
                          />
                          <Box>{item.price}</Box>
                        </Box>
                      );
                    })}
                  </RadioGroup>
                </div>
              );
            })}

            <FormLabel sx={{ mt: 2, fontSize: 18 }}>
              Thêm lưu ý cho quán(Không bắt buộc)
            </FormLabel>
            <TextareaAutosize
              style={{ width: "100%", padding: "6px 12px" }}
              placeholder="Type anything…"
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                margin: "12px auto",
              }}
            >
              <Box sx={styles.btnAddFood} onClick={decrease}>
                -
              </Box>

              <Box sx={styles.btnAddFood}>{count}</Box>

              <Box sx={styles.btnAddFood} onClick={increase}>
                +
              </Box>
            </Box>

            <div
              style={{
                fontSize: "12px",
              }}
            >
              Việc thực hiện order còn phụ thuộc vào khả năng của quán!
            </div>
          </div>
        </CardContent>
        <Button autoFocus onClick={handleClose} sx={styles.btnSubmit}>
          Thêm vào giỏ hàng
        </Button>
      </DialogContent>
    </Modal>
  );
}
