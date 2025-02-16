namespace Datalagring.Console.Models;

public class Customer
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = null!;
    public string ContactPerson { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string? Address { get; set; }
}
