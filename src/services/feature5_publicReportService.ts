import { Filters, Report } from "../types/waterwatch";
// TUGAS BRILLYAN: Isi kode implementasi asli di sini
export const publicReportService = {
  async fetchApprovedReports(fallback: Report[]): Promise<Report[]> {
    return fallback.filter(r => r.verificationStatus === "Disetujui");
  },
  async fetchPublicReportDetail(id: string, fallback: Report[]): Promise<Report | null> {
    return fallback.find(r => r.id === id) || null;
  },
  filterApprovedReports(reports: Report[], filters: Filters, defCat: string, defReg: string, defStat: string): Report[] {
    return reports.filter((report) => {
      const haystack = `${report.title} ${report.location} ${report.description} ${report.category}`.toLowerCase();
      return haystack.includes(filters.query.toLowerCase()) &&
        (filters.category === defCat || report.category === filters.category) &&
        (filters.region === defReg || report.region === filters.region) &&
        (filters.status === defStat || report.handlingStatus === filters.status);
    });
  },
};
