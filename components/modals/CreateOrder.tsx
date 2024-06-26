import useLocalStorage from "@/hooks/useLocalStorage";
import { cartState } from "@/store";
import { formatNumber } from "@/utils/format";
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
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
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
  const { price, name, image, description, options, id, priceOrigin } = food;
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [cart, setCart] = useRecoilState(cartState);

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

    const cartData: any = [...cartItems, foodBody];
    setCart(cartData);
    setCartItems(cartData);

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
      fullScreen
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        <CardMedia
          component="img"
          image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${image}`}
          alt={name}
          sx={{ objectFit: "contain", height: "200px" }}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              fontWeight: 700,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" pb={1}>
                {name}
              </Typography>
              {price < priceOrigin && (
                <span
                  style={{
                    fontSize: 12,
                    color: "#f0a400",
                    display: "flex",
                    fontWeight: 400,
                    position: "relative",
                    bottom: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      position: "relative",
                      top: "3px",
                      marginRight: "2px",
                    }}
                  >
                    <svg
                      fill="orange"
                      width="14px"
                      height="14px"
                      viewBox="0 0 256 256"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M237.1709,129.69141,132.71875,25.23926A11.96309,11.96309,0,0,0,121.88086,21.957L41.22559,38.08789a3.99747,3.99747,0,0,0-3.1377,3.1377L21.957,121.88086a11.97405,11.97405,0,0,0,3.28223,10.83789L129.69043,237.1709a11.998,11.998,0,0,0,16.9707,0l90.50977-90.50879a11.998,11.998,0,0,0,0-16.9707Zm-5.65625,11.31347-90.51074,90.50977a3.99855,3.99855,0,0,1-5.65625,0L30.89551,127.0625a3.993,3.993,0,0,1-1.09473-3.61328l15.6084-78.04,78.04-15.6084a3.99944,3.99944,0,0,1,3.61328,1.09473L231.51465,135.34863a3.99855,3.99855,0,0,1,0,5.65625ZM92,84a8,8,0,1,1-8-8A8.00917,8.00917,0,0,1,92,84Z" />
                    </svg>
                  </div>
                  Giảm{" "}
                  {(((priceOrigin - price) / priceOrigin) * 100).toFixed(0)}%
                </span>
              )}
            </div>

            <Typography gutterBottom variant="body2" component="h1">
              <div style={{ fontSize: 12, textDecoration: "line-through" }}>
                {formatNumber(priceOrigin)}
              </div>
              <strong>{formatNumber(price)}</strong>
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            {/* <strong style={{ fontSize: 14 }}>Mô tả:</strong> */}
            {description}
          </Typography>

          <div style={{ marginTop: "12px" }}>
            {options?.map(({ data, label, id, isMultiple }: any) => (
              <div key={id}>
                <FormLabel sx={{ fontSize: 14, fontWeight: 600 }}>
                  {label}
                </FormLabel>

                {!isMultiple && (
                  <RadioGroup
                    value={selectedOptions[id] || ""}
                    onChange={(e) => handleRadioChange(id, e.target.value)}
                  >
                    {data.map((item: any) => (
                      <div
                        key={item?.id}
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
                          +{formatNumber(item.price)}
                        </strong>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {isMultiple && (
                  <FormGroup>
                    {data.map((item: any, index: number) => (
                      <div
                        key={index}
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
