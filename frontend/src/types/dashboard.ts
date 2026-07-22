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
