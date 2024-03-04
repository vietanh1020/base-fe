import { useCreateFood, useUploadFoodImg } from "@/services/MenuService";
import {
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
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

export default function CreateFood({ handleClose, show, food = {} }: any) {
  const {
    price = 10000,
    name = "",
    image = "",
    description = "",
    options = [],
  } = food;

  const router = useRouter();

  const { mutateAsync } = useUploadFoodImg();
  const { mutateAsync: createFood, data: foodData } = useCreateFood();

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên không được để trống"),
    price: Yup.number().required("Giá không được để trống"),
  });

  const initialOption = {
    label: "",
    price: "",
  };

  const initialFoodOption = {
    label: "",
    isMultiple: false,
    data: [initialOption],
  };

  const [foodOptions, setFoodOptions] = useState<any>([initialFoodOption]);

  const handleAddOption = () => {
    setFoodOptions([...foodOptions, initialFoodOption]);
  };

  const handleLabelChange = (optionIndex: any, value: any) => {
    const updatedOptions: any = [...foodOptions];
    updatedOptions[optionIndex].label = value;
    setFoodOptions(updatedOptions);
  };

  const handleMultipleChange = (optionIndex: any, value: any) => {
    const updatedOptions: any = [...foodOptions];
    updatedOptions[optionIndex].isMultiple = value;
    setFoodOptions(updatedOptions);
  };

  const handleAddData = (optionIndex: number) => {
    const updatedOptions = [...foodOptions];
    updatedOptions[optionIndex].data.push(initialOption);
    setFoodOptions(updatedOptions);
  };

  const handleDeleteOption = (optionIndex) => {
    const updatedOptions = [...foodOptions];
    updatedOptions.splice(optionIndex, 1);
    setFoodOptions(updatedOptions);
  };

  const handleDataChange = (
    optionIndex: number,
    dataIndex: number,
    field: any,
    value: any
  ) => {
    const updatedOptions: any = [...foodOptions];
    updatedOptions[optionIndex].data[dataIndex][field] = value;
    setFoodOptions(updatedOptions);
  };

  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        price: 0,
        description: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const imageUrl = await handleSaveImage();
        const data = {
          ...values,
          image: imageUrl,
          foodOption: foodOptions,
        };

        const res = await createFood(data);

        if (res) handleClose();
      },
    });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveImage = async () => {
    try {
      if (!selectedImage) return;

      const formData = new FormData();
      formData.append("file", selectedImage);
      const response = await mutateAsync(formData);
      return response;
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleDeleteData = (optionIndex: number, dataIndex: number) => {
    const updatedOptions = [...foodOptions];
    updatedOptions[optionIndex].data.splice(dataIndex, 1);
    setFoodOptions(updatedOptions);
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
          sx={{ objectFit: "cover" }}
        />

        <CardContent sx={{ width: "600px" }}>
          <h2 style={{ textAlign: "center", margin: 0 }}>Thêm món ăn mới</h2>
          <form action="" onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <TextField
                margin="normal"
                value={values.name}
                style={{ flex: 1 }}
                error={!!errors?.name && touched.name}
                label="Tên món ăn"
                onBlur={handleBlur}
                onChange={handleChange}
                name="name"
                autoComplete="off"
              />

              <TextField
                margin="normal"
                value={values.price}
                sx={{
                  width: "100px",
                }}
                error={!!errors?.price && touched.price}
                name="price"
                label="Giá  (đồng)"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                autoComplete="off"
              />
              <Input
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button component="span">Ảnh</Button>
              </label>
            </div>

            <TextField
              margin="normal"
              value={values.description}
              rows={3}
              fullWidth
              name="description"
              label="Mô tả"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0 }}>Danh sách lựa chọn</h3>
                <Button onClick={handleAddOption}>Thêm nhóm</Button>
              </div>
              {foodOptions.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ margin: 0 }}>
                      Nhóm lựa chọn {optionIndex + 1}
                    </h4>
                    <FormControlLabel
                      value={option.isMultiple}
                      control={<Checkbox />}
                      label="Cho phép chọn nhiêu lựa chọn"
                      onChange={(e: any) =>
                        handleMultipleChange(optionIndex, e.target.checked)
                      }
                    />
                    <TextField
                      margin="normal"
                      value={option.label}
                      sx={{ flex: 1, margin: 0 }}
                      label="Nhãn lựa chọn"
                      type="text"
                      onChange={(e) =>
                        handleLabelChange(optionIndex, e.target.value)
                      }
                      autoComplete="off"
                    />

                    <Button
                      color="error"
                      onClick={() => handleDeleteOption(optionIndex)}
                    >
                      X
                    </Button>
                  </div>
                  {option.data.map((dataItem, dataIndex) => (
                    <div
                      style={{
                        marginLeft: "20px",
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                      key={dataIndex}
                    >
                      <h4>Lựa chọn {dataIndex + 1}</h4>
                      <TextField
                        margin="normal"
                        value={dataItem.label}
                        sx={{ flex: 1, margin: 0 }}
                        label="Nhãn lựa chọn"
                        type="text"
                        onChange={(e) =>
                          handleDataChange(
                            optionIndex,
                            dataIndex,
                            "label",
                            e.target.value
                          )
                        }
                        autoComplete="off"
                      />

                      <TextField
                        margin="normal"
                        value={dataItem.price}
                        label="Giá"
                        sx={{
                          width: "100px ",
                          margin: 0,
                        }}
                        type="number"
                        onChange={(e) =>
                          handleDataChange(
                            optionIndex,
                            dataIndex,
                            "price",
                            +e.target.value
                          )
                        }
                        autoComplete="off"
                      />
                      <Button
                        color="error"
                        onClick={() => handleDeleteData(optionIndex, dataIndex)}
                      >
                        X
                      </Button>
                    </div>
                  ))}

                  <Button onClick={() => handleAddData(optionIndex)}>
                    Thêm Lựa Chọn
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="contained"
              sx={{
                borderRadius: "4px",
                margin: "0 auto",
                padding: "4px 30px ",
                display: "flex",
              }}
              autoFocus
              onClick={handleSubmit}
            >
              Lưu
            </Button>
          </form>
        </CardContent>
      </DialogContent>
    </Modal>
  );
}
