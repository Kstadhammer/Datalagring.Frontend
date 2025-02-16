using Datalagring.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Datalagring.Web.Controllers;

public class ProjectManagerController : Controller
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public ProjectManagerController(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(_configuration["ApiBaseUrl"] ?? "https://localhost:7001/"),
        };
    }

    // GET: ProjectManager
    public async Task<IActionResult> Index()
    {
        try
        {
            var managers = await _httpClient.GetFromJsonAsync<List<ProjectManagerViewModel>>(
                "api/projectmanagers"
            );
            return View(managers);
        }
        catch (Exception)
        {
            return View(new List<ProjectManagerViewModel>());
        }
    }

    // GET: ProjectManager/Details/5
    public async Task<IActionResult> Details(int id)
    {
        try
        {
            var manager = await _httpClient.GetFromJsonAsync<ProjectManagerViewModel>(
                $"api/projectmanagers/{id}"
            );
            if (manager == null)
            {
                return NotFound();
            }
            return View(manager);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    // GET: ProjectManager/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: ProjectManager/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ProjectManagerViewModel manager)
    {
        if (ModelState.IsValid)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("api/projectmanagers", manager);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Unable to create project manager. Please try again.");
            }
        }
        return View(manager);
    }

    // GET: ProjectManager/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        try
        {
            var manager = await _httpClient.GetFromJsonAsync<ProjectManagerViewModel>(
                $"api/projectmanagers/{id}"
            );
            if (manager == null)
            {
                return NotFound();
            }
            return View(manager);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    // POST: ProjectManager/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, ProjectManagerViewModel manager)
    {
        if (id != manager.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                var response = await _httpClient.PutAsJsonAsync(
                    $"api/projectmanagers/{id}",
                    manager
                );
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Unable to update project manager. Please try again.");
            }
        }
        return View(manager);
    }
}
