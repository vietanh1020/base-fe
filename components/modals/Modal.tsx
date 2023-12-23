import {
  Box,
  CardContent,
  CardMedia,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
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

export default function CustomizedDialogs({ handleClose, show, content }: any) {
  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        <CardMedia
          component="img"
          image="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/387841119_1769731203545112_6124233819149364047_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=4TQgDO1XZE4AX9FQqMY&_nc_ht=scontent.fhan9-1.fna&oh=00_AfC8ksGjgUr7gtlNaYns5_LUssvV-6WA60myJZ-p1HtURA&oe=658C63AA"
          alt="green iguana"
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
              Cam dứa
            </Typography>

            <Typography gutterBottom variant="body2" component="h1">
              40.000
            </Typography>
          </Box>

          <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text .
          </Typography>

          <div>
            <FormControl>
              <FormLabel sx={{ mt: 2, fontSize: 18 }}>
                Loại cốc (Chọn 1)
              </FormLabel>
              <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Radio value="outlined" />
                  <Typography>Size M+ (Ly giấy cao cấp)</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Radio value="outlined" />
                  <Typography>Size M+ (Ly nhựa)</Typography>
                </Box>
              </RadioGroup>
            </FormControl>

            <TextareaAutosize placeholder="Type anything…" />

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
          onClick={handleClose}
          sx={{
            py: 1,
            display: "flex",
            marginX: "auto",
            color: "#fff",
            my: 1,
            fontWeight: "400",
            fontSize: "16px",
            backgroundColor: "#43dc5c",
          }}
        >
          Thêm vào giỏ hàng - 50.000
        </Button>
      </DialogContent>
    </Modal>
  );
}
