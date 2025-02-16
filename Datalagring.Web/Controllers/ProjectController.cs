using Datalagring.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Datalagring.Web.Controllers;

public class ProjectController : Controller
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ProjectController(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(_configuration["ApiBaseUrl"] ?? "https://localhost:7001/"),
        };
    }

    // GET: Project
    public async Task<IActionResult> Index()
    {
        try
        {
            var projects = await _httpClient.GetFromJsonAsync<List<ProjectViewModel>>(
                "api/projects"
            );
            return View(projects);
        }
        catch (Exception)
        {
            return View(new List<ProjectViewModel>());
        }
    }

    // GET: Project/Details/P-101
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var project = await _httpClient.GetFromJsonAsync<ProjectViewModel>(
                $"api/projects/{id}"
            );
            if (project == null)
            {
                return NotFound();
            }
            return View(project);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    // GET: Project/Create
    public async Task<IActionResult> Create()
    {
        await LoadFormDropdowns();
        return View();
    }

    // POST: Project/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ProjectViewModel project)
    {
        if (ModelState.IsValid)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("api/projects", project);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Unable to create project. Please try again.");
            }
        }
        await LoadFormDropdowns();
        return View(project);
    }

    // GET: Project/Edit/P-101
    public async Task<IActionResult> Edit(string id)
    {
        try
        {
            var project = await _httpClient.GetFromJsonAsync<ProjectViewModel>(
                $"api/projects/{id}"
            );
            if (project == null)
            {
                return NotFound();
            }
            await LoadFormDropdowns();
            return View(project);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    // POST: Project/Edit/P-101
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(string id, ProjectViewModel project)
    {
        if (id != project.ProjectNumber)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                var response = await _httpClient.PutAsJsonAsync($"api/projects/{id}", project);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Unable to update project. Please try again.");
            }
        }
        await LoadFormDropdowns();
        return View(project);
    }

    private async Task LoadFormDropdowns()
    {
        try
        {
            var customers = await _httpClient.GetFromJsonAsync<List<CustomerViewModel>>(
                "api/customers"
            );
            var managers = await _httpClient.GetFromJsonAsync<List<ProjectManagerViewModel>>(
                "api/projectmanagers"
            );

            if (customers != null)
            {
                ViewBag.Customers = new SelectList(customers, "CompanyName", "CompanyName");
            }

            if (managers != null)
            {
                ViewBag.ProjectManagers = new SelectList(managers, "FullName", "FullName");
            }
        }
        catch (Exception)
        {
            ViewBag.Customers = new SelectList(Enumerable.Empty<SelectListItem>());
            ViewBag.ProjectManagers = new SelectList(Enumerable.Empty<SelectListItem>());
        }
    }
}
