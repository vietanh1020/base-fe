import { CustomersSearch } from "@/components/customers/CustomerSearch";
import { CustomersTable } from "@/components/customers/CustomerTable";
import InviteUser from "@/components/modals/InviteUser";
import { useGetUser } from "@/services/CustomerService";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Customer = () => {
  const { data: users } = useGetUser();
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Customers</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                onClick={handleClick}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <CustomersSearch />
          <CustomersTable items={users || []} />
        </Stack>
      </Container>

      <InviteUser handleClose={handleClick} show={toggle} />
    </Box>
  );
};

export default Customer;
