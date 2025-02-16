# Datalagring Frontend

This repository contains the frontend applications for the Datalagring project, which includes both a Console Application and a React Web Application for managing projects, customers, and project managers.

## Project Structure

The solution consists of two main projects:

1. **Datalagring.Console**: A .NET Console application that provides a command-line interface for managing:
   - Projects
   - Customers
   - Project Managers

2. **Datalagring.React**: A React web application with Material-UI that provides a modern web interface for the same functionality.

## Prerequisites

- .NET 7.0 or later
- Node.js and npm (for the React application)
- API running at `https://localhost:7001`

## Getting Started

### Console Application

1. Navigate to the Datalagring.Console directory
2. Run the application:
   ```bash
   dotnet run
   ```

### React Application

1. Navigate to the Datalagring.React directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Features

Both applications provide the following functionality:

- **Project Management**
  - View all projects
  - View project details
  - Create new projects
  - Edit existing projects
  - Track project status

- **Customer Management**
  - View all customers
  - View customer details
  - Create new customers
  - Edit customer information

- **Project Manager Management**
  - View all project managers
  - View project manager details
  - Create new project managers
  - Edit project manager information

## API Integration

Both applications communicate with a backend API running at `https://localhost:7001`. Make sure the API is running before using either frontend application.
