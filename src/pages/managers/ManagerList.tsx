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
import { ProjectManager } from '../../types';
import { getProjectManagers } from '../../services/api';

const ManagerList = () => {
  const navigate = useNavigate();
  const [managers, setManagers] = useState<ProjectManager[]>([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await getProjectManagers();
        setManagers(response.data);
      } catch (error) {
        console.error('Failed to fetch project managers:', error);
      }
    };

    fetchManagers();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Project Managers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/managers/new')}
        >
          New Manager
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map((manager) => (
              <TableRow key={manager.id}>
                <TableCell>{manager.fullName}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>{manager.phoneNumber}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/managers/edit/${manager.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      startIcon={<InfoIcon />}
                      onClick={() => navigate(`/managers/${manager.id}`)}
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

export default ManagerList; 