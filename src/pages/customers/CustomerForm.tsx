import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { Customer } from '../../types';
import { createCustomer, updateCustomer, getCustomer } from '../../services/api';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  contactPerson: Yup.string().required('Contact person is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      'Invalid phone number'
    ),
  address: Yup.string(),
});

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<Partial<Customer>>({
    companyName: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        try {
          const response = await getCustomer(Number(id));
          setInitialValues(response.data);
        } catch (error) {
          console.error('Failed to fetch customer:', error);
          navigate('/customers');
        }
      }
    };

    fetchCustomer();
  }, [id, navigate]);

  const handleSubmit = async (values: Partial<Customer>) => {
    try {
      if (id) {
        await updateCustomer(Number(id), values as Customer);
      } else {
        await createCustomer(values as Omit<Customer, 'id'>);
      }
      navigate('/customers');
    } catch (error) {
      console.error('Failed to save customer:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Customer' : 'Create New Customer'}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="companyName"
                  label="Company Name"
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="contactPerson"
                  label="Contact Person"
                  value={values.contactPerson}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contactPerson && Boolean(errors.contactPerson)}
                  helperText={touched.contactPerson && errors.contactPerson}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  multiline
                  rows={3}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/customers')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Save Changes' : 'Create Customer'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default CustomerForm; 