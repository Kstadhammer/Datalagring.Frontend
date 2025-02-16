using System.Net.Http.Json;
using Datalagring.Console.Models;

namespace Datalagring.Console.Services;

public class CustomerService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://localhost:7001/api/customers";

    public CustomerService()
    {
        _httpClient = new HttpClient { BaseAddress = new Uri("https://localhost:7001/") };
    }

    public async Task<List<Customer>> GetAllCustomers()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<List<Customer>>(BaseUrl);
            return response ?? new List<Customer>();
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error fetching customers: {ex.Message}");
            return new List<Customer>();
        }
    }

    public async Task<Customer?> GetCustomer(int id)
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<Customer>($"{BaseUrl}/{id}");
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error fetching customer: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> CreateCustomer(Customer customer)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(BaseUrl, customer);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error creating customer: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> UpdateCustomer(int id, Customer customer)
    {
        try
        {
            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/{id}", customer);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error updating customer: {ex.Message}");
            return false;
        }
    }
}
