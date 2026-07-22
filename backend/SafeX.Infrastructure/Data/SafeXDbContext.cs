using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SafeX.Domain.Entities;

namespace SafeX.Infrastructure.Data;

// NOTE: merge this with the shared DbContext from the Auth module (Project teammate)
// instead of registering two contexts against the same database.
public class SafeXDbContext : IdentityDbContext<IdentityUser>
{
    public SafeXDbContext(DbContextOptions<SafeXDbContext> options) : base(options) { }

    public DbSet<Video> Videos => Set<Video>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Recommendation> Recommendations => Set<Recommendation>();
    public DbSet<ActivityLog> ActivityLogs => Set<ActivityLog>();
}
