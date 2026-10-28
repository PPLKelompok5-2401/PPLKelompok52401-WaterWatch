import { User } from "../types/waterwatch";
import { CURRENT_USER_ID } from "../config/apiClient";

// TUGAS NAILA: Isi kode implementasi asli di sini
export const authService = {
  async login(credentials: any): Promise<User> {
    return { id: CURRENT_USER_ID, name: "Dimas Prasetyo", email: credentials.email, role: "user" };
  },
  async register(payload: any): Promise<User> {
    return { id: CURRENT_USER_ID, name: payload.name, email: payload.email, role: "user" };
  },
  async getCurrentUser(): Promise<User | null> { return null; },
  async updateProfile(name: string): Promise<User> {
    return { id: CURRENT_USER_ID, name, email: "demo@waterwatch.id", role: "user" };
  },
  async logout(): Promise<void> {},
};
