/**
 * FITUR 2 (Developer 1): Pengelolaan Master Kategori Laporan CRUD (Category)
 * Siap diintegrasikan ke Backend Python (FastAPI / Flask) + TiDB Cloud (Tabel `categories`)
 */
import { USE_MOCK_API, apiRequest, DEFAULT_CATEGORIES } from "../config/apiClient";
import { CategoryItem } from "../types/waterwatch";

const STORAGE_KEY = "ww_categories_data";

function loadLocalCategories(): CategoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CategoryItem[]) : DEFAULT_CATEGORIES;
  } catch { return DEFAULT_CATEGORIES; }
}

export const categoryService = {
  async getAllCategories(): Promise<CategoryItem[]> {
    if (!USE_MOCK_API) return apiRequest<CategoryItem[]>("/categories");
    return loadLocalCategories();
  },
  getCategoryNamesForFilter(items: CategoryItem[] = loadLocalCategories()): string[] {
    return ["Semua Kategori", ...items.map((item) => item.name)];
  },
  async createCategory(name: string, description: string): Promise<CategoryItem> {
    if (!USE_MOCK_API) return apiRequest<CategoryItem>("/categories", { method: "POST", body: JSON.stringify({ name, description }) });
    const current = loadLocalCategories();
    const newItem: CategoryItem = { id: current.length > 0 ? Math.max(...current.map((c) => c.id)) + 1 : 1, name: name.trim(), description: description.trim() };
    const next = [...current, newItem];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return newItem;
  },
  async updateCategory(id: number, name: string, description: string): Promise<CategoryItem> {
    if (!USE_MOCK_API) return apiRequest<CategoryItem>(`/categories/${id}`, { method: "PUT", body: JSON.stringify({ name, description }) });
    const current = loadLocalCategories();
    const next = current.map((item) => item.id === id ? { ...item, name: name.trim(), description: description.trim() } : item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next.find((item) => item.id === id)!;
  },
  async deleteCategory(id: number): Promise<void> {
    if (!USE_MOCK_API) { await apiRequest(`/categories/${id}`, { method: "DELETE" }); return; }
    const current = loadLocalCategories().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  },
};
