import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { Scrollbar } from "../nav/ScrollBar";
import { useGetUser } from "@/services/CustomerService";
import { use, useEffect, useState } from "react";

export const CustomersTable = () => {
  const { data: users } = useGetUser();

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users?.map((customer: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell padding="checkbox">
                        <Checkbox onChange={(event) => {}} />
                      </TableCell>
                      <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.role.toUpperCase()}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={1}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
