import { Icon } from "@iconify/react";
import { ChangeEvent, FormEvent, ReactNode, useMemo, useState } from "react";

type Page = "home" | "reports" | "about" | "detail" | "auth" | "create" | "dashboard" | "privateDetail" | "privacy" | "terms";
type HandlingStatus = "Belum Ditangani" | "Sedang Ditangani" | "Selesai";
type VerificationStatus = "Menunggu Verifikasi" | "Disetujui" | "Ditolak";

type Report = {
  id: string;
  userId: string;
  title: string;
  category: string;
  description: string;
  location: string;
  region: string;
  urgency: "Rendah" | "Sedang" | "Tinggi";
  photo: string;
  createdAt: string;
  verificationStatus: VerificationStatus;
  handlingStatus: HandlingStatus | null;
  rejectionReason: string | null;
  adminResponses: string[];
  date: string;
  image: string;
  imageAlt: string;
  marker: { left: string; top: string };
  timeline: { date: string; title: string; note: string }[];
};

const currentUserId = "user-demo";

const initialReports: Report[] = [
  {
    id: "WW-SIM-001",
    userId: "user-warga-01",
    title: "Pencemaran Saluran Air",
    category: "Pencemaran",
    description: "Warna air pada saluran berubah gelap dan tercium bau tidak sedap. Tim wilayah sedang melakukan pemeriksaan awal dan koordinasi tindak lanjut.",
    location: "Jakarta Pusat",
    region: "Jakarta Pusat",
    urgency: "Tinggi",
    photo: "https://images.unsplash.com/photo-1603460501847-3370979a7e2f?auto=format&fit=crop&w=1200&q=82",
    createdAt: "12 Oktober 2026",
    verificationStatus: "Disetujui",
    handlingStatus: "Sedang Ditangani",
    rejectionReason: null,
    adminResponses: [],
    date: "12 Oktober 2026",
    image: "https://images.unsplash.com/photo-1603460501847-3370979a7e2f?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Saluran air di kawasan permukiman perkotaan",
    marker: { left: "48%", top: "38%" },
    timeline: [
      { date: "12 Okt 2026, 09.15", title: "Laporan diterima", note: "Laporan masuk ke antrean verifikasi." },
      { date: "12 Okt 2026, 13.40", title: "Laporan disetujui", note: "Informasi dinilai cukup untuk dipublikasikan." },
      { date: "13 Okt 2026, 10.20", title: "Pemeriksaan awal", note: "Tim wilayah melakukan koordinasi pemeriksaan saluran." },
    ],
  },
  {
    id: "WW-SIM-002",
    userId: "user-warga-02",
    title: "Kebocoran Pipa di Area Permukiman",
    category: "Kebocoran Pipa",
    description: "Air terus mengalir dari sambungan pipa di tepi jalan permukiman. Genangan mulai mengganggu akses warga dan membutuhkan pemeriksaan teknis.",
    location: "Jakarta Selatan",
    region: "Jakarta Selatan",
    urgency: "Tinggi",
    photo: "https://images.unsplash.com/photo-1526898943670-92bfa9f94c12?auto=format&fit=crop&w=1200&q=82",
    createdAt: "10 Oktober 2026",
    verificationStatus: "Disetujui",
    handlingStatus: "Belum Ditangani",
    rejectionReason: null,
    adminResponses: [],
    date: "10 Oktober 2026",
    image: "https://images.unsplash.com/photo-1526898943670-92bfa9f94c12?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Air mengalir keluar dari pipa",
    marker: { left: "42%", top: "68%" },
    timeline: [
      { date: "10 Okt 2026, 08.30", title: "Laporan diterima", note: "Laporan masuk ke antrean verifikasi." },
      { date: "10 Okt 2026, 15.10", title: "Laporan disetujui", note: "Foto dan informasi lokasi dinilai memadai." },
    ],
  },
  {
    id: "WW-SIM-003",
    userId: "user-warga-03",
    title: "Sampah Menumpuk di Saluran Drainase",
    category: "Drainase",
    description: "Sampah rumah tangga menutup aliran drainase dan menimbulkan genangan setelah hujan. Saluran telah dibersihkan oleh petugas wilayah.",
    location: "Jakarta Barat",
    region: "Jakarta Barat",
    urgency: "Sedang",
    photo: "https://images.unsplash.com/photo-1759868414347-e3b4f79f4bba?auto=format&fit=crop&w=1200&q=82",
    createdAt: "8 Oktober 2026",
    verificationStatus: "Disetujui",
    handlingStatus: "Selesai",
    rejectionReason: null,
    adminResponses: [],
    date: "8 Oktober 2026",
    image: "https://images.unsplash.com/photo-1759868414347-e3b4f79f4bba?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Sampah plastik mengapung di permukaan air",
    marker: { left: "25%", top: "45%" },
    timeline: [
      { date: "8 Okt 2026, 07.45", title: "Laporan diterima", note: "Laporan diterima untuk ditinjau." },
      { date: "8 Okt 2026, 11.30", title: "Laporan disetujui", note: "Laporan dipublikasikan." },
      { date: "9 Okt 2026, 09.00", title: "Pembersihan dilakukan", note: "Petugas membersihkan sampah pada saluran." },
      { date: "9 Okt 2026, 15.20", title: "Penanganan selesai", note: "Aliran drainase kembali lancar." },
    ],
  },
  {
    id: "WW-SIM-004",
    userId: currentUserId,
    title: "Air Keran Berubah Warna",
    category: "Kualitas Air",
    description: "Air keran warga terlihat kekuningan selama dua hari. Pemeriksaan jaringan distribusi sedang dikoordinasikan dengan pengelola setempat.",
    location: "Bekasi",
    region: "Bekasi",
    urgency: "Sedang",
    photo: "https://images.unsplash.com/photo-1719388135227-82f696753c19?auto=format&fit=crop&w=1200&q=82",
    createdAt: "6 Oktober 2026",
    verificationStatus: "Disetujui",
    handlingStatus: "Sedang Ditangani",
    rejectionReason: null,
    adminResponses: ["Laporan telah diteruskan kepada pengelola jaringan air wilayah Bekasi untuk pemeriksaan kualitas dan jaringan distribusi."],
    date: "6 Oktober 2026",
    image: "https://images.unsplash.com/photo-1719388135227-82f696753c19?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Aliran air di lingkungan hijau",
    marker: { left: "76%", top: "52%" },
    timeline: [
      { date: "6 Okt 2026, 12.10", title: "Laporan diterima", note: "Laporan masuk dan menunggu peninjauan." },
      { date: "6 Okt 2026, 16.30", title: "Laporan disetujui", note: "Laporan dipublikasikan tanpa data pribadi pelapor." },
      { date: "7 Okt 2026, 10.00", title: "Koordinasi pemeriksaan", note: "Pengelola jaringan menerima informasi awal." },
    ],
  },
  {
    id: "WW-MY-005",
    userId: currentUserId,
    title: "Bau Tidak Sedap dari Saluran Air",
    category: "Sanitasi",
    description: "Bau menyengat muncul dari saluran air di sekitar area permukiman sejak beberapa hari terakhir.",
    location: "Depok",
    region: "Depok",
    urgency: "Sedang",
    photo: "https://images.unsplash.com/photo-1759868414148-913f1cc34049?auto=format&fit=crop&w=1200&q=82",
    createdAt: "15 Oktober 2026",
    verificationStatus: "Menunggu Verifikasi",
    handlingStatus: null,
    rejectionReason: null,
    adminResponses: [],
    date: "15 Oktober 2026",
    image: "https://images.unsplash.com/photo-1759868414148-913f1cc34049?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Saluran air dengan sampah dan puing",
    marker: { left: "50%", top: "72%" },
    timeline: [{ date: "15 Okt 2026, 09.30", title: "Laporan dikirim", note: "Laporan sedang menunggu pemeriksaan Admin." }],
  },
  {
    id: "WW-MY-006",
    userId: currentUserId,
    title: "Foto Lokasi Kerusakan Pompa Air",
    category: "Kualitas Air",
    description: "Pompa air komunal tidak berfungsi dan suplai air warga terganggu sejak pagi.",
    location: "Tangerang",
    region: "Tangerang",
    urgency: "Tinggi",
    photo: "https://images.unsplash.com/photo-1639335875048-a14e75abc083?auto=format&fit=crop&w=1200&q=82",
    createdAt: "3 Oktober 2026",
    verificationStatus: "Ditolak",
    handlingStatus: null,
    rejectionReason: "Foto belum menunjukkan kerusakan pompa dengan jelas. Mohon unggah foto yang memperlihatkan unit pompa dan kondisi sekitarnya.",
    adminResponses: ["Silakan kirim laporan baru dengan foto yang lebih jelas dan informasi lokasi umum yang lebih lengkap."],
    date: "3 Oktober 2026",
    image: "https://images.unsplash.com/photo-1639335875048-a14e75abc083?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Petugas memeriksa jaringan air",
    marker: { left: "18%", top: "60%" },
    timeline: [
      { date: "3 Okt 2026, 08.45", title: "Laporan dikirim", note: "Laporan masuk ke antrean pemeriksaan." },
      { date: "3 Okt 2026, 14.20", title: "Laporan ditolak", note: "Bukti foto belum cukup jelas untuk diverifikasi." },
    ],
  },
  {
    id: "WW-OTHER-007",
    userId: "user-demo-lain",
    title: "Laporan Privat Milik Pengguna Lain",
    category: "Drainase",
    description: "Data privat pengujian untuk memastikan pemisahan kepemilikan laporan.",
    location: "Bogor",
    region: "Bogor",
    urgency: "Rendah",
    photo: "https://images.unsplash.com/photo-1736820970575-98c673f5d751?auto=format&fit=crop&w=1200&q=82",
    createdAt: "16 Oktober 2026",
    verificationStatus: "Menunggu Verifikasi",
    handlingStatus: null,
    rejectionReason: null,
    adminResponses: [],
    date: "16 Oktober 2026",
    image: "https://images.unsplash.com/photo-1736820970575-98c673f5d751?auto=format&fit=crop&w=1200&q=82",
    imageAlt: "Jembatan kecil di atas aliran air",
    marker: { left: "34%", top: "84%" },
    timeline: [{ date: "16 Okt 2026", title: "Laporan dikirim", note: "Menunggu pemeriksaan." }],
  },
];

