using Datalagring.Console.Models;
using Datalagring.Console.Services;

namespace Datalagring.Console.UI;

public class MenuManager
{
    private readonly ProjectService _projectService;
    private readonly CustomerService _customerService;
    private readonly ProjectManagerService _managerService;

    public MenuManager(
        ProjectService projectService,
        CustomerService customerService,
        ProjectManagerService managerService
    )
    {
        _projectService = projectService;
        _customerService = customerService;
        _managerService = managerService;
    }

    public async Task ShowProjectMenu()
    {
        while (true)
        {
            System.Console.Clear();
            System.Console.WriteLine("=== Projects ===\n");
            System.Console.WriteLine("1. List All Projects");
            System.Console.WriteLine("2. View Project Details");
            System.Console.WriteLine("3. Create New Project");
            System.Console.WriteLine("4. Edit Project");
            System.Console.WriteLine("0. Back to Main Menu");
            System.Console.Write("\nSelect an option: ");

            if (int.TryParse(System.Console.ReadLine(), out int choice))
            {
                switch (choice)
                {
                    case 1:
                        await ListProjects();
                        break;
                    case 2:
                        await ViewProjectDetails();
                        break;
                    case 3:
                        await CreateProject();
                        break;
                    case 4:
                        await EditProject();
                        break;
                    case 0:
                        return;
                    default:
                        System.Console.WriteLine("\nInvalid option. Press any key to continue...");
                        System.Console.ReadKey();
                        break;
                }
            }
        }
    }

    public async Task ShowCustomerMenu()
    {
        while (true)
        {
            System.Console.Clear();
            System.Console.WriteLine("=== Customers ===\n");
            System.Console.WriteLine("1. List All Customers");
            System.Console.WriteLine("2. View Customer Details");
            System.Console.WriteLine("3. Create New Customer");
            System.Console.WriteLine("4. Edit Customer");
            System.Console.WriteLine("0. Back to Main Menu");
            System.Console.Write("\nSelect an option: ");

            if (int.TryParse(System.Console.ReadLine(), out int choice))
            {
                switch (choice)
                {
                    case 1:
                        await ListCustomers();
                        break;
                    case 2:
                        await ViewCustomerDetails();
                        break;
                    case 3:
                        await CreateCustomer();
                        break;
                    case 4:
                        await EditCustomer();
                        break;
                    case 0:
                        return;
                    default:
                        System.Console.WriteLine("\nInvalid option. Press any key to continue...");
                        System.Console.ReadKey();
                        break;
                }
            }
        }
    }

    public async Task ShowProjectManagerMenu()
    {
        while (true)
        {
            System.Console.Clear();
            System.Console.WriteLine("=== Project Managers ===\n");
            System.Console.WriteLine("1. List All Project Managers");
            System.Console.WriteLine("2. View Project Manager Details");
            System.Console.WriteLine("3. Create New Project Manager");
            System.Console.WriteLine("4. Edit Project Manager");
            System.Console.WriteLine("0. Back to Main Menu");
            System.Console.Write("\nSelect an option: ");

            if (int.TryParse(System.Console.ReadLine(), out int choice))
            {
                switch (choice)
                {
                    case 1:
                        await ListProjectManagers();
                        break;
                    case 2:
                        await ViewProjectManagerDetails();
                        break;
                    case 3:
                        await CreateProjectManager();
                        break;
                    case 4:
                        await EditProjectManager();
                        break;
                    case 0:
                        return;
                    default:
                        System.Console.WriteLine("\nInvalid option. Press any key to continue...");
                        System.Console.ReadKey();
                        break;
                }
            }
        }
    }

