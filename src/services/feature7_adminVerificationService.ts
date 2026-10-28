/**
 * FITUR 7 (Developer 4): Verifikasi Laporan Masuk & Pembaruan Status Penanganan Admin
 */
import { USE_MOCK_API, apiRequest } from "../config/apiClient";
import { HandlingStatus, Report } from "../types/waterwatch";

export const adminVerificationService = {
  async approveReport(report: Report): Promise<Report> {
    if (!USE_MOCK_API) return apiRequest<Report>(`/admin/reports/${report.id}/approve`, { method: "POST" });
    return {
      ...report, verificationStatus: "Disetujui", handlingStatus: report.handlingStatus ?? "Belum Ditangani", rejectionReason: null,
      timeline: [...report.timeline, { date: "Baru saja", title: "Laporan disetujui", note: "Laporan telah diverifikasi Admin dan dipublikasikan." }],
    };
  },
  async rejectReport(report: Report, reason: string): Promise<Report> {
    if (!USE_MOCK_API) return apiRequest<Report>(`/admin/reports/${report.id}/reject`, { method: "POST", body: JSON.stringify({ reason }) });
    return {
      ...report, verificationStatus: "Ditolak", handlingStatus: null, rejectionReason: reason.trim() || "Bukti atau deskripsi laporan belum memenuhi kriteria verifikasi.",
      timeline: [...report.timeline, { date: "Baru saja", title: "Laporan ditolak", note: reason.trim() || "Laporan belum memenuhi syarat publikasi." }],
    };
  },
  async updateHandlingStatus(report: Report, nextStatus: HandlingStatus, progressNote?: string): Promise<Report> {
    if (!USE_MOCK_API) return apiRequest<Report>(`/admin/reports/${report.id}/handling-status`, { method: "PATCH", body: JSON.stringify({ handlingStatus: nextStatus, note: progressNote }) });
    return {
      ...report, handlingStatus: nextStatus,
      timeline: [...report.timeline, { date: "Baru saja", title: `Status penanganan: ${nextStatus}`, note: progressNote?.trim() || `Status penanganan diperbarui menjadi ${nextStatus}.` }],
    };
  },
};
