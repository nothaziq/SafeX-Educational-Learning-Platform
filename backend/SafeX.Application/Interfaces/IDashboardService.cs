using SafeX.Application.DTOs;

namespace SafeX.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardResponseDto> GetDashboardAsync();
    Task<List<WeeklyUploadPointDto>> GetWeeklyUploadsAsync(int weeks);
    Task<List<ActivityLogDto>> GetRecentActivitiesAsync(int count);
}
