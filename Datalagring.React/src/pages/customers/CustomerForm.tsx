import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Customer } from '../../types';

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState<Partial<Customer>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        try {
          const response = await fetch(`https://localhost:7001/api/customers/${id}`);
          const data = await response.json();
          setCustomer(data);
        } catch (error) {
          console.error('Error fetching customer:', error);
        }
      }
    };

    fetchCustomer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = id 
        ? `https://localhost:7001/api/customers/${id}`
        : 'https://localhost:7001/api/customers';
      
      await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });

      navigate('/customers');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Customer' : 'New Customer'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Company Name"
          value={customer.companyName}
          onChange={(e) => setCustomer({ ...customer, companyName: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Contact Person"
          value={customer.contactPerson}
          onChange={(e) => setCustomer({ ...customer, contactPerson: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={customer.phoneNumber}
          onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          margin="normal"
          multiline
          rows={3}
        />
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/customers')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {id ? 'Save Changes' : 'Create Customer'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomerForm; 