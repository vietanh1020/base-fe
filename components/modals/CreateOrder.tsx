import {
  Box,
  CardContent,
  CardMedia,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { styles } from "./style";
import { formatNumber } from "@/utils/format";

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

  const [count, setCount] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<any>({});

  console.log(selectedOptions);

  const handleRadioChange = (label: any, value: any) => {
    // Update the state with the selected value for the corresponding label
    setSelectedOptions((prevSelectedOptions: any) => ({
      ...prevSelectedOptions,
      [label]: value,
    }));
  };

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
          image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${image}`}
          alt={name}
          sx={{ objectFit: "cover", height: "300px" }}
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
              <strong>{formatNumber(price)} đ</strong>
            </Typography>
          </Box>

          <Typography>
            <strong>Mô tả:</strong> {description}
          </Typography>

          <div>
            {options.map(({ data, label, id }: any) => (
              <div key={id}>
                <FormLabel sx={{ fontSize: 14 }}>{label}</FormLabel>
                <RadioGroup
                  value={selectedOptions[label] || ""}
                  onChange={(e) => handleRadioChange(label, e.target.value)}
                >
                  {data.map((item: any) => (
                    <FormControlLabel
                      key={item.id}
                      value={JSON.stringify(item) || ""}
                      control={<Radio />}
                      label={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {item.label}
                          <strong style={{ marginBottom: "4px" }}>
                            {formatNumber(item.price)} đ
                          </strong>
                        </Box>
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            ))}
            <TextField
              margin="normal"
              // value={values.price}
              fullWidth
              rows={3}
              // error={!!errors?.price && touched.price}
              name="price"
              label="Thêm lưu ý cho quán"
              type="text"
              // onBlur={handleBlur}
              // onChange={handleChange}
              autoComplete="off"
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

              <Box sx={styles.btnAddFood}>
                <strong>{count}</strong>
              </Box>

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
          Thêm vào giỏ hàng - đ
        </Button>
      </DialogContent>
    </Modal>
  );
}