const categories = ["Semua Kategori", "Kualitas Air", "Pencemaran", "Kebocoran Pipa", "Drainase", "Sanitasi"];
const regions = ["Semua Wilayah", "Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Bogor", "Depok", "Tangerang", "Bekasi"];
const statuses = ["Semua Status", "Belum Ditangani", "Sedang Ditangani", "Selesai"];

function AppIcon({ name, size = 20 }: { name: string; size?: number }) {
  return <Icon icon={name} width={size} height={size} />;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`logo ${inverse ? "inverse" : ""}`}>
      <span className="logo-symbol"><AppIcon name="lucide:droplet" size={24} /><AppIcon name="lucide:leaf" size={12} /></span>
      <span>WaterWatch</span>
    </span>
  );
}

function Button({ children, variant = "primary", icon, onClick, type = "button", disabled = false, full = false }: {
  children: ReactNode; variant?: "primary" | "outline" | "light" | "text"; icon?: string; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean; full?: boolean;
}) {
  return <button className={`button button-${variant} ${full ? "button-full" : ""}`} onClick={onClick} type={type} disabled={disabled}>{icon && <AppIcon name={icon} />}{children}</button>;
}

function StatusBadge({ status }: { status: HandlingStatus }) {
  const icon = status === "Selesai" ? "lucide:circle-check" : status === "Sedang Ditangani" ? "lucide:loader-circle" : "lucide:clock-3";
  return <span className={`status status-${status.toLowerCase().replaceAll(" ", "-")}`}><AppIcon name={icon} size={14} />{status}</span>;
}

function VerificationBadge({ status }: { status: VerificationStatus }) {
  const icon = status === "Disetujui" ? "lucide:badge-check" : status === "Ditolak" ? "lucide:circle-x" : "lucide:clock-3";
  return <span className={`verification verification-${status.toLowerCase().replaceAll(" ", "-")}`}><AppIcon name={icon} size={14} />{status}</span>;
}

function SimulationLabel() {
  return <span className="simulation-label"><AppIcon name="lucide:flask-conical" size={14} />Data Simulasi</span>;
}

