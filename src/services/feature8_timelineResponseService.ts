/**
 * FITUR 8 (Developer 4): Riwayat Status & Tanggapan Admin CRUD
 */
import { USE_MOCK_API, apiRequest } from "../config/apiClient";
import { Report, TimelineEntry } from "../types/waterwatch";

export const timelineResponseService = {
  async getReportTimeline(report: Report): Promise<TimelineEntry[]> {
    if (!USE_MOCK_API) return apiRequest<TimelineEntry[]>(`/reports/${report.id}/timeline`);
    return report.timeline;
  },
  async addAdminResponse(report: Report, message: string): Promise<Report> {
    if (!USE_MOCK_API) return apiRequest<Report>(`/admin/reports/${report.id}/responses`, { method: "POST", body: JSON.stringify({ response_text: message }) });
    return { ...report, adminResponses: [...report.adminResponses, message.trim()] };
  },
  async deleteAdminResponse(report: Report, responseIndex: number): Promise<Report> {
    if (!USE_MOCK_API) await apiRequest(`/admin/reports/${report.id}/responses/${responseIndex}`, { method: "DELETE" });
    return { ...report, adminResponses: report.adminResponses.filter((_, idx) => idx !== responseIndex) };
  },
};
