# SafeX Educational Learning Platform — Admin Dashboard & Statistics Module

Haziq's module for Project 1 (Group 22, Week 3): a real-time admin dashboard with
KPI widgets, a weekly-uploads chart, category breakdown, and an activity feed.

## Backend (ASP.NET Core 9 / EF Core / SQL Server)

```bash
cd backend
dotnet restore
# set your real SQL Server connection string in SafeX.API/appsettings.json first
dotnet ef migrations add InitialCreate --project SafeX.Infrastructure --startup-project SafeX.API
dotnet ef database update --project SafeX.Infrastructure --startup-project SafeX.API
dotnet run --project SafeX.API
```

API comes up at `http://localhost:5209`, Swagger UI at `/swagger`.

> This module's `SafeXDbContext` and `Video`/`Category`/`Recommendation` entities are
> placeholders scoped to what the dashboard needs. Merge with the Auth module's
> DbContext and the real entities from the Video/Category/Recommendation modules
> before integrating — don't run two DbContexts against the same database.

## Frontend (React 19 / Vite / TypeScript / Tailwind)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs at `http://localhost:5173`, proxies API calls to `VITE_API_BASE_URL`.

## Folder structure

```
SafeX/
├── frontend/          React + TypeScript + Vite dashboard UI
├── backend/
│   ├── SafeX.API/            Controllers, Program.cs, config
│   ├── SafeX.Application/    DTOs, service interfaces, services
│   ├── SafeX.Domain/         Entities
│   └── SafeX.Infrastructure/ EF Core DbContext, repositories
└── docs/              Architecture notes and screenshots
```
