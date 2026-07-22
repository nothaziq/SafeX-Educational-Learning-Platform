using SafeX.Application.DTOs;

namespace SafeX.Application.Interfaces;

public interface IDashboardRepository
{
    Task<DashboardSummaryDto> GetSummaryAsync();
    Task<List<WeeklyUploadPointDto>> GetWeeklyUploadsAsync(int weeks = 8);
    Task<List<CategoryStatDto>> GetVideosByCategoryAsync();
    Task<List<ActivityLogDto>> GetRecentActivitiesAsync(int count = 10);
}
