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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Project, ProjectStatus, Customer, ProjectManager } from '../../types';
import {
  createProject,
  updateProject,
  getProject,
  getCustomers,
  getProjectManagers,
} from '../../services/api';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Project name is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .required('End date is required')
    .min(Yup.ref('startDate'), 'End date must be after start date'),
  projectManager: Yup.string().required('Project manager is required'),
  customer: Yup.string().required('Customer is required'),
  service: Yup.string().required('Service is required'),
  totalPrice: Yup.number()
    .required('Total price is required')
    .min(0, 'Total price must be positive'),
  status: Yup.string().required('Status is required'),
});

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [managers, setManagers] = useState<ProjectManager[]>([]);
  const [initialValues, setInitialValues] = useState<Partial<Project>>({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    projectManager: '',
    customer: '',
    service: '',
    totalPrice: 0,
    status: ProjectStatus.NotStarted,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersResponse, managersResponse] = await Promise.all([
          getCustomers(),
          getProjectManagers(),
        ]);
        setCustomers(customersResponse.data);
        setManagers(managersResponse.data);

        if (id) {
          const projectResponse = await getProject(id);
          setInitialValues(projectResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (values: Partial<Project>) => {
    try {
      if (id) {
        await updateProject(id, values as Project);
      } else {
        await createProject(values as Omit<Project, 'projectNumber'>);
      }
      navigate('/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Project' : 'Create New Project'}
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Project Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Customer</InputLabel>
                  <Select
                    name="customer"
                    value={values.customer}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.customer && Boolean(errors.customer)}
                    label="Customer"
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.companyName}>
                        {customer.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Start Date"
                  value={values.startDate ? new Date(values.startDate) : null}
                  onChange={(date) =>
                    setFieldValue('startDate', date?.toISOString().split('T')[0])
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: touched.startDate && Boolean(errors.startDate),
                      helperText: touched.startDate && errors.startDate,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  value={values.endDate ? new Date(values.endDate) : null}
                  onChange={(date) =>
                    setFieldValue('endDate', date?.toISOString().split('T')[0])
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: touched.endDate && Boolean(errors.endDate),
                      helperText: touched.endDate && errors.endDate,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Project Manager</InputLabel>
                  <Select
                    name="projectManager"
                    value={values.projectManager}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.projectManager && Boolean(errors.projectManager)}
                    label="Project Manager"
                  >
                    {managers.map((manager) => (
                      <MenuItem key={manager.id} value={manager.fullName}>
                        {manager.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="service"
                  label="Service"
                  value={values.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.service && Boolean(errors.service)}
                  helperText={touched.service && errors.service}
                  placeholder="e.g. Consulting 1000 kr/h"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="totalPrice"
                  label="Total Price"
                  type="number"
                  value={values.totalPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.totalPrice && Boolean(errors.totalPrice)}
                  helperText={touched.totalPrice && errors.totalPrice}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.status && Boolean(errors.status)}
                    label="Status"
                  >
                    {Object.values(ProjectStatus).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/projects')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {id ? 'Save Changes' : 'Create Project'}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default ProjectForm; 