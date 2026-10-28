import { Report, TimelineEntry } from "../types/waterwatch";
// TUGAS FADIL: Isi kode implementasi asli di sini
export const timelineResponseService = {
  async getReportTimeline(report: Report): Promise<TimelineEntry[]> { return report.timeline; },
  async addAdminResponse(report: Report, message: string): Promise<Report> { return report; },
  async deleteAdminResponse(report: Report, responseIndex: number): Promise<Report> { return report; },
};
