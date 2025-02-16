import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [projectsAnchor, setProjectsAnchor] = useState<null | HTMLElement>(null);
  const [customersAnchor, setCustomersAnchor] = useState<null | HTMLElement>(null);
  const [managersAnchor, setManagersAnchor] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}
          >
            Mattin-Lassei Group AB
          </Typography>

          {/* Projects Menu */}
          <Button
            color="inherit"
            onClick={(e) => setProjectsAnchor(e.currentTarget)}
          >
            Projects
          </Button>
          <Menu
            anchorEl={projectsAnchor}
            open={Boolean(projectsAnchor)}
            onClose={() => setProjectsAnchor(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/projects"
              onClick={() => setProjectsAnchor(null)}
            >
              View All Projects
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/projects/new"
              onClick={() => setProjectsAnchor(null)}
            >
              New Project
            </MenuItem>
          </Menu>

          {/* Customers Menu */}
          <Button
            color="inherit"
            onClick={(e) => setCustomersAnchor(e.currentTarget)}
          >
            Customers
          </Button>
          <Menu
            anchorEl={customersAnchor}
            open={Boolean(customersAnchor)}
            onClose={() => setCustomersAnchor(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/customers"
              onClick={() => setCustomersAnchor(null)}
            >
              View All Customers
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/customers/new"
              onClick={() => setCustomersAnchor(null)}
            >
              New Customer
            </MenuItem>
          </Menu>

          {/* Project Managers Menu */}
          <Button
            color="inherit"
            onClick={(e) => setManagersAnchor(e.currentTarget)}
          >
            Project Managers
          </Button>
          <Menu
            anchorEl={managersAnchor}
            open={Boolean(managersAnchor)}
            onClose={() => setManagersAnchor(null)}
          >
            <MenuItem
              component={RouterLink}
              to="/managers"
              onClick={() => setManagersAnchor(null)}
            >
              View All Managers
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/managers/new"
              onClick={() => setManagersAnchor(null)}
            >
              New Manager
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Mattin-Lassei Group AB - Project Management System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 