import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Info as InfoIcon } from '@mui/icons-material';
import { Customer } from '../../types';
import { getCustomers } from '../../services/api';

const CustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Customers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/customers/new')}
        >
          New Customer
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.companyName}</TableCell>
                <TableCell>{customer.contactPerson}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/customers/edit/${customer.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      startIcon={<InfoIcon />}
                      onClick={() => navigate(`/customers/${customer.id}`)}
                    >
                      Details
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomerList; 