# SafeX Educational Learning Platform — Admin Dashboard & Statistics Module Architecture

Author: Muhammad Haziq
Project: SafeX Educational Learning Platform
Module: Admin Dashboard & Statistics Panel

## Overview

The Admin Dashboard provides administrators with a centralized overview of the
SafeX Educational Learning Platform: real-time statistics, analytics, recent
activity, and system insights. It follows a layered (Clean) architecture:

```
React Client (Dashboard/Statistics UI)
        │  HTTP (REST API)
        ▼
DashboardController  (SafeX.API)
        ▼
DashboardService     (SafeX.Application)
        ▼
DashboardRepository  (SafeX.Infrastructure)
        ▼
EF Core → SQL Server
```

## Layers

- **Presentation** — Dashboard page, stat cards, chart, activity feed (`frontend/src`)
- **API** — `DashboardController`: auth, routing, returns DTOs only
- **Service** — `DashboardService`: aggregates repository calls into one payload
- **Repository** — `DashboardRepository`: all EF Core queries live here
- **Domain** — `Video`, `Category`, `Recommendation`, `ActivityLog` entities

## Endpoints

```
GET /api/dashboard            summary + charts + activity, one payload
GET /api/dashboard/charts     weekly upload counts (?weeks=8)
GET /api/dashboard/activity   recent activity log (?count=10)
```

## Example response

```json
{
  "summary": {
    "totalVideos": 520,
    "kidsVideos": 180,
    "generalVideos": 340,
    "publishedVideos": 480,
    "pendingRecommendations": 24,
    "users": 410,
    "categories": 18
  },
  "weeklyUploads": [],
  "videosByCategory": [],
  "recentActivities": []
}
```

## Security

- ASP.NET Identity authentication, JWT bearer tokens
- `[Authorize(Roles = "Admin")]` on the whole controller
- DTOs only — no entity ever crosses the API boundary

## Integration notes for Group 22

- `SafeXDbContext` here is scoped to this module. Merge with the Auth teammate's
  Identity DbContext rather than running two contexts against one database.
- `Video`, `Category`, `Recommendation` entities are placeholders matching the
  fields this dashboard reads — swap in the real ones once those modules land.

## Future enhancements

SignalR real-time updates, dashboard caching, export to PDF/Excel, audit logs,
role-specific dashboards.
