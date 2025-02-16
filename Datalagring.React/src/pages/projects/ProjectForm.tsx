import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

interface Project {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<Project>({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    totalPrice: 0
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          // TODO: Implement fetch project
          const response = await fetch(`https://localhost:7001/api/projects/${id}`);
          const data = await response.json();
          setProject(data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = id 
        ? `https://localhost:7001/api/projects/${id}`
        : 'https://localhost:7001/api/projects';
      
      const method = id ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      navigate('/projects');
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Project' : 'New Project'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Project Name"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={project.startDate}
          onChange={(e) => setProject({ ...project, startDate: e.target.value })}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={project.endDate}
          onChange={(e) => setProject({ ...project, endDate: e.target.value })}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Total Price"
          type="number"
          value={project.totalPrice}
          onChange={(e) => setProject({ ...project, totalPrice: Number(e.target.value) })}
          margin="normal"
          required
        />
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/projects')}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {id ? 'Save Changes' : 'Create Project'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProjectForm; 