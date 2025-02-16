using Datalagring.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Datalagring.Web.Controllers;

public class CustomerController : Controller
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public CustomerController(IConfiguration configuration)
    {
        _configuration = configuration;
        _httpClient = new HttpClient
        {
            BaseAddress = new Uri(_configuration["ApiBaseUrl"] ?? "https://localhost:7001/"),
        };
    }

    // GET: Customer
    public async Task<IActionResult> Index()
    {
        try
        {
            var customers = await _httpClient.GetFromJsonAsync<List<CustomerViewModel>>(
                "api/customers"
            );
            return View(customers);
        }
        catch (Exception)
        {
            return View(new List<CustomerViewModel>());
        }
    }

    // GET: Customer/Details/5
    public async Task<IActionResult> Details(int id)
    {
        try
        {
            var customer = await _httpClient.GetFromJsonAsync<CustomerViewModel>(
                $"api/customers/{id}"
            );
            if (customer == null)
            {
                return NotFound();
            }
            return View(customer);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    // GET: Customer/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Customer/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CustomerViewModel customer)
    {
        if (ModelState.IsValid)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("api/customers", customer);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Unable to create customer. Please try again.");
            }
        }
        return View(customer);
    }

    // GET: Customer/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        try
        {
            var customer = await _httpClient.GetFromJsonAsync<CustomerViewModel>(
                $"api/customers/{id}"
            );
            if (customer == null)
            {
                return NotFound();
            }
            return View(customer);
        }
        catch (Exception)
        {
            return NotFound();
        }
    }

    // POST: Customer/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, CustomerViewModel customer)
    {
        if (id != customer.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                var response = await _httpClient.PutAsJsonAsync($"api/customers/{id}", customer);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "Unable to update customer. Please try again.");
            }
        }
        return View(customer);
    }
}
