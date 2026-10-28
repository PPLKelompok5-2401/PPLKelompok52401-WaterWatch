import { HandlingStatus, Report } from "../types/waterwatch";
// TUGAS FADIL: Isi kode implementasi asli di sini
export const adminVerificationService = {
  async approveReport(report: Report): Promise<Report> { return report; },
  async rejectReport(report: Report, reason: string): Promise<Report> { return report; },
  async updateHandlingStatus(report: Report, nextStatus: HandlingStatus, progressNote?: string): Promise<Report> { return report; },
};
