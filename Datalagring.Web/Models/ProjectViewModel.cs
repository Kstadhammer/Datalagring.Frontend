using System.ComponentModel.DataAnnotations;

namespace Datalagring.Web.Models;

public class ProjectViewModel
{
    public string ProjectNumber { get; set; } = null!;

    [Required(ErrorMessage = "Project name is required")]
    [Display(Name = "Project Name")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Start date is required")]
    [Display(Name = "Start Date")]
    [DataType(DataType.Date)]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "End date is required")]
    [Display(Name = "End Date")]
    [DataType(DataType.Date)]
    public DateTime EndDate { get; set; }

    [Required(ErrorMessage = "Project manager is required")]
    [Display(Name = "Project Manager")]
    public string ProjectManager { get; set; } = null!;

    [Required(ErrorMessage = "Customer is required")]
    [Display(Name = "Customer")]
    public string Customer { get; set; } = null!;

    [Required(ErrorMessage = "Service type is required")]
    [Display(Name = "Service")]
    public string Service { get; set; } = null!;

    [Required(ErrorMessage = "Total price is required")]
    [Display(Name = "Total Price")]
    [DataType(DataType.Currency)]
    public decimal TotalPrice { get; set; }

    [Required(ErrorMessage = "Status is required")]
    [Display(Name = "Project Status")]
    public ProjectStatus Status { get; set; }
}

public enum ProjectStatus
{
    NotStarted,
    InProgress,
    Completed,
}
