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
  Chip,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Info as InfoIcon } from '@mui/icons-material';
import { Project, ProjectStatus } from '../../types';
import { getProjects } from '../../services/api';

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.NotStarted:
      return 'default';
    case ProjectStatus.InProgress:
      return 'primary';
    case ProjectStatus.Completed:
      return 'success';
    default:
      return 'default';
  }
};

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Projects
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/projects/new')}
        >
          New Project
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.projectNumber}>
                <TableCell>{project.projectNumber}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/projects/edit/${project.projectNumber}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      startIcon={<InfoIcon />}
                      onClick={() => navigate(`/projects/${project.projectNumber}`)}
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

export default ProjectList; 