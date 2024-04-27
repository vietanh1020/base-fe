import { useUpdateFood, useUploadFoodImg } from "@/services/MenuService";
import {
  Box,
  CardContent,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

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

export default function UpdateFood({
  handleClose,
  show,
  food = {},
  listCategory,
}: any) {
  const { mutateAsync } = useUploadFoodImg();
  const { mutateAsync: updateFood, data: foodData } = useUpdateFood(food?.id);

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

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      price: 0,
      priceOrigin: 0,
      category: "",
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

      const res = await updateFood(data);

      if (res) {
        setValues({} as any);
        handleClose();
      }
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (food) {
      const { name, priceOrigin, price, category, description } = food;
      setValues({ name, priceOrigin, price, category, description });
    }
  }, [food]);

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

  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedImage(file);
  };

  const previewFile = (file: any) => {
    if (!file) return;

    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        <h2 style={{ textAlign: "center" }}>Cập nhật món ăn</h2>
        <CardContent sx={{ width: "600px" }}>
          <form action="" onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "30px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  position: "relative",
                  bottom: "40px",
                }}
              >
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

                <Box
                  sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  <TextField
                    margin="normal"
                    value={values.priceOrigin}
                    error={!!errors?.priceOrigin && touched.priceOrigin}
                    name="priceOrigin"
                    label="Giá gốc (đồng)"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  <TextField
                    margin="normal"
                    value={values.price}
                    error={!!errors?.price && touched.price}
                    name="price"
                    label="Giá bán (đồng)"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Box>

                <Select
                  value={values.category}
                  error={!!errors?.category && touched.category}
                  label="Nhóm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="category"
                >
                  {listCategory?.map((item: any) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>

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
              </div>

              <div
                style={{
                  position: "relative",
                  bottom: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={
                    previewSource ||
                    `${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${food?.image}` ||
                    "images/errors/empty.jpg"
                  }
                  alt="Preview"
                  style={{ width: "230px", objectFit: "cover" }}
                />

                <Input
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <Button component="span">Ảnh minh họa</Button>
                </label>
              </div>
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
              onClick={() => handleSubmit()}
            >
              Lưu
            </Button>
          </form>
        </CardContent>
      </DialogContent>
    </Modal>
  );
}
