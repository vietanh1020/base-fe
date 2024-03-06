import {
  Box,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  FormGroup,
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
import { useEffect, useState } from "react";
import { styles } from "./style";
import { formatNumber } from "@/utils/format";
import { useCreateOrder } from "@/services/OrderService";
import useLocalStorage from "@/hooks/useLocalStorage";

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
  const { price, name, image, description, options, id } = food;
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  console.log({ cartItems });

  const { mutateAsync } = useCreateOrder();

  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedOptions, setSelectedOptions] = useState<any>({});

  const handleRadioChange = (label: any, value: any) => {
    setSelectedOptions((prevSelectedOptions: any) => ({
      ...prevSelectedOptions,
      [label]: [value],
    }));
  };

  const handleCheckboxChange = (label: any, value: any) => {
    const newSelect = { ...selectedOptions };

    if (newSelect?.[label]?.includes(value)) {
      const selected = newSelect?.[label]?.filter((item: any) => item != value);
      setSelectedOptions({ ...newSelect, [label]: selected });
    } else {
      setSelectedOptions({
        ...newSelect,
        [label]: newSelect?.[label] ? [...newSelect?.[label], value] : [value],
      });
    }
  };

  const handleSubmit = async () => {
    const optionBody = Object.keys(selectedOptions).map((item) => {
      return {
        id: item,
        data: selectedOptions[item].map((op: string) => JSON.parse(op)),
      };
    });

    const foodBody = {
      id,
      note,
      food,
      totalPrice,
      quantity: count,
      options: optionBody,
    };

    setCartItems([...cartItems, foodBody]);

    // const res = await mutateAsync(data);
    handleClose();
  };
  useEffect(() => {
    let priceOption = 0;

    for (let key in selectedOptions) {
      selectedOptions[key].forEach((item: string) => {
        let itemObj = JSON.parse(item);
        priceOption += itemObj.price;
      });
    }

    setTotalPrice(priceOption + price);
  }, [selectedOptions]);

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
          sx={{ objectFit: "cover", height: "200px" }}
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
            {options.map(({ data, label, id, isMultiple }: any) => (
              <div key={id}>
                <FormLabel sx={{ fontSize: 14 }}>{label}</FormLabel>

                {!isMultiple && (
                  <RadioGroup
                    value={selectedOptions[id] || ""}
                    onChange={(e) => handleRadioChange(id, e.target.value)}
                  >
                    {data.map((item: any) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          key={item.id}
                          value={JSON.stringify(item)}
                          control={<Radio />}
                          label={item.label}
                        />
                        <strong style={{ marginBottom: "4px" }}>
                          +{formatNumber(item.price)} đ
                        </strong>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {isMultiple && (
                  <FormGroup>
                    {data.map((item: any) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControlLabel
                          onChange={(e: any) =>
                            handleCheckboxChange(id, e.target.value)
                          }
                          control={<Checkbox />}
                          label={item.label}
                          value={JSON.stringify(item)}
                        />
                        <strong style={{ marginBottom: "4px" }}>
                          +{formatNumber(item.price)} đ
                        </strong>
                      </div>
                    ))}
                  </FormGroup>
                )}
              </div>
            ))}
            <TextField
              margin="normal"
              value={note}
              fullWidth
              rows={3}
              name="price"
              label="Thêm lưu ý cho quán"
              type="text"
              onChange={(e) => setNote(e.target.value)}
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
        <Button
          autoFocus
          onClick={handleSubmit}
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "12px auto",
          }}
        >
          Thêm vào giỏ hàng - {formatNumber(totalPrice * count)}đ
        </Button>
      </DialogContent>
    </Modal>
  );
}
