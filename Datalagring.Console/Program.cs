// See https://aka.ms/new-console-template for more information

using Datalagring.Console.Services;
using Datalagring.Console.UI;

var menuManager = new MenuManager(
    new ProjectService(),
    new CustomerService(),
    new ProjectManagerService()
);

while (true)
{
    System.Console.Clear();
    System.Console.WriteLine("=== Mattin-Lassei Group AB - Project Management System ===\n");
    System.Console.WriteLine("1. Projects");
    System.Console.WriteLine("2. Customers");
    System.Console.WriteLine("3. Project Managers");
    System.Console.WriteLine("0. Exit");
    System.Console.Write("\nSelect an option: ");

    if (int.TryParse(System.Console.ReadLine(), out int choice))
    {
        switch (choice)
        {
            case 1:
                await menuManager.ShowProjectMenu();
                break;
            case 2:
                await menuManager.ShowCustomerMenu();
                break;
            case 3:
                await menuManager.ShowProjectManagerMenu();
                break;
            case 0:
                System.Console.WriteLine("\nGoodbye!");
                return;
            default:
                System.Console.WriteLine("\nInvalid option. Press any key to continue...");
                System.Console.ReadKey();
                break;
        }
    }
    else
    {
        System.Console.WriteLine("\nInvalid input. Press any key to continue...");
        System.Console.ReadKey();
    }
}
