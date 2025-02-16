using System.ComponentModel.DataAnnotations;

namespace Datalagring.Web.Models;

public class CustomerViewModel
{
    public int Id { get; set; }

    [Required(ErrorMessage = "Company name is required")]
    [Display(Name = "Company Name")]
    public string CompanyName { get; set; } = null!;

    [Required(ErrorMessage = "Contact person is required")]
    [Display(Name = "Contact Person")]
    public string ContactPerson { get; set; } = null!;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    [Display(Name = "Email")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "Phone number is required")]
    [Phone(ErrorMessage = "Invalid phone number")]
    [Display(Name = "Phone Number")]
    public string PhoneNumber { get; set; } = null!;

    [Display(Name = "Address")]
    public string? Address { get; set; }
}
