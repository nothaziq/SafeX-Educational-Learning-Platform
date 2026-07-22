using Microsoft.EntityFrameworkCore;
using SafeX.Application.DTOs;
using SafeX.Application.Interfaces;
using SafeX.Domain.Entities;
using SafeX.Infrastructure.Data;

namespace SafeX.Infrastructure.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly SafeXDbContext _context;

    public DashboardRepository(SafeXDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync()
    {
        return new DashboardSummaryDto
        {
            TotalVideos = await _context.Videos.CountAsync(v => v.Status != VideoStatus.Deleted),
            KidsVideos = await _context.Videos.CountAsync(v => v.IsKidsVideo && v.Status != VideoStatus.Deleted),
            GeneralVideos = await _context.Videos.CountAsync(v => !v.IsKidsVideo && v.Status != VideoStatus.Deleted),
            PublishedVideos = await _context.Videos.CountAsync(v => v.Status == VideoStatus.Published),
            PendingRecommendations = await _context.Recommendations.CountAsync(r => r.Status == RecommendationStatus.Pending),
            Users = await _context.Users.CountAsync(),
            Categories = await _context.Categories.CountAsync(c => c.IsActive)
        };
    }

    public async Task<List<WeeklyUploadPointDto>> GetWeeklyUploadsAsync(int weeks = 8)
    {
        var startDate = DateTime.UtcNow.Date.AddDays(-7 * weeks);

        var uploads = await _context.Videos
            .Where(v => v.CreatedAt >= startDate)
            .ToListAsync();

        return uploads
            .GroupBy(v => ISOWeekOf(v.CreatedAt))
            .OrderBy(g => g.Key)
            .Select(g => new WeeklyUploadPointDto
            {
                WeekLabel = $"Wk {System.Globalization.ISOWeek.GetWeekOfYear(g.First().CreatedAt)}",
                UploadCount = g.Count()
            })
            .ToList();
    }

    public async Task<List<CategoryStatDto>> GetVideosByCategoryAsync()
    {
        return await _context.Videos
            .Where(v => v.Status != VideoStatus.Deleted)
            .Join(_context.Categories, v => v.CategoryId, c => c.Id, (v, c) => c.Name)
            .GroupBy(name => name)
            .Select(g => new CategoryStatDto { CategoryName = g.Key, VideoCount = g.Count() })
            .OrderByDescending(x => x.VideoCount)
            .ToListAsync();
    }

    public async Task<List<ActivityLogDto>> GetRecentActivitiesAsync(int count = 10)
    {
        return await _context.ActivityLogs
            .OrderByDescending(a => a.Timestamp)
            .Take(count)
            .Join(_context.Users, a => a.UserId, u => u.Id, (a, u) => new ActivityLogDto
            {
                UserName = u.UserName ?? "Unknown",
                Action = a.Action,
                Timestamp = a.Timestamp
            })
            .ToListAsync();
    }

    private static DateTime ISOWeekOf(DateTime date) =>
        date.Date.AddDays(-(int)(date.DayOfWeek == DayOfWeek.Sunday ? 6 : (int)date.DayOfWeek - 1));
}