function Header({ page, loggedIn, onNavigate, onSearch, onLogout }: {
  page: Page; loggedIn: boolean; onNavigate: (page: Page) => void; onSearch: (query: string) => void; onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [query, setQuery] = useState("");
  const submitSearch = (event: FormEvent) => { event.preventDefault(); onSearch(query); setMenuOpen(false); };
  const go = (next: Page) => { onNavigate(next); setMenuOpen(false); };
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="logo-button" onClick={() => go("home")} aria-label="Ke Beranda"><Logo /></button>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <button className={page === "home" ? "active" : ""} onClick={() => go("home")}>Beranda</button>
          <button className={page === "reports" || page === "detail" ? "active" : ""} onClick={() => go("reports")}>Laporan Publik</button>
          {loggedIn && <button className={page === "dashboard" || page === "privateDetail" ? "active" : ""} onClick={() => go("dashboard")}>Dashboard Saya</button>}
          <button className={page === "about" ? "active" : ""} onClick={() => go("about")}>Tentang WaterWatch</button>
        </nav>
        <form className="header-search" onSubmit={submitSearch}>
          <AppIcon name="lucide:search" size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari laporan..." aria-label="Cari laporan, lokasi, atau kategori" />
        </form>
        <div className="header-actions">
          {loggedIn ? <div className="account-menu-wrap"><button className="account-chip" onClick={() => setAccountOpen(!accountOpen)}><span>DP</span><span>Dimas</span><AppIcon name="lucide:chevron-down" size={16} /></button>{accountOpen && <div className="account-menu"><div><strong>Dimas Prasetyo</strong><small>Akun demo pengguna</small></div><button onClick={() => { go("dashboard"); setAccountOpen(false); }}><AppIcon name="lucide:layout-dashboard" />Dashboard Saya</button><button onClick={() => { onLogout(); setAccountOpen(false); }}><AppIcon name="lucide:log-out" />Keluar</button></div>}</div> : <Button variant="text" icon="lucide:user" onClick={() => go("auth")}>Masuk</Button>}
          <Button icon="lucide:plus" onClick={() => go("create")}>Buat Laporan</Button>
        </div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"}><AppIcon name={menuOpen ? "lucide:x" : "lucide:menu"} size={24} /></button>
      </div>
      {menuOpen && <div className="mobile-menu">
        <nav><button onClick={() => go("home")}>Beranda</button><button onClick={() => go("reports")}>Laporan Publik</button>{loggedIn && <button onClick={() => go("dashboard")}>Dashboard Saya</button>}<button onClick={() => go("about")}>Tentang WaterWatch</button></nav>
        <form className="mobile-search" onSubmit={submitSearch}><AppIcon name="lucide:search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari laporan atau lokasi..." /><button type="submit" aria-label="Cari"><AppIcon name="lucide:arrow-right" /></button></form>
        <div className="mobile-menu-actions">{loggedIn ? <Button variant="outline" icon="lucide:log-out" onClick={() => { onLogout(); setMenuOpen(false); }}>Keluar</Button> : <Button variant="outline" onClick={() => go("auth")}>Masuk</Button>}<Button onClick={() => go("create")}>Buat Laporan</Button></div>
      </div>}
    </header>
  );
}

function Hero({ loggedIn, onNavigate }: { loggedIn: boolean; onNavigate: (page: Page) => void }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow"><AppIcon name="lucide:waves" size={16} />Platform partisipasi masyarakat</span>
        <h1>Laporkan Masalah Air dan Sanitasi di Sekitarmu</h1>
        <p>Bantu wujudkan lingkungan yang lebih sehat dengan melaporkan permasalahan air dan sanitasi. Pantau informasi laporan melalui satu platform.</p>
        <div className="hero-actions"><Button icon="lucide:plus" onClick={() => onNavigate("create")}>Buat Laporan</Button><Button variant="outline" icon="lucide:compass" onClick={() => onNavigate("reports")}>Jelajahi Laporan</Button></div>
        <small><AppIcon name="lucide:heart-handshake" size={16} />Bersama menjaga air, menjaga masa depan.</small>
      </div>
      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1718073700972-0235c5538fc8?auto=format&fit=crop&w=1400&q=85" alt="Sungai jernih yang mengalir melalui hutan hijau di Indonesia" />
        <div className="hero-float"><span><AppIcon name="lucide:droplets" size={20} /></span><div><strong>Air adalah tanggung jawab bersama</strong><small>Laporkan dengan informasi yang jelas</small></div></div>
      </div>
    </section>
  );
}

function Stats({ reports }: { reports: Report[] }) {
  const approved = reports.filter((report) => report.verificationStatus === "Disetujui");
  const items = [
    { icon: "lucide:files", value: approved.length, label: "Total Laporan Disetujui", note: "Dapat diakses publik", tone: "blue" },
    { icon: "lucide:circle-check-big", value: approved.filter((r) => r.handlingStatus === "Selesai").length, label: "Selesai Ditangani", note: "Penanganan ditutup", tone: "green" },
    { icon: "lucide:loader-circle", value: approved.filter((r) => r.handlingStatus === "Sedang Ditangani").length, label: "Sedang Ditangani", note: "Dalam tindak lanjut", tone: "blue" },
    { icon: "lucide:clock-3", value: approved.filter((r) => r.handlingStatus === "Belum Ditangani").length, label: "Belum Ditangani", note: "Menunggu tindak lanjut", tone: "amber" },
  ];
  return (
    <section className="stats-section section">
      <div className="section-label-row"><SimulationLabel /><p>Angka mengikuti contoh laporan pada prototype ini.</p></div>
      <div className="stats-grid">{items.map((item) => <article className="stat-card" key={item.label}><span className={`stat-icon ${item.tone}`}><AppIcon name={item.icon} size={22} /></span><div><strong>{item.value}</strong><h3>{item.label}</h3><p>{item.note}</p></div></article>)}</div>
    </section>
  );
}

type Filters = { query: string; category: string; region: string; status: string };

function FilterBar({ filters, onChange, onReset, compact = false }: { filters: Filters; onChange: (filters: Filters) => void; onReset: () => void; compact?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className={`filter-shell ${compact ? "compact" : ""}`}>
      <div className="filter-main">
        <label className="search-field"><span className="sr-only">Cari laporan</span><AppIcon name="lucide:search" /><input value={filters.query} onChange={(e) => onChange({ ...filters, query: e.target.value })} placeholder="Cari berdasarkan judul, lokasi, atau kata kunci..." /></label>
        <button className="mobile-filter-trigger" onClick={() => setMobileOpen(!mobileOpen)}><AppIcon name="lucide:sliders-horizontal" />Filter<AppIcon name={mobileOpen ? "lucide:chevron-up" : "lucide:chevron-down"} size={16} /></button>
      </div>
      <div className={`filter-options ${mobileOpen ? "open" : ""}`}>
        <label><span>Kategori</span><select value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Wilayah</span><select value={filters.region} onChange={(e) => onChange({ ...filters, region: e.target.value })}>{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Status penanganan</span><select value={filters.status} onChange={(e) => onChange({ ...filters, status: e.target.value })}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
        <Button variant="light" icon="lucide:rotate-ccw" onClick={() => { onReset(); setMobileOpen(false); }}>Reset Filter</Button>
      </div>
    </div>
  );
}

function ReportCard({ report, onOpen }: { report: Report; onOpen: (report: Report) => void }) {
  return (
    <article className="report-card" role="button" tabIndex={0} onClick={() => onOpen(report)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onOpen(report); }}>
      <div className="report-image"><img src={report.image} alt={report.imageAlt} loading="lazy" /><SimulationLabel /></div>
      <div className="report-card-body">
        <div className="report-card-top"><span className="category-badge">{report.category}</span><StatusBadge status={report.handlingStatus!} /></div>
        <h3>{report.title}</h3>
        <div className="report-meta"><span><AppIcon name="lucide:map-pin" size={16} />{report.location}</span><span><AppIcon name="lucide:calendar-days" size={16} />{report.date}</span></div>
        <button className="card-link">Lihat Detail <AppIcon name="lucide:arrow-up-right" size={16} /></button>
      </div>
    </article>
  );
}

