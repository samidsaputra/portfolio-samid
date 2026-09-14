// Dummy data for landing page development
// This will be replaced with Supabase data later

export const dummyProfile = {
  id: "1",
  full_name: "M Dimas Saputra",
  tagline: "Membangun sistem yang presisi, bukan sekadar jalan.",
  about_text:
    "Saya adalah seorang Fullstack Developer yang berfokus pada ekosistem web modern. Dengan pengalaman lebih dari 3 tahun, saya memiliki ketertarikan mendalam dalam arsitektur sistem, performa aplikasi, dan developer experience. Saya percaya bahwa kode yang baik bukan hanya yang berjalan, tetapi yang bisa dipahami, di-maintain, dan di-scale.",
  photo_url: null,
  cv_url: "#",
  linkedin_url: "https://www.linkedin.com/in/samidsaputra/",
  github_url: "https://github.com/samidsaputra",
  email: "hello@samidsaputra.com",
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

export const dummyExperiences = [
  {
    id: "1",
    role: "Fullstack Developer",
    institution: "PT Teknologi Nusantara",
    start_date: "2023-06-01",
    end_date: null,
    description:
      "Mengembangkan dan memelihara aplikasi web skala enterprise menggunakan Next.js, TypeScript, dan PostgreSQL. Memimpin migrasi arsitektur monolith ke microservices.",
    display_order: 1,
  },
  {
    id: "2",
    role: "Frontend Developer",
    institution: "Startup Digital Kreatif",
    start_date: "2022-01-01",
    end_date: "2023-05-31",
    description:
      "Membangun antarmuka pengguna responsif dengan React dan Tailwind CSS. Berkolaborasi dengan tim desain untuk mengimplementasikan design system yang konsisten.",
    display_order: 2,
  },
  {
    id: "3",
    role: "Web Developer Intern",
    institution: "Agensi Digital Maju",
    start_date: "2021-06-01",
    end_date: "2021-12-31",
    description:
      "Mengerjakan proyek klien menggunakan WordPress dan Laravel. Belajar best practices dalam pengembangan web dan version control.",
    display_order: 3,
  },
  {
    id: "4",
    role: "Lead of Technology Division",
    institution: "Himpunan Mahasiswa Informatika",
    start_date: "2020-09-01",
    end_date: "2021-08-31",
    description:
      "Memimpin divisi teknologi dalam organisasi mahasiswa. Menyelenggarakan workshop dan hackathon untuk meningkatkan kemampuan teknis anggota.",
    display_order: 4,
  },
];

export const dummyTechStacks = [
  // Frontend
  { id: "1", name: "React", icon_url: null, category: "frontend", display_order: 1 },
  { id: "2", name: "Next.js", icon_url: null, category: "frontend", display_order: 2 },
  { id: "3", name: "TypeScript", icon_url: null, category: "frontend", display_order: 3 },
  { id: "4", name: "Tailwind CSS", icon_url: null, category: "frontend", display_order: 4 },
  { id: "5", name: "Vue.js", icon_url: null, category: "frontend", display_order: 5 },
  // Backend
  { id: "6", name: "Node.js", icon_url: null, category: "backend", display_order: 1 },
  { id: "7", name: "Express", icon_url: null, category: "backend", display_order: 2 },
  { id: "8", name: "Python", icon_url: null, category: "backend", display_order: 3 },
  { id: "9", name: "Laravel", icon_url: null, category: "backend", display_order: 4 },
  // Database
  { id: "10", name: "PostgreSQL", icon_url: null, category: "database", display_order: 1 },
  { id: "11", name: "Supabase", icon_url: null, category: "database", display_order: 2 },
  { id: "12", name: "MongoDB", icon_url: null, category: "database", display_order: 3 },
  { id: "13", name: "Redis", icon_url: null, category: "database", display_order: 4 },
  // Tools
  { id: "14", name: "Git", icon_url: null, category: "tools", display_order: 1 },
  { id: "15", name: "Docker", icon_url: null, category: "tools", display_order: 2 },
  { id: "16", name: "Figma", icon_url: null, category: "tools", display_order: 3 },
  { id: "17", name: "VS Code", icon_url: null, category: "tools", display_order: 4 },
  { id: "18", name: "Vercel", icon_url: null, category: "tools", display_order: 5 },
];

export const dummyProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "Platform e-commerce fullstack dengan fitur keranjang belanja, pembayaran, dan dashboard admin. Dibangun dengan arsitektur yang scalable dan performa tinggi.",
    thumbnail_url: null,
    demo_url: "https://demo.example.com",
    github_url: "https://github.com/samidsaputra/ecommerce",
    category: "Fullstack",
    is_featured: true,
    display_order: 1,
    created_at: "2024-03-15",
    tech_stacks: [
      { id: "2", name: "Next.js" },
      { id: "3", name: "TypeScript" },
      { id: "11", name: "Supabase" },
      { id: "4", name: "Tailwind CSS" },
    ],
  },
  {
    id: "2",
    title: "Task Management App",
    slug: "task-management-app",
    description:
      "Aplikasi manajemen tugas real-time dengan fitur kolaborasi tim, drag & drop kanban board, dan notifikasi push.",
    thumbnail_url: null,
    demo_url: "https://demo.example.com",
    github_url: "https://github.com/samidsaputra/taskapp",
    category: "Fullstack",
    is_featured: true,
    display_order: 2,
    created_at: "2024-01-20",
    tech_stacks: [
      { id: "1", name: "React" },
      { id: "6", name: "Node.js" },
      { id: "10", name: "PostgreSQL" },
    ],
  },
  {
    id: "3",
    title: "Portfolio Generator",
    slug: "portfolio-generator",
    description:
      "Tool untuk membuat website portfolio secara otomatis dari template yang telah disediakan. Mendukung customisasi tema dan deploy ke Vercel.",
    thumbnail_url: null,
    demo_url: "https://demo.example.com",
    github_url: "https://github.com/samidsaputra/portgen",
    category: "Frontend",
    is_featured: false,
    display_order: 3,
    created_at: "2023-11-10",
    tech_stacks: [
      { id: "2", name: "Next.js" },
      { id: "4", name: "Tailwind CSS" },
      { id: "18", name: "Vercel" },
    ],
  },
  {
    id: "4",
    title: "REST API Boilerplate",
    slug: "rest-api-boilerplate",
    description:
      "Boilerplate untuk REST API dengan autentikasi JWT, rate limiting, logging terstruktur, dan dokumentasi Swagger otomatis.",
    thumbnail_url: null,
    demo_url: null,
    github_url: "https://github.com/samidsaputra/api-boilerplate",
    category: "Backend",
    is_featured: false,
    display_order: 4,
    created_at: "2023-08-05",
    tech_stacks: [
      { id: "6", name: "Node.js" },
      { id: "7", name: "Express" },
      { id: "10", name: "PostgreSQL" },
      { id: "15", name: "Docker" },
    ],
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    slug: "analytics-dashboard",
    description:
      "Dashboard analytics interaktif dengan visualisasi data real-time, filtering dinamis, dan export laporan ke PDF.",
    thumbnail_url: null,
    demo_url: "https://demo.example.com",
    github_url: "https://github.com/samidsaputra/analytics",
    category: "Frontend",
    is_featured: true,
    display_order: 5,
    created_at: "2024-02-28",
    tech_stacks: [
      { id: "1", name: "React" },
      { id: "3", name: "TypeScript" },
      { id: "4", name: "Tailwind CSS" },
    ],
  },
  {
    id: "6",
    title: "Chat Application",
    slug: "chat-application",
    description:
      "Aplikasi chat real-time dengan fitur group chat, file sharing, dan end-to-end encryption menggunakan WebSocket.",
    thumbnail_url: null,
    demo_url: "https://demo.example.com",
    github_url: "https://github.com/samidsaputra/chatapp",
    category: "Fullstack",
    is_featured: false,
    display_order: 6,
    created_at: "2023-09-22",
    tech_stacks: [
      { id: "2", name: "Next.js" },
      { id: "6", name: "Node.js" },
      { id: "13", name: "Redis" },
    ],
  },
];

export const dummyCertificates = [
  {
    id: "1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issue_date: "2024-01-15",
    certificate_url: "https://aws.amazon.com/verification",
    image_url: null,
    display_order: 1,
  },
  {
    id: "2",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (via Coursera)",
    issue_date: "2023-09-20",
    certificate_url: "https://coursera.org/verify",
    image_url: null,
    display_order: 2,
  },
  {
    id: "3",
    title: "Google UX Design Professional Certificate",
    issuer: "Google (via Coursera)",
    issue_date: "2023-06-10",
    certificate_url: "https://coursera.org/verify",
    image_url: null,
    display_order: 3,
  },
  {
    id: "4",
    title: "Dicoding — Menjadi React Web Developer Expert",
    issuer: "Dicoding Indonesia",
    issue_date: "2023-03-25",
    certificate_url: "https://dicoding.com/certificates",
    image_url: null,
    display_order: 4,
  },
];
