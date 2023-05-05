import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";

import { Profile } from "@/components/account/Profile";
import { ProfileDetails } from "@/components/account/ProfileDetails";

const Account = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <div>
          <Typography variant="h4">Account</Typography>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <Profile />
            </Grid>
            <Grid xs={12} md={6} lg={8}>
              <ProfileDetails />
            </Grid>
          </Grid>
        </div>
      </Stack>
    </Container>
  </Box>
);

// Account.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
