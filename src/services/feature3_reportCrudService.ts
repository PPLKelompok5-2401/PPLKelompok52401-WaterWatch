/**
 * FITUR 3 (Developer 2): Pembuatan, Edit, Hapus Laporan & Unggah Foto
 */
import { API_BASE_URL, USE_MOCK_API, apiRequest, CURRENT_USER_ID } from "../config/apiClient";
import { CreateReportPayload, Report } from "../types/waterwatch";

export const reportCrudService = {
  validatePhotoFile(file: File): string | null {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return "Gunakan file JPG, PNG, atau WebP.";
    if (file.size > 5 * 1024 * 1024) return "Ukuran foto maksimal 5 MB.";
    return null;
  },
  buildNewReportObject(values: CreateReportPayload, currentCount: number): Report {
    const id = `WW-DRAFT-${String(currentCount + 1).padStart(3, "0")}`;
    return {
      id, userId: CURRENT_USER_ID, title: values.title, category: values.category, description: values.description,
      location: `${values.location}, ${values.region}`, region: values.region, urgency: values.urgency as Report["urgency"],
      photo: values.photo, createdAt: "Hari ini", verificationStatus: "Menunggu Verifikasi", handlingStatus: null,
      rejectionReason: null, adminResponses: [], date: "Hari ini", image: values.photo, imageAlt: `Foto pendukung untuk ${values.title}`,
      marker: { left: "50%", top: "50%" }, timeline: [{ date: "Hari ini", title: "Laporan dikirim", note: "Laporan sedang menunggu pemeriksaan Admin." }],
    };
  },
  async createReportRemote(values: CreateReportPayload, currentCount: number): Promise<Report> {
    if (!USE_MOCK_API) return apiRequest<Report>("/reports", { method: "POST", body: JSON.stringify(values) });
    return this.buildNewReportObject(values, currentCount);
  },
  async updateMyReport(reportId: string, updates: Partial<Pick<Report, "title" | "category" | "description" | "location" | "urgency">>): Promise<Partial<Report>> {
    if (!USE_MOCK_API) return apiRequest<Report>(`/reports/${reportId}`, { method: "PUT", body: JSON.stringify(updates) });
    return updates;
  },
  async deleteMyReport(reportId: string): Promise<boolean> {
    if (!USE_MOCK_API) await apiRequest(`/reports/${reportId}`, { method: "DELETE" });
    return true;
  },
  async uploadReportPhoto(reportId: string, file: File): Promise<string> {
    if (!USE_MOCK_API) {
      const formData = new FormData(); formData.append("file", file);
      const token = localStorage.getItem("ww_auth_token");
      const res = await fetch(`${API_BASE_URL}/reports/${reportId}/photos`, { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {}, body: formData });
      if (!res.ok) throw new Error("Gagal mengunggah foto laporan.");
      const data = await res.json();
      return data.photo_url;
    }
    return URL.createObjectURL(file);
  },
};