    // Project Methods
    private async Task ListProjects()
    {
        var projects = await _projectService.GetAllProjects();
        System.Console.Clear();
        System.Console.WriteLine("=== Project List ===\n");

        if (!projects.Any())
        {
            System.Console.WriteLine("No projects found.");
        }
        else
        {
            foreach (var project in projects)
            {
                System.Console.WriteLine($"Project Number: {project.ProjectNumber}");
                System.Console.WriteLine($"Name: {project.Name}");
                System.Console.WriteLine($"Status: {project.Status}");
                System.Console.WriteLine("------------------------");
            }
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task ViewProjectDetails()
    {
        System.Console.Write("\nEnter Project Number: ");
        var projectNumber = System.Console.ReadLine();

        if (string.IsNullOrWhiteSpace(projectNumber))
        {
            System.Console.WriteLine("Invalid project number.");
            return;
        }

        var project = await _projectService.GetProject(projectNumber);
        if (project != null)
        {
            System.Console.Clear();
            System.Console.WriteLine($"Project Number: {project.ProjectNumber}");
            System.Console.WriteLine($"Name: {project.Name}");
            System.Console.WriteLine($"Start Date: {project.StartDate:yyyy-MM-dd}");
            System.Console.WriteLine($"End Date: {project.EndDate:yyyy-MM-dd}");
            System.Console.WriteLine($"Project Manager: {project.ProjectManager}");
            System.Console.WriteLine($"Customer: {project.Customer}");
            System.Console.WriteLine($"Service: {project.Service}");
            System.Console.WriteLine($"Total Price: {project.TotalPrice:C}");
            System.Console.WriteLine($"Status: {project.Status}");
        }
        else
        {
            System.Console.WriteLine("Project not found.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task CreateProject()
    {
        var project = new Project
        {
            StartDate = DateTime.Now,
            EndDate = DateTime.Now.AddMonths(1),
            Status = ProjectStatus.NotStarted,
        };

        System.Console.Clear();
        System.Console.WriteLine("=== Create New Project ===\n");

        System.Console.Write("Project Name: ");
        project.Name = System.Console.ReadLine() ?? "";

        System.Console.Write("Project Manager: ");
        project.ProjectManager = System.Console.ReadLine() ?? "";

        System.Console.Write("Customer: ");
        project.Customer = System.Console.ReadLine() ?? "";

        System.Console.Write("Service: ");
        project.Service = System.Console.ReadLine() ?? "";

        System.Console.Write("Total Price: ");
        if (decimal.TryParse(System.Console.ReadLine(), out decimal price))
        {
            project.TotalPrice = price;
        }

        if (await _projectService.CreateProject(project))
        {
            System.Console.WriteLine("\nProject created successfully!");
        }
        else
        {
            System.Console.WriteLine("\nFailed to create project.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task EditProject()
    {
        System.Console.Write("\nEnter Project Number to edit: ");
        var projectNumber = System.Console.ReadLine();

        if (string.IsNullOrWhiteSpace(projectNumber))
        {
            System.Console.WriteLine("Invalid project number.");
            return;
        }

        var project = await _projectService.GetProject(projectNumber);
        if (project == null)
        {
            System.Console.WriteLine("Project not found.");
            System.Console.ReadKey();
            return;
        }

        System.Console.Clear();
        System.Console.WriteLine($"=== Edit Project {project.ProjectNumber} ===\n");

        System.Console.Write($"Project Name [{project.Name}]: ");
        var input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            project.Name = input;

        System.Console.Write($"Project Manager [{project.ProjectManager}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            project.ProjectManager = input;

        System.Console.Write($"Customer [{project.Customer}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            project.Customer = input;

        System.Console.Write($"Service [{project.Service}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            project.Service = input;

        System.Console.Write($"Total Price [{project.TotalPrice}]: ");
        input = System.Console.ReadLine();
        if (decimal.TryParse(input, out decimal price))
            project.TotalPrice = price;

        System.Console.WriteLine("\nStatus:");
        System.Console.WriteLine("1. Not Started");
        System.Console.WriteLine("2. In Progress");
        System.Console.WriteLine("3. Completed");
        System.Console.Write($"Select status [{(int)project.Status + 1}]: ");
        if (
            int.TryParse(System.Console.ReadLine(), out int statusChoice)
            && statusChoice >= 1
            && statusChoice <= 3
        )
            project.Status = (ProjectStatus)(statusChoice - 1);

        if (await _projectService.UpdateProject(projectNumber, project))
        {
            System.Console.WriteLine("\nProject updated successfully!");
        }
        else
        {
            System.Console.WriteLine("\nFailed to update project.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    // Customer Methods
    private async Task ListCustomers()
    {
        var customers = await _customerService.GetAllCustomers();
        System.Console.Clear();
        System.Console.WriteLine("=== Customer List ===\n");

        if (!customers.Any())
        {
            System.Console.WriteLine("No customers found.");
        }
        else
        {
            foreach (var customer in customers)
            {
                System.Console.WriteLine($"ID: {customer.Id}");
                System.Console.WriteLine($"Company: {customer.CompanyName}");
                System.Console.WriteLine($"Contact: {customer.ContactPerson}");
                System.Console.WriteLine("------------------------");
            }
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task ViewCustomerDetails()
    {
        System.Console.Write("\nEnter Customer ID: ");
        if (!int.TryParse(System.Console.ReadLine(), out int id))
        {
            System.Console.WriteLine("Invalid ID.");
            return;
        }

        var customer = await _customerService.GetCustomer(id);
        if (customer != null)
        {
            System.Console.Clear();
            System.Console.WriteLine($"Company Name: {customer.CompanyName}");
            System.Console.WriteLine($"Contact Person: {customer.ContactPerson}");
            System.Console.WriteLine($"Email: {customer.Email}");
            System.Console.WriteLine($"Phone: {customer.PhoneNumber}");
            System.Console.WriteLine($"Address: {customer.Address}");
        }
        else
        {
            System.Console.WriteLine("Customer not found.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task CreateCustomer()
    {
        var customer = new Customer();

        System.Console.Clear();
        System.Console.WriteLine("=== Create New Customer ===\n");

        System.Console.Write("Company Name: ");
        customer.CompanyName = System.Console.ReadLine() ?? "";

        System.Console.Write("Contact Person: ");
        customer.ContactPerson = System.Console.ReadLine() ?? "";

        System.Console.Write("Email: ");
        customer.Email = System.Console.ReadLine() ?? "";

        System.Console.Write("Phone Number: ");
        customer.PhoneNumber = System.Console.ReadLine() ?? "";

        System.Console.Write("Address: ");
        customer.Address = System.Console.ReadLine();

        if (await _customerService.CreateCustomer(customer))
        {
            System.Console.WriteLine("\nCustomer created successfully!");
        }
        else
        {
            System.Console.WriteLine("\nFailed to create customer.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task EditCustomer()
    {
        System.Console.Write("\nEnter Customer ID to edit: ");
        if (!int.TryParse(System.Console.ReadLine(), out int id))
        {
            System.Console.WriteLine("Invalid ID.");
            return;
        }

        var customer = await _customerService.GetCustomer(id);
        if (customer == null)
        {
            System.Console.WriteLine("Customer not found.");
            System.Console.ReadKey();
            return;
        }

        System.Console.Clear();
        System.Console.WriteLine($"=== Edit Customer {customer.Id} ===\n");

        System.Console.Write($"Company Name [{customer.CompanyName}]: ");
        var input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            customer.CompanyName = input;

        System.Console.Write($"Contact Person [{customer.ContactPerson}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            customer.ContactPerson = input;

        System.Console.Write($"Email [{customer.Email}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            customer.Email = input;

        System.Console.Write($"Phone Number [{customer.PhoneNumber}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            customer.PhoneNumber = input;

        System.Console.Write($"Address [{customer.Address}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            customer.Address = input;

        if (await _customerService.UpdateCustomer(id, customer))
        {
            System.Console.WriteLine("\nCustomer updated successfully!");
        }
        else
        {
            System.Console.WriteLine("\nFailed to update customer.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    // Project Manager Methods
    private async Task ListProjectManagers()
    {
        var managers = await _managerService.GetAllProjectManagers();
        System.Console.Clear();
        System.Console.WriteLine("=== Project Manager List ===\n");

        if (!managers.Any())
        {
            System.Console.WriteLine("No project managers found.");
        }
        else
        {
            foreach (var manager in managers)
            {
                System.Console.WriteLine($"ID: {manager.Id}");
                System.Console.WriteLine($"Name: {manager.FullName}");
                System.Console.WriteLine($"Email: {manager.Email}");
                System.Console.WriteLine("------------------------");
            }
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task ViewProjectManagerDetails()
    {
        System.Console.Write("\nEnter Project Manager ID: ");
        if (!int.TryParse(System.Console.ReadLine(), out int id))
        {
            System.Console.WriteLine("Invalid ID.");
            return;
        }

        var manager = await _managerService.GetProjectManager(id);
        if (manager != null)
        {
            System.Console.Clear();
            System.Console.WriteLine($"Name: {manager.FullName}");
            System.Console.WriteLine($"Email: {manager.Email}");
            System.Console.WriteLine($"Phone: {manager.PhoneNumber}");
        }
        else
        {
            System.Console.WriteLine("Project manager not found.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task CreateProjectManager()
    {
        var manager = new ProjectManager();

        System.Console.Clear();
        System.Console.WriteLine("=== Create New Project Manager ===\n");

        System.Console.Write("First Name: ");
        manager.FirstName = System.Console.ReadLine() ?? "";

        System.Console.Write("Last Name: ");
        manager.LastName = System.Console.ReadLine() ?? "";

        System.Console.Write("Email: ");
        manager.Email = System.Console.ReadLine() ?? "";

        System.Console.Write("Phone Number: ");
        manager.PhoneNumber = System.Console.ReadLine() ?? "";

        if (await _managerService.CreateProjectManager(manager))
        {
            System.Console.WriteLine("\nProject manager created successfully!");
        }
        else
        {
            System.Console.WriteLine("\nFailed to create project manager.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }

    private async Task EditProjectManager()
    {
        System.Console.Write("\nEnter Project Manager ID to edit: ");
        if (!int.TryParse(System.Console.ReadLine(), out int id))
        {
            System.Console.WriteLine("Invalid ID.");
            return;
        }

        var manager = await _managerService.GetProjectManager(id);
        if (manager == null)
        {
            System.Console.WriteLine("Project manager not found.");
            System.Console.ReadKey();
            return;
        }

        System.Console.Clear();
        System.Console.WriteLine($"=== Edit Project Manager {manager.Id} ===\n");

        System.Console.Write($"First Name [{manager.FirstName}]: ");
        var input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            manager.FirstName = input;

        System.Console.Write($"Last Name [{manager.LastName}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            manager.LastName = input;

        System.Console.Write($"Email [{manager.Email}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            manager.Email = input;

        System.Console.Write($"Phone Number [{manager.PhoneNumber}]: ");
        input = System.Console.ReadLine();
        if (!string.IsNullOrWhiteSpace(input))
            manager.PhoneNumber = input;

        if (await _managerService.UpdateProjectManager(id, manager))
        {
            System.Console.WriteLine("\nProject manager updated successfully!");
        }
        else
        {
            System.Console.WriteLine("\nFailed to update project manager.");
        }

        System.Console.WriteLine("\nPress any key to continue...");
        System.Console.ReadKey();
    }
}
