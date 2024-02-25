import {
  Box,
  CardContent,
  CardMedia,
  FormControlLabel,
  FormLabel,
  Input,
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import { CleaningServices } from "@mui/icons-material";
import { useCreateFood, useUploadFoodImg } from "@/services/MenuService";

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
  const { mutateAsync: createFood } = useCreateFood();

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

        <CardContent>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              value={values.name}
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
              fullWidth
              error={!!errors?.price && touched.price}
              name="price"
              label="Giá  (đồng)"
              type="number"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />

            <div>
              <Input
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleImageChange}
                // style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button component="span">Tải lên Tệp</Button>
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
              {foodOptions.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>
                    Nhóm {optionIndex}
                    <input
                      type="text"
                      value={option.label}
                      onChange={(e) =>
                        handleLabelChange(optionIndex, e.target.value)
                      }
                    />
                  </label>
                  {option.data.map((dataItem, dataIndex) => (
                    <div key={dataIndex}>
                      <label>
                        Nhãn lựa chọn:
                        <input
                          type="text"
                          value={dataItem.label}
                          onChange={(e) =>
                            handleDataChange(
                              optionIndex,
                              dataIndex,
                              "label",
                              e.target.value
                            )
                          }
                        />
                      </label>

                      <button onClick={() => handleDeleteOption(optionIndex)}>
                        Xóa Lựa Chọn
                      </button>
                      <label>
                        Giá:
                        <input
                          type="number"
                          value={dataItem.price}
                          onChange={(e) =>
                            handleDataChange(
                              optionIndex,
                              dataIndex,
                              "price",
                              +e.target.value
                            )
                          }
                        />
                      </label>
                      <button
                        onClick={() => handleDeleteData(optionIndex, dataIndex)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button onClick={() => handleAddData(optionIndex)}>
                    Thêm Lựa Chọn
                  </button>
                </div>
              ))}
              <button onClick={handleAddOption}>Thêm Lựa Chọn</button>
            </div>
          </form>
        </CardContent>

        <Button autoFocus onClick={handleSubmit} sx={styles.btnSubmit}>
          Lưu
        </Button>
      </DialogContent>
    </Modal>
  );
}
