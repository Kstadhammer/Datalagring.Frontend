using System.ComponentModel.DataAnnotations;

namespace Datalagring.Web.Models;

public class ProjectManagerViewModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "First name is required")]
    [Display(Name = "First Name")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "Last name is required")]
    [Display(Name = "Last Name")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    [Display(Name = "Email")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Phone number is required")]
    [Phone(ErrorMessage = "Invalid phone number")]
    [Display(Name = "Phone Number")]
    public string PhoneNumber { get; set; } = null!;

    [Display(Name = "Full Name")]
    public string FullName => $"{FirstName} {LastName}";
}
