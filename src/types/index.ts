export interface Project {
    projectNumber: string;
    name: string;
    startDate: string;
    endDate: string;
    projectManager: string;
    customer: string;
    service: string;
    totalPrice: number;
    status: ProjectStatus;
}

export enum ProjectStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Completed = "Completed"
}

export interface Customer {
    id: number;
    companyName: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    address?: string;
}

export interface ProjectManager {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    fullName: string;
} 