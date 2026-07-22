namespace SafeX.Domain.Entities;

public enum AccountType { Kids, General, Admin }
public enum VideoStatus { PendingReview, Published, Rejected, Deleted }
public enum RecommendationStatus { Pending, Approved, Rejected }

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int? ParentCategoryId { get; set; }
    public bool IsKidsCategory { get; set; }
    public bool IsActive { get; set; } = true;
}

public class Video
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string YouTubeVideoId { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public bool IsKidsVideo { get; set; }
    public VideoStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? PublishedAt { get; set; }
}

public class Recommendation
{
    public int Id { get; set; }
    public int VideoId { get; set; }
    public string RecommendedByUserId { get; set; } = string.Empty;
    public RecommendationStatus Status { get; set; }
    public DateTime SubmittedAt { get; set; }
}

public class ActivityLog
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string? Details { get; set; }
    public DateTime Timestamp { get; set; }
}