function ReportsGrid({ reports: visibleReports, onOpen, showCount = true }: { reports: Report[]; onOpen: (report: Report) => void; showCount?: boolean }) {
  if (visibleReports.length === 0) return <div className="empty-state"><span><AppIcon name="lucide:search-x" size={28} /></span><h3>Laporan tidak ditemukan</h3><p>Tidak ada contoh laporan yang sesuai dengan pencarian dan filter saat ini.</p></div>;
  return <>{showCount && <div className="result-count"><strong>{visibleReports.length} laporan ditemukan</strong><SimulationLabel /></div>}<div className="reports-grid">{visibleReports.map((report) => <ReportCard key={report.id} report={report} onOpen={onOpen} />)}</div></>;
}

function SimulationMap({ reports, onOpen }: { reports: Report[]; onOpen: (report: Report) => void }) {
  const [selected, setSelected] = useState<Report | null>(null);
  const [zoom, setZoom] = useState(1);
  return (
    <div className="map-card">
      <div className="map-head"><div><span className="map-kicker">Peta Simulasi · {Math.round(zoom * 100)}%</span><h3>Jabodetabek</h3></div><div className="zoom-controls"><button onClick={() => setZoom(Math.min(1.2, zoom + .1))} disabled={zoom >= 1.2} aria-label="Perbesar peta"><AppIcon name="lucide:plus" /></button><button onClick={() => setZoom(Math.max(.9, zoom - .1))} disabled={zoom <= .9} aria-label="Perkecil peta"><AppIcon name="lucide:minus" /></button></div></div>
      <div className="map-illustration" style={{ backgroundSize: `${30 * zoom}px ${30 * zoom}px` }}>
        <span className="region-label jakarta">Jakarta</span><span className="region-label bekasi">Bekasi</span><span className="region-label depok">Depok</span><span className="region-label bogor">Bogor</span>
        {reports.map((report) => <button key={report.id} style={report.marker} className={`map-marker marker-${report.handlingStatus!.toLowerCase().replaceAll(" ", "-")}`} onClick={() => setSelected(report)} aria-label={`Buka ringkasan ${report.title}`}><AppIcon name="lucide:map-pin" size={26} /></button>)}
        {selected && <div className="map-popup"><button onClick={() => setSelected(null)} aria-label="Tutup ringkasan"><AppIcon name="lucide:x" size={16} /></button><span>{selected.category}</span><strong>{selected.title}</strong><small>{selected.location}</small><button className="map-popup-link" onClick={() => onOpen(selected)}>Lihat detail <AppIcon name="lucide:arrow-right" size={14} /></button></div>}
      </div>
      <div className="map-legend"><span><i className="green" />Selesai</span><span><i className="blue" />Sedang Ditangani</span><span><i className="amber" />Belum Ditangani</span></div>
      <p className="map-note"><AppIcon name="lucide:info" size={14} />Marker menunjukkan wilayah umum dari data simulasi, bukan lokasi presisi.</p>
    </div>
  );
}

function HomePage({ loggedIn, reports, onNavigate, onOpenReport }: { loggedIn: boolean; reports: Report[]; onNavigate: (page: Page) => void; onOpenReport: (report: Report) => void }) {
  return (
    <>
      <Hero loggedIn={loggedIn} onNavigate={onNavigate} />
      <Stats reports={reports} />
      <section className="section reports-preview">
        <div className="section-heading"><div><span className="eyebrow">Laporan publik</span><h2>Laporan Permasalahan Air dan Sanitasi</h2><p>Jelajahi laporan yang telah disetujui untuk membantu masyarakat mengetahui permasalahan air dan sanitasi di sekitarnya.</p></div><SimulationLabel /></div>
        <ReportsGrid reports={reports.slice(0, 4)} onOpen={onOpenReport} showCount={false} />
        <div className="center-action"><Button variant="outline" icon="lucide:arrow-right" onClick={() => onNavigate("reports")}>Lihat Semua Laporan</Button></div>
      </section>
      <section className="section map-section">
        <div className="section-heading"><div><span className="eyebrow">Persebaran wilayah</span><h2>Peta Persebaran Laporan</h2><p>Lihat persebaran contoh laporan yang sama dengan daftar laporan publik.</p></div></div>
        <div className="map-list-layout"><SimulationMap reports={reports} onOpen={onOpenReport} /><div className="map-side-list"><h3>Laporan di sekitar Jabodetabek</h3>{reports.slice(0, 3).map((report) => <button key={report.id} onClick={() => onOpenReport(report)}><span className={`mini-status mini-${report.handlingStatus!.toLowerCase().replaceAll(" ", "-")}`} /><div><strong>{report.title}</strong><small>{report.location} · {report.date}</small></div><AppIcon name="lucide:chevron-right" size={18} /></button>)}</div></div>
      </section>
      <HomeAbout onNavigate={onNavigate} />
    </>
  );
}

