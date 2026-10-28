import { CategoryItem } from "../types/waterwatch";
// TUGAS NAILA: Isi kode implementasi asli di sini
export const categoryService = {
  async getAllCategories(): Promise<CategoryItem[]> { return []; },
  getCategoryNamesForFilter(): string[] {
    return ["Semua Kategori", "Kualitas Air", "Pencemaran", "Kebocoran Pipa", "Drainase", "Sanitasi"];
  },
  async createCategory(name: string, description: string): Promise<any> { return {}; },
  async updateCategory(id: number, name: string, description: string): Promise<any> { return {}; },
  async deleteCategory(id: number): Promise<void> {},
};
