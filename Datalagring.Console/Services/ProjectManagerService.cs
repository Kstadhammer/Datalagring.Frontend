using System.Net.Http.Json;
using Datalagring.Console.Models;

namespace Datalagring.Console.Services;

public class ProjectManagerService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://localhost:7001/api/projectmanagers";

    public ProjectManagerService()
    {
        _httpClient = new HttpClient { BaseAddress = new Uri("https://localhost:7001/") };
    }

    public async Task<List<ProjectManager>> GetAllProjectManagers()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<List<ProjectManager>>(BaseUrl);
            return response ?? new List<ProjectManager>();
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error fetching project managers: {ex.Message}");
            return new List<ProjectManager>();
        }
    }

    public async Task<ProjectManager?> GetProjectManager(int id)
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<ProjectManager>($"{BaseUrl}/{id}");
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error fetching project manager: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> CreateProjectManager(ProjectManager manager)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(BaseUrl, manager);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error creating project manager: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> UpdateProjectManager(int id, ProjectManager manager)
    {
        try
        {
            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/{id}", manager);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error updating project manager: {ex.Message}");
            return false;
        }
    }
}
