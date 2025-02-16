import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Layout from './components/Layout';
import ProjectList from './pages/projects/ProjectList';
import ProjectForm from './pages/projects/ProjectForm';
import CustomerList from './pages/customers/CustomerList';
import CustomerForm from './pages/customers/CustomerForm';
import ManagerList from './pages/managers/ManagerList';
import ManagerForm from './pages/managers/ManagerForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/new" element={<ProjectForm />} />
              <Route path="/projects/edit/:id" element={<ProjectForm />} />
              
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/customers/new" element={<CustomerForm />} />
              <Route path="/customers/edit/:id" element={<CustomerForm />} />
              
              <Route path="/managers" element={<ManagerList />} />
              <Route path="/managers/new" element={<ManagerForm />} />
              <Route path="/managers/edit/:id" element={<ManagerForm />} />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
