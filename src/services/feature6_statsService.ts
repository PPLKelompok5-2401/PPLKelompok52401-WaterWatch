import { Report } from "../types/waterwatch";
// TUGAS BRILLYAN: Isi kode implementasi asli di sini
export const statsService = {
  async fetchPublicStatsFromApi(): Promise<any> { return {}; },
  getPublicStatCards(reports: Report[]): any[] {
    const approved = reports.filter(r => r.verificationStatus === "Disetujui");
    return [
      { icon: "lucide:files", value: approved.length, label: "Total Laporan Disetujui", note: "Dapat diakses publik", tone: "blue" },
      { icon: "lucide:circle-check-big", value: approved.filter((r) => r.handlingStatus === "Selesai").length, label: "Selesai Ditangani", note: "Penanganan ditutup", tone: "green" },
      { icon: "lucide:loader-circle", value: approved.filter((r) => r.handlingStatus === "Sedang Ditangani").length, label: "Sedang Ditangani", note: "Dalam tindak lanjut", tone: "blue" },
      { icon: "lucide:clock-3", value: approved.filter((r) => r.handlingStatus === "Belum Ditangani").length, label: "Belum Ditangani", note: "Menunggu tindak lanjut", tone: "amber" },
    ];
  },
  getPersonalStatTuples(myReports: Report[]): any[] {
    return [
      ["lucide:files", myReports.length, "Total Laporan Saya", "blue"],
      ["lucide:clock-3", myReports.filter(r => r.verificationStatus === "Menunggu Verifikasi").length, "Menunggu Verifikasi", "amber"],
      ["lucide:badge-check", myReports.filter(r => r.verificationStatus === "Disetujui").length, "Disetujui", "green"],
      ["lucide:circle-x", myReports.filter(r => r.verificationStatus === "Ditolak").length, "Ditolak", "red"],
    ];
  },
};
