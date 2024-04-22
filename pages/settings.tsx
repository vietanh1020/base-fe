import { SettingCompany } from "@/components/settings/SettingCompany";
import { SettingsPassword } from "@/components/settings/SettingsPassword";
import { Box, Container, Stack, Typography } from "@mui/material";

const Page = () => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
    }}
  >
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <Typography variant="h4">Thông tin cửa hàng</Typography>
        <SettingCompany />
        <SettingsPassword />
      </Stack>
    </Container>
  </Box>
);

export default Page;
