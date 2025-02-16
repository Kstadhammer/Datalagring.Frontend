import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { ProjectManager } from '../../types';

const ManagerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [manager, setManager] = useState<Partial<ProjectManager>>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchManager = async () => {
      if (id) {
        try {
          const response = await fetch(`https://localhost:7001/api/projectmanagers/${id}`);
          const data = await response.json();
          setManager(data);
        } catch (error) {
          console.error('Error fetching manager:', error);
        }
      }
    };

    fetchManager();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = id 
        ? `https://localhost:7001/api/projectmanagers/${id}`
        : 'https://localhost:7001/api/projectmanagers';
      
      await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manager),
      });

      navigate('/managers');
    } catch (error) {
      console.error('Error saving manager:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Manager' : 'New Manager'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          value={manager.firstName}
          onChange={(e) => setManager({ ...manager, firstName: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          value={manager.lastName}
          onChange={(e) => setManager({ ...manager, lastName: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={manager.email}
          onChange={(e) => setManager({ ...manager, email: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          value={manager.phoneNumber}
          onChange={(e) => setManager({ ...manager, phoneNumber: e.target.value })}
          margin="normal"
          required
        />
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/managers')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {id ? 'Save Changes' : 'Create Manager'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ManagerForm; 