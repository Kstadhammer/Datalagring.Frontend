import axios from 'axios';
import { Project, Customer, ProjectManager } from '../types';

const API_BASE_URL = 'https://localhost:7001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Projects
export const getProjects = () => api.get<Project[]>('/projects');
export const getProject = (id: string) => api.get<Project>(`/projects/${id}`);
export const createProject = (project: Omit<Project, 'projectNumber'>) => api.post<Project>('/projects', project);
export const updateProject = (id: string, project: Project) => api.put<Project>(`/projects/${id}`, project);

// Customers
export const getCustomers = () => api.get<Customer[]>('/customers');
export const getCustomer = (id: number) => api.get<Customer>(`/customers/${id}`);
export const createCustomer = (customer: Omit<Customer, 'id'>) => api.post<Customer>('/customers', customer);
export const updateCustomer = (id: number, customer: Customer) => api.put<Customer>(`/customers/${id}`, customer);

// Project Managers
export const getProjectManagers = () => api.get<ProjectManager[]>('/projectmanagers');
export const getProjectManager = (id: number) => api.get<ProjectManager>(`/projectmanagers/${id}`);
export const createProjectManager = (manager: Omit<ProjectManager, 'id' | 'fullName'>) => 
    api.post<ProjectManager>('/projectmanagers', manager);
export const updateProjectManager = (id: number, manager: Omit<ProjectManager, 'fullName'>) => 
    api.put<ProjectManager>(`/projectmanagers/${id}`, manager);

export default api; 