function HomeAbout({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <section className="about-strip section"><div className="about-illustration"><span><AppIcon name="lucide:droplets" size={44} /></span><span><AppIcon name="lucide:leaf" size={32} /></span><span><AppIcon name="lucide:heart-handshake" size={36} /></span></div><div><span className="eyebrow">Tentang WaterWatch</span><h2>Informasi yang lebih terbuka untuk kepedulian yang lebih nyata</h2><p>WaterWatch membantu masyarakat melaporkan masalah dan mengikuti perkembangan penanganan berdasarkan informasi yang tersedia.</p><Button variant="outline" onClick={() => onNavigate("about")}>Pelajari WaterWatch</Button></div></section>;
}

function ReportsPage({ reports, initialQuery, onOpen }: { reports: Report[]; initialQuery: string; onOpen: (report: Report) => void }) {
  const emptyFilters = { query: initialQuery, category: categories[0], region: regions[0], status: statuses[0] };
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [limit, setLimit] = useState(2);
  const filtered = useMemo(() => reports.filter((report) => {
    const haystack = `${report.title} ${report.location} ${report.description} ${report.category}`.toLowerCase();
    return haystack.includes(filters.query.toLowerCase()) && (filters.category === categories[0] || report.category === filters.category) && (filters.region === regions[0] || report.region === filters.region) && (filters.status === statuses[0] || report.handlingStatus === filters.status);
  }), [filters]);
  const reset = () => { setFilters({ query: "", category: categories[0], region: regions[0], status: statuses[0] }); setLimit(2); };
  return (
    <main>
      <section className="page-hero"><div><span className="eyebrow">Laporan Publik</span><h1>Temukan informasi masalah air di sekitarmu</h1><p>Semua laporan di halaman ini telah disetujui untuk dipublikasikan. Data yang tampil merupakan simulasi untuk kebutuhan prototype.</p></div><div className="page-hero-icon"><AppIcon name="lucide:map-pinned" size={36} /></div></section>
      <section className="section reports-page-section">
        <FilterBar filters={filters} onChange={(next) => { setFilters(next); setLimit(2); }} onReset={reset} />
        {filtered.length === 0 ? <div className="empty-state"><span><AppIcon name="lucide:search-x" size={28} /></span><h3>Laporan tidak ditemukan</h3><p>Coba gunakan kata kunci atau pilihan filter yang berbeda.</p><Button icon="lucide:rotate-ccw" onClick={reset}>Reset Filter</Button></div> : <>
          <div className="result-count"><strong>{filtered.length} laporan ditemukan</strong><SimulationLabel /></div>
          <div className="reports-grid">{filtered.slice(0, limit).map((report) => <ReportCard key={report.id} report={report} onOpen={onOpen} />)}</div>
          {limit < filtered.length && <div className="center-action"><Button variant="outline" icon="lucide:plus" onClick={() => setLimit(Math.min(limit + 2, filtered.length))}>Muat Lebih Banyak</Button></div>}
        </>}
      </section>
      <section className="section reports-map-block"><div className="section-heading"><div><span className="eyebrow">Peta laporan</span><h2>Peta Persebaran Laporan</h2><p>Klik marker untuk melihat ringkasan laporan terkait.</p></div></div><SimulationMap reports={reports} onOpen={onOpen} /></section>
    </main>
  );
}

function DetailPage({ report, onBack }: { report: Report; onBack: () => void }) {
  return (
    <main className="detail-page section">
      <button className="back-button" onClick={onBack}><AppIcon name="lucide:arrow-left" />Kembali ke daftar laporan</button>
      <div className="detail-grid">
        <article className="detail-main">
          <div className="detail-image"><img src={report.image} alt={report.imageAlt} /><SimulationLabel /></div>
          <div className="detail-content">
            <div className="detail-badges"><span className="category-badge">{report.category}</span><StatusBadge status={report.handlingStatus!} /><SimulationLabel /></div>
            <h1>{report.title}</h1>
            <div className="detail-meta"><span><AppIcon name="lucide:map-pin" />{report.location}</span><span><AppIcon name="lucide:calendar-days" />{report.date}</span><span><AppIcon name="lucide:hash" />{report.id}</span></div>
            <section><h2>Deskripsi laporan</h2><p>{report.description}</p></section>
            <div className="detail-facts"><div><span>Urgensi</span><strong>{report.urgency}</strong></div><div><span>Status verifikasi</span><strong>Disetujui</strong></div><div><span>Status penanganan</span><StatusBadge status={report.handlingStatus!} /></div></div>
            <div className="public-notice"><AppIcon name="lucide:shield-check" /><p>Informasi status ditampilkan berdasarkan pembaruan yang tersedia pada WaterWatch. Persetujuan publikasi bukan merupakan verifikasi ilmiah atas kondisi air.</p></div>
          </div>
        </article>
        <aside className="timeline-card">
          <div className="timeline-head"><span><AppIcon name="lucide:history" /></span><div><h2>Riwayat Status</h2><p>Pembaruan penanganan laporan</p></div></div>
          <div className="timeline">{report.timeline.map((item, index) => <div className="timeline-item" key={item.title}><span className="timeline-dot">{index === report.timeline.length - 1 && <AppIcon name="lucide:check" size={12} />}</span><div><small>{item.date}</small><h3>{item.title}</h3><p>{item.note}</p></div></div>)}</div>
          <div className="follow-up"><span>Catatan tindak lanjut</span><p>{report.handlingStatus === "Selesai" ? "Penanganan dinyatakan selesai berdasarkan pembaruan terakhir." : "Informasi berikutnya akan ditampilkan setelah pembaruan tersedia."}</p></div>
        </aside>
      </div>
    </main>
  );
}

function DashboardPage({ reports, onCreate, onOpen }: { reports: Report[]; onCreate: () => void; onOpen: (report: Report) => void }) {
  const [tab, setTab] = useState<"Semua" | VerificationStatus>("Semua");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const visible = reports.filter((report) => (tab === "Semua" || report.verificationStatus === tab) && (category === categories[0] || report.category === category) && `${report.title} ${report.description}`.toLowerCase().includes(query.toLowerCase()));
  const stats = [
    ["lucide:files", reports.length, "Total Laporan Saya", "blue"],
    ["lucide:clock-3", reports.filter((report) => report.verificationStatus === "Menunggu Verifikasi").length, "Menunggu Verifikasi", "amber"],
    ["lucide:badge-check", reports.filter((report) => report.verificationStatus === "Disetujui").length, "Disetujui", "green"],
    ["lucide:circle-x", reports.filter((report) => report.verificationStatus === "Ditolak").length, "Ditolak", "red"],
  ];
  return (
    <main>
      <section className="dashboard-hero">
        <div><SimulationLabel /><h1>Dashboard Saya</h1><p>Pantau laporan yang kamu kirim dan lihat perkembangan penanganannya.</p></div>
        <Button icon="lucide:plus" onClick={onCreate}>Buat Laporan Baru</Button>
      </section>
      <section className="section dashboard-content">
        <div className="personal-stats">{stats.map(([icon, value, label, tone]) => <article key={String(label)}><span className={`personal-stat-icon ${tone}`}><AppIcon name={String(icon)} /></span><div><strong>{value}</strong><p>{label}</p></div></article>)}</div>
        <div className="status-explainer"><AppIcon name="lucide:info" /><p><strong>Status verifikasi</strong> menunjukkan hasil pemeriksaan Admin. <strong>Status penanganan</strong> baru tersedia setelah laporan disetujui.</p></div>
        <div className="dashboard-list-head"><div><h2>Laporan Saya</h2><p>Data privat hanya dapat dilihat melalui akun demo ini.</p></div><SimulationLabel /></div>
        <div className="dashboard-tools">
          <div className="verification-tabs">{(["Semua", "Menunggu Verifikasi", "Disetujui", "Ditolak"] as const).map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
          <div className="dashboard-filter-row"><label className="search-field"><AppIcon name="lucide:search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari laporan saya..." /></label><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
        </div>
        {visible.length === 0 ? <div className="empty-state"><span><AppIcon name="lucide:file-plus-2" size={28} /></span><h3>Belum ada laporan yang kamu kirim.</h3><p>Mulai berkontribusi dengan melaporkan masalah air atau sanitasi di sekitarmu.</p><Button onClick={onCreate}>Buat Laporan Pertama</Button></div> :
          <div className="private-report-list">{visible.map((report) => <article key={report.id} className="private-report-card"><img src={report.image} alt={report.imageAlt} /><div className="private-report-body"><div className="private-report-top"><span>{report.id} · {report.createdAt}</span><VerificationBadge status={report.verificationStatus} /></div><h3>{report.title}</h3><p><AppIcon name="lucide:map-pin" size={15} />{report.location}</p><div className="private-report-badges"><span className="category-badge">{report.category}</span>{report.verificationStatus === "Disetujui" && report.handlingStatus && <StatusBadge status={report.handlingStatus} />}</div></div><Button variant="outline" onClick={() => onOpen(report)}>Lihat Detail</Button></article>)}</div>}
      </section>
    </main>
  );
}

function PrivateDetailPage({ report, onBack }: { report: Report; onBack: () => void }) {
  return (
    <main className="detail-page section">
      <button className="back-button" onClick={onBack}><AppIcon name="lucide:arrow-left" />Kembali ke Dashboard Saya</button>
      <div className="private-detail-header">
        <div><div className="detail-badges"><span className="category-badge">{report.category}</span><VerificationBadge status={report.verificationStatus} />{report.verificationStatus === "Disetujui" && report.handlingStatus && <StatusBadge status={report.handlingStatus} />}<SimulationLabel /></div><h1>{report.title}</h1><p><AppIcon name="lucide:map-pin" />{report.location}<span>·</span><AppIcon name="lucide:calendar-days" />{report.createdAt}</p></div><span className="private-id">{report.id}</span>
      </div>
      <div className="detail-grid">
        <article className="detail-main">
          <div className="detail-image"><img src={report.image} alt={report.imageAlt} /></div>
          <div className="detail-content">
            <section className="private-description"><h2>Deskripsi laporan</h2><p>{report.description}</p></section>
            <div className="detail-facts"><div><span>Urgensi</span><strong>{report.urgency}</strong></div><div><span>Status verifikasi</span><VerificationBadge status={report.verificationStatus} /></div>{report.verificationStatus === "Disetujui" && report.handlingStatus && <div><span>Status penanganan</span><StatusBadge status={report.handlingStatus} /></div>}</div>
            {report.verificationStatus === "Menunggu Verifikasi" && <div className="private-alert waiting"><AppIcon name="lucide:clock-3" /><div><strong>Sedang menunggu pemeriksaan Admin</strong><p>Status penanganan belum tersedia sebelum laporan disetujui.</p></div></div>}
            {report.verificationStatus === "Ditolak" && <div className="private-alert rejected"><AppIcon name="lucide:circle-x" /><div><strong>Alasan penolakan</strong><p>{report.rejectionReason}</p></div></div>}
            {report.adminResponses.length > 0 && <section className="admin-responses"><h2><AppIcon name="lucide:message-square-reply" />Tanggapan Admin</h2>{report.adminResponses.map((response, index) => <div key={index}><span>Admin WaterWatch</span><p>{response}</p></div>)}</section>}
          </div>
        </article>
        <aside className="timeline-card">
          <div className="timeline-head"><span><AppIcon name="lucide:history" /></span><div><h2>Riwayat Perubahan</h2><p>Riwayat privat laporan kamu</p></div></div>
          <div className="timeline">{report.timeline.map((item, index) => <div className="timeline-item" key={`${item.title}-${index}`}><span className="timeline-dot">{index === report.timeline.length - 1 && <AppIcon name="lucide:check" size={12} />}</span><div><small>{item.date}</small><h3>{item.title}</h3><p>{item.note}</p></div></div>)}</div>
        </aside>
      </div>
    </main>
  );
}

function AuthPage({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [credentialError, setCredentialError] = useState("");
  const update = (key: string, value: string) => setValues({ ...values, [key]: value });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (mode === "register" && !values.name.trim()) next.name = "Nama wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Masukkan format email yang valid.";
    if (values.password.length < 8) next.password = "Kata sandi minimal 8 karakter.";
    if (mode === "register" && values.confirm !== values.password) next.confirm = "Konfirmasi kata sandi belum sama.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    if (mode === "login" && (values.email !== "demo@waterwatch.id" || values.password !== "waterwatch")) {
      setCredentialError("Kredensial demo tidak sesuai. Gunakan akun contoh yang tersedia.");
      return;
    }
    setCredentialError("");
    onSuccess();
  };
  return (
    <main className="auth-page">
      <button className="back-button" onClick={onBack}><AppIcon name="lucide:arrow-left" />Kembali ke halaman publik</button>
      <div className="auth-card">
        <div className="auth-aside"><Logo inverse /><div><span className="eyebrow inverse">Demo WaterWatch</span><h1>{mode === "login" ? "Selamat datang kembali" : "Mulai berkontribusi bersama"}</h1><p>Gunakan data contoh. Jangan masukkan data pribadi sungguhan pada prototype ini.</p></div><div className="demo-note"><AppIcon name="lucide:info" /><span>Autentikasi ini hanya simulasi dan tidak menyimpan akun secara permanen.</span></div></div>
        <form className="auth-form" onSubmit={submit} noValidate>
          <div><span className="form-kicker">{mode === "login" ? "Masuk ke akun demo" : "Daftar akun demo"}</span><h2>{mode === "login" ? "Masuk" : "Buat Akun"}</h2></div>
          {mode === "login" && <div className="demo-credentials"><AppIcon name="lucide:key-round" /><p>Email: <strong>demo@waterwatch.id</strong><br />Password: <strong>waterwatch</strong></p></div>}
          {mode === "register" && <FormField label="Nama" icon="lucide:user" value={values.name} onChange={(v) => update("name", v)} placeholder="Nama panggilan" error={errors.name} />}
          <FormField label="Email" type="email" icon="lucide:mail" value={values.email} onChange={(v) => update("email", v)} placeholder="contoh@email.com" error={errors.email} />
          <FormField label="Password" type="password" icon="lucide:lock" value={values.password} onChange={(v) => update("password", v)} placeholder="Minimal 8 karakter" error={errors.password} />
          {mode === "register" && <FormField label="Konfirmasi password" type="password" icon="lucide:lock-keyhole" value={values.confirm} onChange={(v) => update("confirm", v)} placeholder="Ulangi password" error={errors.confirm} />}
          {credentialError && <div className="credential-error"><AppIcon name="lucide:circle-alert" />{credentialError}</div>}
          <Button type="submit" full>{mode === "login" ? "Masuk ke Demo" : "Daftar Akun Demo"}</Button>
          <p className="auth-switch">{mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}<button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setErrors({}); setCredentialError(""); }}>{mode === "login" ? "Daftar" : "Masuk"}</button></p>
        </form>
      </div>
    </main>
  );
}

