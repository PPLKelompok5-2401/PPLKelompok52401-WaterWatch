/**
 * FITUR 4 (Developer 2): Dashboard Laporan Saya & Pemantauan Pribadi
 */
import { USE_MOCK_API, apiRequest, CURRENT_USER_ID } from "../config/apiClient";
import { Report, VerificationStatus } from "../types/waterwatch";

export const myReportService = {
  async fetchMyReports(allReportsFallback: Report[]): Promise<Report[]> {
    if (!USE_MOCK_API) return apiRequest<Report[]>("/reports/me");
    return allReportsFallback.filter((report) => report.userId === CURRENT_USER_ID);
  },
  filterMyReports(reports: Report[], tab: "Semua" | VerificationStatus, category: string, query: string, allCategoriesLabel = "Semua Kategori"): Report[] {
    return reports.filter((report) => (tab === "Semua" || report.verificationStatus === tab) && (category === allCategoriesLabel || report.category === category) && `${report.title} ${report.description}`.toLowerCase().includes(query.toLowerCase()));
  },
  canAccessPrivateReport(report: Report, loggedIn: boolean, userId = CURRENT_USER_ID): boolean {
    return loggedIn && report.userId === userId;
  },
};
