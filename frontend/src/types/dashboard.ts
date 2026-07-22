export interface DashboardSummary {
  totalVideos: number;
  kidsVideos: number;
  generalVideos: number;
  publishedVideos: number;
  pendingRecommendations: number;
  users: number;
  categories: number;
}

export interface WeeklyUploadPoint {
  weekLabel: string;
  uploadCount: number;
}

export interface CategoryStat {
  categoryName: string;
  videoCount: number;
}

export interface ActivityLogItem {
  userName: string;
  action: string;
  timestamp: string;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  weeklyUploads: WeeklyUploadPoint[];
  videosByCategory: CategoryStat[];
  recentActivities: ActivityLogItem[];
}

export const fallbackDashboard: DashboardResponse = {
  summary: {
    totalVideos: 520,
    kidsVideos: 180,
    generalVideos: 340,
    publishedVideos: 480,
    pendingRecommendations: 24,
    users: 410,
    categories: 18,
  },
  weeklyUploads: [
    { weekLabel: "Wk 27", uploadCount: 32 },
    { weekLabel: "Wk 28", uploadCount: 41 },
    { weekLabel: "Wk 29", uploadCount: 36 },
    { weekLabel: "Wk 30", uploadCount: 48 },
    { weekLabel: "Wk 31", uploadCount: 39 },
    { weekLabel: "Wk 32", uploadCount: 52 },
    { weekLabel: "Wk 33", uploadCount: 44 },
    { weekLabel: "Wk 34", uploadCount: 57 },
  ],
  videosByCategory: [
    { categoryName: "Mathematics", videoCount: 92 },
    { categoryName: "Science", videoCount: 84 },
    { categoryName: "Languages", videoCount: 76 },
    { categoryName: "Technology", videoCount: 63 },
    { categoryName: "General Knowledge", videoCount: 58 },
    { categoryName: "Arts", videoCount: 41 },
  ],
  recentActivities: [
    { userName: "Aina Rahman", action: "published a Science lesson", timestamp: "2026-07-22T09:42:00Z" },
    { userName: "Sairam Abdullah", action: "approved a recommendation", timestamp: "2026-07-22T08:15:00Z" },
    { userName: "Muhammad Haziq", action: "added a new Kids category video", timestamp: "2026-07-21T16:05:00Z" },
    { userName: "Nur Iman", action: "submitted a General Knowledge clip", timestamp: "2026-07-21T14:20:00Z" },
  ],
};