function FormField({ label, value, onChange, placeholder, error, icon, type = "text" }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; error?: string; icon?: string; type?: string }) {
  return <label className="form-field"><span>{label}</span><div className={error ? "field-error" : ""}>{icon && <AppIcon name={icon} />}<input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></div>{error && <small><AppIcon name="lucide:circle-alert" size={14} />{error}</small>}</label>;
}

function CreatePage({ onCancel, onSubmit, onDone }: { onCancel: () => void; onSubmit: (values: { title: string; category: string; description: string; location: string; region: string; urgency: string; photo: string }) => string; onDone: (id: string) => void }) {
  const [values, setValues] = useState({ title: "", category: "", description: "", location: "", region: "", urgency: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const update = (key: string, value: string) => setValues({ ...values, [key]: value });
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors({ ...errors, photo: "Gunakan file JPG, PNG, atau WebP." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, photo: "Ukuran foto maksimal 5 MB." });
      return;
    }
    setPreview(URL.createObjectURL(file));
    setErrors((current) => ({ ...current, photo: "" }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    Object.entries(values).forEach(([key, value]) => { if (!value.trim()) next[key] = "Field ini wajib diisi."; });
    if (!preview) next.photo = "Pilih satu foto untuk simulasi laporan.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      const id = onSubmit({ ...values, photo: preview });
      setSubmittedId(id);
      setSubmitted(true);
    }
  };
  if (submitted) return <main className="success-page"><div className="success-card"><span><AppIcon name="lucide:send" size={32} /></span><SimulationLabel /><h1>Laporan simulasi berhasil dikirim</h1><p>Laporan baru memiliki status <strong>Menunggu Verifikasi</strong> dan tidak ditampilkan pada halaman publik sebelum disetujui Admin.</p><div className="success-id">ID Simulasi <strong>{submittedId}</strong></div><Button onClick={() => onDone(submittedId)}>Lihat di Dashboard Saya</Button></div></main>;
  return (
    <main className="create-page section">
      <button className="back-button" onClick={onCancel}><AppIcon name="lucide:arrow-left" />Batal dan kembali</button>
      <div className="create-heading"><div><span className="eyebrow">Simulasi pelaporan</span><h1>Buat Laporan Baru</h1><p>Lengkapi informasi berikut. Jangan masukkan data pribadi atau informasi lokasi presisi pada prototype.</p></div><span className="create-icon"><AppIcon name="lucide:file-plus-2" size={28} /></span></div>
      <form className="create-form" onSubmit={submit} noValidate>
        <section className="form-section"><div className="form-section-title"><span>1</span><div><h2>Informasi laporan</h2><p>Berikan ringkasan masalah yang mudah dipahami.</p></div></div><FormField label="Judul laporan" value={values.title} onChange={(v) => update("title", v)} placeholder="Contoh: Kebocoran pipa di jalan utama" error={errors.title} /><label className="form-field"><span>Kategori</span><select className={errors.category ? "select-error" : ""} value={values.category} onChange={(e) => update("category", e.target.value)}><option value="">Pilih kategori</option>{categories.slice(1).map((item) => <option key={item}>{item}</option>)}</select>{errors.category && <small><AppIcon name="lucide:circle-alert" size={14} />{errors.category}</small>}</label><label className="form-field"><span>Deskripsi</span><textarea className={errors.description ? "select-error" : ""} value={values.description} onChange={(e) => update("description", e.target.value)} placeholder="Jelaskan kondisi, dampak, dan waktu kejadian..." />{errors.description && <small><AppIcon name="lucide:circle-alert" size={14} />{errors.description}</small>}</label></section>
        <section className="form-section"><div className="form-section-title"><span>2</span><div><h2>Lokasi dan urgensi</h2><p>Gunakan wilayah umum tanpa alamat pribadi.</p></div></div><FormField label="Lokasi kejadian" value={values.location} onChange={(value) => update("location", value)} placeholder="Contoh: Dekat taman lingkungan RT 04" error={errors.location} icon="lucide:map-pin" /><label className="form-field"><span>Wilayah</span><select className={errors.region ? "select-error" : ""} value={values.region} onChange={(e) => update("region", e.target.value)}><option value="">Pilih wilayah</option>{regions.slice(1).map((item) => <option key={item}>{item}</option>)}</select>{errors.region && <small><AppIcon name="lucide:circle-alert" size={14} />{errors.region}</small>}</label><div className="form-field"><span>Tingkat urgensi</span><div className="urgency-options">{["Rendah", "Sedang", "Tinggi"].map((item) => <button type="button" className={values.urgency === item ? "active" : ""} onClick={() => update("urgency", item)} key={item}>{item}</button>)}</div>{errors.urgency && <small><AppIcon name="lucide:circle-alert" size={14} />{errors.urgency}</small>}</div></section>
        <section className="form-section"><div className="form-section-title"><span>3</span><div><h2>Foto pendukung</h2><p>Unggah simulasi foto untuk membantu memahami laporan.</p></div></div><label className={`upload-area ${errors.photo ? "upload-error" : ""}`}>{preview ? <img src={preview} alt="Preview foto laporan yang dipilih" /> : <><span><AppIcon name="lucide:image-plus" size={28} /></span><strong>Pilih foto laporan</strong><p>JPG, PNG, atau WebP · Maksimal 5 MB</p></>}<input type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleFile} /></label>{errors.photo && <small className="upload-message"><AppIcon name="lucide:circle-alert" size={14} />{errors.photo}</small>}</section>
        <div className="create-actions"><Button variant="outline" onClick={onCancel}>Batal</Button><Button type="submit" icon="lucide:send">Kirim Laporan Simulasi</Button></div>
      </form>
    </main>
  );
}

