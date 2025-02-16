using System.Net.Http.Json;
using Datalagring.Console.Models;

namespace Datalagring.Console.Services;

public class ProjectService
{
    private readonly HttpClient _httpClient;
    private const string BaseUrl = "https://localhost:7001/api/projects";

    public ProjectService()
    {
        _httpClient = new HttpClient { BaseAddress = new Uri("https://localhost:7001/") };
    }

    public async Task<List<Project>> GetAllProjects()
    {
        try
        {
            var response = await _httpClient.GetFromJsonAsync<List<Project>>(BaseUrl);
            return response ?? new List<Project>();
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error fetching projects: {ex.Message}");
            return new List<Project>();
        }
    }

    public async Task<Project?> GetProject(string projectNumber)
    {
        try
        {
            return await _httpClient.GetFromJsonAsync<Project>($"{BaseUrl}/{projectNumber}");
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error fetching project: {ex.Message}");
            return null;
        }
    }

    public async Task<bool> CreateProject(Project project)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(BaseUrl, project);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error creating project: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> UpdateProject(string projectNumber, Project project)
    {
        try
        {
            var response = await _httpClient.PutAsJsonAsync($"{BaseUrl}/{projectNumber}", project);
            return response.IsSuccessStatusCode;
        }
        catch (Exception ex)
        {
            System.Console.WriteLine($"Error updating project: {ex.Message}");
            return false;
        }
    }
}
