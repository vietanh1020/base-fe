import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, DialogTitle, Slider } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import styled from "@emotion/styled";

type Props = {
  file: File;
  onClose: () => void;
  show: boolean;
};

const Zoom = styled("div")`
  margin: 0 auto;
  display: flex;
  width: 70%;
  flex-direction: row;
  text-align: center;
`;

export default function UpdateAvatar({ file, show, onClose }: Props) {
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<any>(file);

  const handleScaleChange = (value: number | number[]) => {
    setScale(value as number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const canvas = editorRef.current.getImage();

    canvas.toBlob(async (blob: Blob) => {
      const formData: FormData = new FormData();
      await formData.append("upload", blob, `vietanh.png`);
      console.log(formData);
      // const { url: avtUrl } = await changeAvatar(formData);
    }, "image/png");
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={show}
      maxWidth="lg"
    >
      <DialogTitle align="center">Cập nhật ảnh đại diện</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <AvatarEditor
          ref={editorRef}
          image={file}
          width={300}
          height={300}
          border={[160, 50]}
          borderRadius={250}
          color={[255, 255, 255, 0.75]} // RGBA
          scale={scale}
          rotate={0}
        />
      </DialogContent>

      <DialogActions sx={{ display: "block" }}>
        <Zoom>
          <div>-</div>
          <Slider
            sx={{
              mx: "auto",
              width: "60%",
            }}
            size="small"
            defaultValue={1}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, value) => handleScaleChange(value)}
            aria-label="Small"
            valueLabelDisplay="auto"
          />

          <div>+</div>
        </Zoom>
        <Button
          fullWidth
          sx={{ float: "right" }}
          variant="text"
          onClick={handleSubmit}
        >
          Save Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}