function AboutPage() {
  const steps = [
    { icon: "lucide:file-plus-2", title: "Laporkan", text: "Masyarakat menyampaikan informasi masalah air atau sanitasi." },
    { icon: "lucide:badge-check", title: "Verifikasi", text: "Informasi ditinjau sebelum dapat diakses pada halaman publik." },
    { icon: "lucide:activity", title: "Pantau", text: "Perkembangan status ditampilkan berdasarkan pembaruan tersedia." },
  ];
  return <main><section className="about-hero"><div><span className="eyebrow inverse">Tentang WaterWatch</span><h1>Menjaga air dimulai dari informasi yang terlihat</h1><p>WaterWatch adalah platform digital untuk membantu masyarakat melaporkan dan memantau permasalahan air bersih dan sanitasi.</p></div><div className="about-watermark"><AppIcon name="lucide:droplets" size={88} /></div></section><section className="section about-content"><div className="about-copy"><span className="eyebrow">Tujuan platform</span><h2>Mendukung akses informasi dan partisipasi masyarakat</h2><p>Platform ini mendukung akses informasi laporan yang telah disetujui dan membantu masyarakat mengikuti perkembangan status penanganan berdasarkan informasi yang tersedia.</p></div><div className="about-values"><div><AppIcon name="lucide:eye" /><h3>Informasi terbuka</h3><p>Laporan yang telah disetujui dapat dipantau bersama tanpa membuka data pribadi pelapor.</p></div><div><AppIcon name="lucide:users" /><h3>Partisipasi warga</h3><p>Masyarakat dapat ikut mengenali dan melaporkan masalah di lingkungan sekitar.</p></div></div></section><section className="section how-it-works"><div className="section-heading centered"><div><span className="eyebrow">Cara kerja</span><h2>Tiga langkah sederhana</h2><p>Alur informasi dirancang agar mudah dipahami oleh semua orang.</p></div></div><div className="steps-grid">{steps.map((step, index) => <article key={step.title}><span className="step-number">0{index + 1}</span><span className="step-icon"><AppIcon name={step.icon} size={26} /></span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section><section className="section sdg-card"><div className="sdg-number">6</div><div><span className="eyebrow">Sustainable Development Goals</span><h2>Clean Water and Sanitation</h2><p>WaterWatch mendukung semangat SDG 6 melalui akses informasi dan partisipasi masyarakat. WaterWatch bukan pihak yang secara langsung memperbaiki kerusakan atau menjamin penyelesaian masalah.</p></div><span className="sdg-icon"><AppIcon name="lucide:waves" size={48} /></span></section></main>;
}

function PlaceholderPage({ type }: { type: "privacy" | "terms" }) {
  return <main className="placeholder-page section"><span><AppIcon name={type === "privacy" ? "lucide:shield-check" : "lucide:file-text"} size={32} /></span><h1>{type === "privacy" ? "Kebijakan Privasi" : "Syarat Penggunaan"}</h1><p>Halaman ini merupakan placeholder untuk prototype WaterWatch dan belum memuat dokumen legal final.</p><SimulationLabel /></main>;
}

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <footer className="footer"><div className="footer-inner"><div className="footer-brand"><Logo inverse /><p>Lapor. Pantau. Jaga Air.</p><small>Platform informasi air dan sanitasi berbasis partisipasi masyarakat.</small></div><div className="footer-links"><div><h3>Navigasi</h3><button onClick={() => onNavigate("home")}>Beranda</button><button onClick={() => onNavigate("reports")}>Laporan Publik</button><button onClick={() => onNavigate("about")}>Tentang WaterWatch</button></div><div><h3>Bantuan</h3><span>pusatbantuan@contoh.id</span><span>Kanal bantuan contoh</span></div><div><h3>Informasi</h3><button onClick={() => onNavigate("privacy")}>Kebijakan Privasi</button><button onClick={() => onNavigate("terms")}>Syarat Penggunaan</button></div></div></div><div className="footer-bottom"><span>© 2026 WaterWatch. Prototype data simulasi.</span><span>Dibuat untuk mendukung kepedulian terhadap air.</span></div></footer>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [allReports, setAllReports] = useState<Report[]>(initialReports);
  const [selectedReport, setSelectedReport] = useState(initialReports[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authIntent, setAuthIntent] = useState<"dashboard" | "create">("dashboard");
  const publicReports = allReports.filter((report) => report.verificationStatus === "Disetujui");
  const myReports = allReports.filter((report) => report.userId === currentUserId);
  const navigate = (next: Page) => {
    if (next === "auth") setAuthIntent("dashboard");
    if (!loggedIn && (next === "create" || next === "dashboard" || next === "privateDetail")) {
      setAuthIntent(next === "create" ? "create" : "dashboard");
      setPage("auth");
    } else {
      setPage(next);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openReport = (report: Report) => {
    if (report.verificationStatus !== "Disetujui") return;
    setSelectedReport(report);
    navigate("detail");
  };
  const openPrivateReport = (report: Report) => {
    if (!loggedIn || report.userId !== currentUserId) {
      navigate("home");
      return;
    }
    setSelectedReport(report);
    navigate("privateDetail");
  };
  const search = (query: string) => { setSearchQuery(query); navigate("reports"); };
  const addReport = (values: { title: string; category: string; description: string; location: string; region: string; urgency: string; photo: string }) => {
    const id = `WW-DRAFT-${String(allReports.length + 1).padStart(3, "0")}`;
    const report: Report = {
      id,
      userId: currentUserId,
      title: values.title,
      category: values.category,
      description: values.description,
      location: `${values.location}, ${values.region}`,
      region: values.region,
      urgency: values.urgency as Report["urgency"],
      photo: values.photo,
      createdAt: "Hari ini",
      verificationStatus: "Menunggu Verifikasi",
      handlingStatus: null,
      rejectionReason: null,
      adminResponses: [],
      date: "Hari ini",
      image: values.photo,
      imageAlt: `Foto pendukung untuk ${values.title}`,
      marker: { left: "50%", top: "50%" },
      timeline: [{ date: "Hari ini", title: "Laporan dikirim", note: "Laporan sedang menunggu pemeriksaan Admin." }],
    };
    setAllReports((current) => [report, ...current]);
    return id;
  };
  const finishAuth = () => {
    setLoggedIn(true);
    setPage(authIntent);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  let content: ReactNode;
  if (page === "home") content = <HomePage loggedIn={loggedIn} reports={publicReports} onNavigate={navigate} onOpenReport={openReport} />;
  else if (page === "reports") content = <ReportsPage key={searchQuery} reports={publicReports} initialQuery={searchQuery} onOpen={openReport} />;
  else if (page === "detail") content = <DetailPage report={selectedReport} onBack={() => navigate("reports")} />;
  else if (page === "dashboard") content = loggedIn ? <DashboardPage reports={myReports} onCreate={() => navigate("create")} onOpen={openPrivateReport} /> : <AuthPage onBack={() => navigate("home")} onSuccess={finishAuth} />;
  else if (page === "privateDetail") content = loggedIn && selectedReport.userId === currentUserId ? <PrivateDetailPage report={selectedReport} onBack={() => navigate("dashboard")} /> : <AuthPage onBack={() => navigate("home")} onSuccess={finishAuth} />;
  else if (page === "about") content = <AboutPage />;
  else if (page === "auth") content = <AuthPage onBack={() => navigate("home")} onSuccess={finishAuth} />;
  else if (page === "create") content = loggedIn ? <CreatePage onCancel={() => navigate("dashboard")} onSubmit={addReport} onDone={() => navigate("dashboard")} /> : <AuthPage onBack={() => navigate("home")} onSuccess={finishAuth} />;
  else content = <PlaceholderPage type={page} />;
  return (
    <div className="app">
      <Header page={page} loggedIn={loggedIn} onNavigate={navigate} onSearch={search} onLogout={() => { setLoggedIn(false); navigate("home"); }} />
      {content}
      {page !== "auth" && page !== "create" && <Footer onNavigate={navigate} />}
    </div>
  );
}
