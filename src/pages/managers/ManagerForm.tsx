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
import { ProjectManager } from '../../types';
import { createProjectManager, updateProjectManager, getProjectManager } from '../../services/api';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
      'Invalid phone number'
    ),
});

const ManagerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<Partial<ProjectManager>>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchManager = async () => {
      if (id) {
        try {
          const response = await getProjectManager(Number(id));
          setInitialValues(response.data);
        } catch (error) {
          console.error('Failed to fetch project manager:', error);
          navigate('/managers');
        }
      }
    };

    fetchManager();
  }, [id, navigate]);

  const handleSubmit = async (values: Partial<ProjectManager>) => {
    try {
      if (id) {
        await updateProjectManager(Number(id), values as Omit<ProjectManager, 'fullName'>);
      } else {
        await createProjectManager(values as Omit<ProjectManager, 'id' | 'fullName'>);
      }
      navigate('/managers');
    } catch (error) {
      console.error('Failed to save project manager:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Project Manager' : 'Create New Project Manager'}
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
                  name="firstName"
                  label="First Name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
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
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/managers')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Save Changes' : 'Create Manager'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default ManagerForm; 