import { useUpdateFood, useUploadFoodImg } from "@/services/MenuService";
import {
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
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

  const handleDeleteOption = (optionIndex: any) => {
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
      setValues({ ...food });
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
        {/* <CardMedia
          component="img"
          image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${image}`}
          alt={name}
          sx={{ objectFit: "cover" }}
        /> */}

        <CardContent sx={{ width: "600px" }}>
          <h2 style={{ textAlign: "center", margin: 0 }}>Cập nhật món ăn</h2>
          <form action="" onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
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

                <TextField
                  margin="normal"
                  value={values.price}
                  error={!!errors?.price && touched.price}
                  name="price"
                  label="Giá gốc (đồng)"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                />

                <TextField
                  margin="normal"
                  value={values.priceOrigin}
                  error={!!errors?.priceOrigin && touched.priceOrigin}
                  name="priceOrigin"
                  label="Giá bán (đồng)"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="off"
                />

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
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    previewSource ||
                    `${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${food?.image}` ||
                    "images/errors/empty.jpg"
                  }
                  alt="Preview"
                  style={{ height: "200px", objectFit: "cover" }}
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
                      label="Nhiều lựa chọn"
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
                        label="Giá (đồng)"
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
