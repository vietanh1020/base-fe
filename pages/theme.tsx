import CustomizedDialogs from "@/components/modals/Modal";
import { FavoriteBorder } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import Head from "next/head";
import styled from "styled-components";

const Div = styled.div`
  margin: 40px;
`;

const Page = () => {
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["The Godfather", "Pulp Fiction"]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      <Div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel
            required
            control={<FavoriteBorder />}
            label="Required"
          />

          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />

          {/* <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
          <Checkbox
            {...label}
            icon={<BookmarkBorderIcon />}
            checkedIcon={<BookmarkIcon />}
          /> */}
        </FormGroup>
      </Div>

      <Div>
        <Alert severity="error">This is an error alert — check it out!</Alert>
        <Alert severity="warning">
          This is a warning alert — check it out!
        </Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">
          This is a success alert — check it out!
        </Alert>

        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
      </Div>

      <CustomizedDialogs></CustomizedDialogs>
    </>
  );
};

export default Page;
