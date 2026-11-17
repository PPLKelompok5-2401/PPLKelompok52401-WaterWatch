/**
 * FITUR 5 (Developer 3): Eksplorasi, Pencarian & Filter Laporan Publik
 */
import { USE_MOCK_API, apiRequest } from "../config/apiClient";
import { Filters, Report } from "../types/waterwatch";

export const publicReportService = {
  async fetchApprovedReports(allReportsFallback: Report[]): Promise<Report[]> {
    if (!USE_MOCK_API) return apiRequest<Report[]>("/public/reports");
    return allReportsFallback.filter((report) => report.verificationStatus === "Disetujui");
  },
  async fetchPublicReportDetail(reportId: string, allReportsFallback: Report[]): Promise<Report | null> {
    if (!USE_MOCK_API) return apiRequest<Report>(`/public/reports/${reportId}`);
    const found = allReportsFallback.find((r) => r.id === reportId && r.verificationStatus === "Disetujui");
    return found || null;
  },
  filterApprovedReports(reports: Report[], filters: Filters, defaultCategory = "Semua Kategori", defaultRegion = "Semua Wilayah", defaultStatus = "Semua Status"): Report[] {
    return reports.filter((report) => {
      const haystack = `${report.title} ${report.location} ${report.description} ${report.category}`.toLowerCase();
      return (
        haystack.includes(filters.query.toLowerCase()) &&
        (filters.category === defaultCategory || report.category === filters.category) &&
        (filters.region === defaultRegion || report.region === filters.region) &&
        (filters.status === defaultStatus || report.handlingStatus === filters.status)
      );
    });
  },
};
