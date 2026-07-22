namespace SafeX.Application.DTOs;

public class DashboardSummaryDto
{
    public int TotalVideos { get; set; }
    public int KidsVideos { get; set; }
    public int GeneralVideos { get; set; }
    public int PublishedVideos { get; set; }
    public int PendingRecommendations { get; set; }
    public int Users { get; set; }
    public int Categories { get; set; }
}

public class WeeklyUploadPointDto
{
    public string WeekLabel { get; set; } = string.Empty;
    public int UploadCount { get; set; }
}

public class CategoryStatDto
{
    public string CategoryName { get; set; } = string.Empty;
    public int VideoCount { get; set; }
}

public class ActivityLogDto
{
    public string UserName { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}

public class DashboardResponseDto
{
    public DashboardSummaryDto Summary { get; set; } = new();
    public List<WeeklyUploadPointDto> WeeklyUploads { get; set; } = new();
    public List<CategoryStatDto> VideosByCategory { get; set; } = new();
    public List<ActivityLogDto> RecentActivities { get; set; } = new();
}
