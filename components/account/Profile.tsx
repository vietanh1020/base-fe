import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import UpdateAvatar from "../modals/UpdateAvatar";

export const Profile = ({ user }: any) => {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePreviewAvatar = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={session?.user.image}
            sx={{
              height: 250,
              mb: 2,
              width: 250,
            }}
          />
          <Typography gutterBottom variant="h5">
            {session?.user.name}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            GMT + 7
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button variant="text" fullWidth component="label">
          Upload
          <input
            hidden
            ref={fileRef}
            onChange={handlePreviewAvatar}
            accept=".jpg, .jpeg, .png"
            type="file"
          />
        </Button>
        {file && <UpdateAvatar file={file} show={show} onClose={handleClose} />}
      </CardActions>
    </Card>
  );
};
