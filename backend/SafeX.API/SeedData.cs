using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SafeX.Domain.Entities;
using SafeX.Infrastructure.Data;

namespace SafeX.API;

/// <summary>
/// DEV/DEMO-ONLY seed data so the Dashboard has realistic, non-zero numbers
/// to show while Category/Video/Recommendation/Auth are owned by teammates
/// and not yet merged. Idempotent — safe to call on every startup.
///
/// Remove or gate this behind a stricter check once real modules are merged
/// and the DB is populated by the actual owners.
/// </summary>
public static class SeedData
{
    private static readonly Random Rng = new(12345); // fixed seed = repeatable demo data

    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var sp = scope.ServiceProvider;

        var db = sp.GetRequiredService<SafeXDbContext>();
        await db.Database.MigrateAsync();

        // Bail out if we've already seeded (categories are the cheapest check)
        if (await db.Categories.AnyAsync()) return;

        var roleManager = sp.GetRequiredService<RoleManager<IdentityRole>>();
        await SeedRolesAsync(roleManager);

        var userIds = await SeedUsersAsync(db);
        var categories = await SeedCategoriesAsync(db);
        var videos = await SeedVideosAsync(db, categories);
        await SeedRecommendationsAsync(db, videos, userIds);
        await SeedActivityLogsAsync(db, videos, userIds);
    }

    private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        foreach (var role in new[] { "Admin", "General", "Kids" })
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    private static async Task<List<string>> SeedUsersAsync(SafeXDbContext db)
    {
        var hasher = new PasswordHasher<IdentityUser>();
        var allIds = new List<string>();
        var toInsert = new List<IdentityUser>();

        // Dev-admin: same account DevAuthController expects, so /api/dev/token keeps working.
        // It may already exist (e.g. someone hit /api/dev/token before this seeder ran) —
        // reuse it instead of re-inserting, or SQL Server throws a duplicate-key error.
        var admin = await db.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == "DEV-ADMIN@SAFEX.LOCAL");
        if (admin is null)
        {
            admin = new IdentityUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "dev-admin@safex.local",
                NormalizedUserName = "DEV-ADMIN@SAFEX.LOCAL",
                Email = "dev-admin@safex.local",
                NormalizedEmail = "DEV-ADMIN@SAFEX.LOCAL",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("N"),
            };
            admin.PasswordHash = hasher.HashPassword(admin, "DevAdmin!2345");
            toInsert.Add(admin);
        }
        allIds.Add(admin.Id);

        // Bulk demo users — inserted directly (not via UserManager.CreateAsync in a loop,
        // which re-hashes per call and is too slow for a few hundred rows).
        const string sharedPassword = "DemoUser!2345"; // seed data only, never used for real auth
        var existingDemoNames = await db.Users
            .Where(u => u.NormalizedUserName != null && u.NormalizedUserName.StartsWith("DEMO.USER"))
            .Select(u => u.NormalizedUserName!)
            .ToListAsync();
        var existingDemoSet = existingDemoNames.ToHashSet();

        for (int i = 1; i <= 120; i++)
        {
            var normalized = $"DEMO.USER{i}@SAFEX.LOCAL";
            if (existingDemoSet.Contains(normalized)) continue; // already seeded in a previous run

            var user = new IdentityUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = $"demo.user{i}@safex.local",
                NormalizedUserName = normalized,
                Email = $"demo.user{i}@safex.local",
                NormalizedEmail = normalized,
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("N"),
            };
            user.PasswordHash = hasher.HashPassword(user, sharedPassword);
            toInsert.Add(user);
        }

        if (toInsert.Count > 0)
        {
            db.Users.AddRange(toInsert);
            await db.SaveChangesAsync();
        }
        allIds.AddRange(toInsert.Where(u => u.Id != admin.Id).Select(u => u.Id));

        // Give the admin the Admin role via the join table directly, if not already assigned.
        var adminRoleId = (await db.Roles.FirstAsync(r => r.Name == "Admin")).Id;
        var alreadyInRole = await db.UserRoles.AnyAsync(ur => ur.UserId == admin.Id && ur.RoleId == adminRoleId);
        if (!alreadyInRole)
        {
            db.UserRoles.Add(new Microsoft.AspNetCore.Identity.IdentityUserRole<string>
            {
                UserId = admin.Id,
                RoleId = adminRoleId
            });
            await db.SaveChangesAsync();
        }

        return allIds;
    }

    private static async Task<List<Category>> SeedCategoriesAsync(SafeXDbContext db)
    {
        var kidsCategoryNames = new[]
        {
            "Languages", "Technology", "Mathematics", "Science", "Geography", "History",
            "Arts", "Music", "Games", "Health", "Islamic Education", "Nature", "General Knowledge"
        };
        var generalCategoryNames = new[]
        {
            "Programming", "Cybersecurity", "AI", "ML", "Business", "Finance", "Marketing",
            "Design", "Video Editing", "Communication", "Leadership", "Academic Courses",
            "Languages", "Science", "Engineering", "Fitness", "Documentaries"
        };

        var categories = new List<Category>();
        categories.AddRange(kidsCategoryNames.Select(n => new Category { Name = n, IsKidsCategory = true, IsActive = true }));
        categories.AddRange(generalCategoryNames.Select(n => new Category { Name = n, IsKidsCategory = false, IsActive = true }));

        db.Categories.AddRange(categories);
        await db.SaveChangesAsync(); // need real Ids before videos reference them
        return categories;
    }

    private static async Task<List<Video>> SeedVideosAsync(SafeXDbContext db, List<Category> categories)
    {
        var statuses = new[] { VideoStatus.PendingReview, VideoStatus.Published, VideoStatus.Published, VideoStatus.Published, VideoStatus.Rejected };
        var videos = new List<Video>();

        for (int i = 1; i <= 320; i++)
        {
            var category = categories[Rng.Next(categories.Count)];
            var status = statuses[Rng.Next(statuses.Length)];
            var createdAt = DateTime.UtcNow.AddDays(-Rng.Next(0, 70)).AddHours(-Rng.Next(0, 24));

            videos.Add(new Video
            {
                Title = $"Sample Video {i} - {category.Name}",
                YouTubeVideoId = $"demoYT{i:D5}",
                CategoryId = category.Id,
                IsKidsVideo = category.IsKidsCategory,
                Status = status,
                CreatedAt = createdAt,
                PublishedAt = status == VideoStatus.Published ? createdAt.AddHours(Rng.Next(1, 48)) : null
            });
        }

        db.Videos.AddRange(videos);
        await db.SaveChangesAsync();
        return videos;
    }

    private static async Task SeedRecommendationsAsync(SafeXDbContext db, List<Video> videos, List<string> userIds)
    {
        var statuses = new[] { RecommendationStatus.Pending, RecommendationStatus.Pending, RecommendationStatus.Approved, RecommendationStatus.Rejected };
        var recs = new List<Recommendation>();

        for (int i = 0; i < 28; i++)
        {
            var video = videos[Rng.Next(videos.Count)];
            recs.Add(new Recommendation
            {
                VideoId = video.Id,
                RecommendedByUserId = userIds[Rng.Next(userIds.Count)],
                Status = statuses[Rng.Next(statuses.Length)],
                SubmittedAt = DateTime.UtcNow.AddDays(-Rng.Next(0, 30))
            });
        }

        db.Recommendations.AddRange(recs);
        await db.SaveChangesAsync();
    }

    private static async Task SeedActivityLogsAsync(SafeXDbContext db, List<Video> videos, List<string> userIds)
    {
        var actions = new[]
        {
            "Published a video", "Rejected a video", "Approved a recommendation",
            "Edited video metadata", "Soft-deleted a video", "Restored a video",
            "Added a category", "Reviewed a submission"
        };
        var logs = new List<ActivityLog>();

        for (int i = 0; i < 45; i++)
        {
            var video = videos[Rng.Next(videos.Count)];
            logs.Add(new ActivityLog
            {
                UserId = userIds[Rng.Next(userIds.Count)],
                Action = actions[Rng.Next(actions.Length)],
                Details = video.Title,
                Timestamp = DateTime.UtcNow.AddDays(-Rng.Next(0, 14)).AddHours(-Rng.Next(0, 24))
            });
        }

        db.ActivityLogs.AddRange(logs);
        await db.SaveChangesAsync();
    }
}
