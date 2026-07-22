using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SafeX.Application.Interfaces;

namespace SafeX.API.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var result = await _dashboardService.GetDashboardAsync();
        return Ok(result);
    }

    [HttpGet("charts")]
    public async Task<IActionResult> GetWeeklyUploads([FromQuery] int weeks = 8)
    {
        var result = await _dashboardService.GetWeeklyUploadsAsync(weeks);
        return Ok(result);
    }

    [HttpGet("activity")]
    public async Task<IActionResult> GetRecentActivity([FromQuery] int count = 10)
    {
        var result = await _dashboardService.GetRecentActivitiesAsync(count);
        return Ok(result);
    }
}
