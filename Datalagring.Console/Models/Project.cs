namespace Datalagring.Console.Models;

public class Project
{
    public string ProjectNumber { get; set; } = null!;
    public string Name { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string ProjectManager { get; set; } = null!;
    public string Customer { get; set; } = null!;
    public string Service { get; set; } = null!;
    public decimal TotalPrice { get; set; }
    public ProjectStatus Status { get; set; }
}

public enum ProjectStatus
{
    NotStarted,
    InProgress,
    Completed,
}
