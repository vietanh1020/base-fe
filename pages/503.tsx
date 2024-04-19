import { EmptyLayout } from "@/components/layouts/EmptyLayout";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";

const Page = () => (
  <>
    <Head>
      <title>503</title>
    </Head>
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: "center",
            }}
          >
            <img
              alt="Under development"
              src="/images/errors/error-404.png"
              style={{
                display: "inline-block",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography align="center" sx={{ mb: 3 }} variant="h3">
            503: permission denied
          </Typography>

          <Button
            component={NextLink}
            href="/"
            // startIcon={
            //   <SvgIcon fontSize="small">
            //     <ArrowLeftIcon />
            //   </SvgIcon>
            // }
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

Page.layout = EmptyLayout;

export default Page;
