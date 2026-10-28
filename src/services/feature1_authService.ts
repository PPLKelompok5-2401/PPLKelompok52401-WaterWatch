/**
 * FITUR 1 (Developer 1): Autentikasi & Manajemen Sesi Pengguna (AuthController -> User)
 * Siap diintegrasikan ke Backend Python (FastAPI / Flask) + TiDB Cloud (Tabel `users`)
 */
import { API_BASE_URL, USE_MOCK_API, apiRequest, CURRENT_USER_ID } from "../config/apiClient";
import { User } from "../types/waterwatch";

export interface AuthCredentials { email: string; password: string; }
export interface RegisterPayload extends AuthCredentials { name: string; }

const DEMO_USERS: User[] = [
  { id: CURRENT_USER_ID, name: "Dimas Prasetyo", email: "demo@waterwatch.id", role: "user" },
  { id: "admin-01", name: "Admin WaterWatch", email: "admin@waterwatch.id", role: "admin" },
];

export const authService = {
  async login(credentials: AuthCredentials): Promise<User> {
    if (!USE_MOCK_API) {
      const data = await apiRequest<{ user: User; access_token: string }>("/auth/login", {
        method: "POST", body: JSON.stringify(credentials),
      });
      localStorage.setItem("ww_auth_token", data.access_token);
      localStorage.setItem("ww_current_user", JSON.stringify(data.user));
      return data.user;
    }
    if (credentials.email === "demo@waterwatch.id" && credentials.password === "waterwatch") {
      const user = DEMO_USERS[0];
      localStorage.setItem("ww_current_user", JSON.stringify(user));
      return user;
    }
    if (credentials.email === "admin@waterwatch.id" && credentials.password === "waterwatch") {
      const admin = DEMO_USERS[1];
      localStorage.setItem("ww_current_user", JSON.stringify(admin));
      return admin;
    }
    throw new Error("Kredensial demo tidak sesuai. Gunakan akun contoh yang tersedia.");
  },
  async register(payload: RegisterPayload): Promise<User> {
    if (!USE_MOCK_API) {
      const data = await apiRequest<{ user: User; access_token: string }>("/auth/register", {
        method: "POST", body: JSON.stringify(payload),
      });
      localStorage.setItem("ww_auth_token", data.access_token);
      localStorage.setItem("ww_current_user", JSON.stringify(data.user));
      return data.user;
    }
    const newUser: User = { id: CURRENT_USER_ID, name: payload.name.trim() || "Dimas Prasetyo", email: payload.email, role: "user" };
    localStorage.setItem("ww_current_user", JSON.stringify(newUser));
    return newUser;
  },
  async getCurrentUser(): Promise<User | null> {
    if (!USE_MOCK_API) return apiRequest<User>("/auth/me");
    const saved = localStorage.getItem("ww_current_user");
    return saved ? (JSON.parse(saved) as User) : null;
  },
  async updateProfile(name: string): Promise<User> {
    if (!USE_MOCK_API) {
      return apiRequest<User>("/auth/profile", { method: "PUT", body: JSON.stringify({ name }) });
    }
    const current = (await this.getCurrentUser()) || DEMO_USERS[0];
    const updated = { ...current, name };
    localStorage.setItem("ww_current_user", JSON.stringify(updated));
    return updated;
  },
  async logout(): Promise<void> {
    if (!USE_MOCK_API) await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" }).catch(() => {});
    localStorage.removeItem("ww_auth_token");
    localStorage.removeItem("ww_current_user");
  },
};
