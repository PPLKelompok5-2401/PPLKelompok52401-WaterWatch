/**
 * FITUR 6 (Developer 3): Kalkulasi & Agregasi Statistik Laporan
 */
import { USE_MOCK_API, apiRequest } from "../config/apiClient";
import { Report } from "../types/waterwatch";

export interface PublicStatItem { icon: string; value: number; label: string; note: string; tone: "blue" | "green" | "amber"; }

export const statsService = {
  async fetchPublicStatsFromApi(): Promise<Record<string, number>> {
    if (!USE_MOCK_API) return apiRequest<Record<string, number>>("/public/stats");
    return {};
  },
  getPublicStatCards(reports: Report[]): PublicStatItem[] {
    const approved = reports.filter((report) => report.verificationStatus === "Disetujui");
    return [
      { icon: "lucide:files", value: approved.length, label: "Total Laporan Disetujui", note: "Dapat diakses publik", tone: "blue" },
      { icon: "lucide:circle-check-big", value: approved.filter((r) => r.handlingStatus === "Selesai").length, label: "Selesai Ditangani", note: "Penanganan ditutup", tone: "green" },
      { icon: "lucide:loader-circle", value: approved.filter((r) => r.handlingStatus === "Sedang Ditangani").length, label: "Sedang Ditangani", note: "Dalam tindak lanjut", tone: "blue" },
      { icon: "lucide:clock-3", value: approved.filter((r) => r.handlingStatus === "Belum Ditangani").length, label: "Belum Ditangani", note: "Menunggu tindak lanjut", tone: "amber" },
    ];
  },
  getPersonalStatTuples(myReports: Report[]): [string, number, string, string][] {
    return [
      ["lucide:files", myReports.length, "Total Laporan Saya", "blue"],
      ["lucide:clock-3", myReports.filter((report) => report.verificationStatus === "Menunggu Verifikasi").length, "Menunggu Verifikasi", "amber"],
      ["lucide:badge-check", myReports.filter((report) => report.verificationStatus === "Disetujui").length, "Disetujui", "green"],
      ["lucide:circle-x", myReports.filter((report) => report.verificationStatus === "Ditolak").length, "Ditolak", "red"],
    ];
  },
};
