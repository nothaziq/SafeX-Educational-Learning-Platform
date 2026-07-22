using SafeX.Application.DTOs;
using SafeX.Application.Interfaces;

namespace SafeX.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _repository;

    public DashboardService(IDashboardRepository repository)
    {
        _repository = repository;
    }

    public async Task<DashboardResponseDto> GetDashboardAsync()
    {
        var summary = await _repository.GetSummaryAsync();
        var weeklyUploads = await _repository.GetWeeklyUploadsAsync();
        var categoryStats = await _repository.GetVideosByCategoryAsync();
        var recentActivities = await _repository.GetRecentActivitiesAsync();

        return new DashboardResponseDto
        {
            Summary = summary,
            WeeklyUploads = weeklyUploads,
            VideosByCategory = categoryStats,
            RecentActivities = recentActivities
        };
    }

    public Task<List<WeeklyUploadPointDto>> GetWeeklyUploadsAsync(int weeks) =>
        _repository.GetWeeklyUploadsAsync(weeks);

    public Task<List<ActivityLogDto>> GetRecentActivitiesAsync(int count) =>
        _repository.GetRecentActivitiesAsync(count);
}
