# 👶 TEMAN BUNDA - Website Blog & Panduan MPASI Masa Golden Age

Website blog dan panduan nutrisi profesional **TEMAN BUNDA** yang dibangun menggunakan **Astro v4 (SSG)**, **Tailwind CSS**, dan **Notion API sebagai Headless CMS**.

Website ini didesain khusus dengan estetika **Pink & Putih** yang bersih, modern, ramah pengguna, 100% responsif (Mobile First), dan memenuhi standar **Technical & On-Page SEO 100%**.

---

## 🚀 Fitur Unggulan Website

1. **Astro v4 Super Cepat (SSG):** Skor performa tinggi dan Core Web Vitals optimal.
2. **Notion Headless CMS:** Kelola semua artikel blog, resep, dan foto langsung dari aplikasi Notion tanpa perlu menyentuh kode.
3. **Smart Fallback Dataset:** Website tetap dapat berjalan dan di-build secara mulus dengan data panduan lokal berkualitas tinggi meskipun Notion API belum dihubungkan.
4. **Full Technical & On-Page SEO:**
   - Meta tags OpenGraph & Twitter Cards dinamis.
   - Otomatis membuat `sitemap.xml` dan `robots.txt`.
   - Implementasi Schema.org JSON-LD (`Article`, `BreadcrumbList`, `Organization`, `WebSite`).
   - Breadcrumbs navigation ramah Google crawler.
   - Lazy loading image dengan alt text otomatis.
5. **Dark & Light Mode:** Toggle tema instan dengan preferensi lokal tersimpan.

---

## 📋 Struktur Direktori Project

```
/bismillah
├── public/
│   ├── favicon.svg          # Logo icon brand pink
│   └── robots.txt           # Crawler instructions
├── src/
│   ├── components/
│   │   ├── BlogCard.astro   # Kartu artikel blog responsive
│   │   ├── Breadcrumbs.astro# Navigasi rekam jejak halaman
│   │   ├── Footer.astro     # Footer dengan kategori & disclaimer
│   │   ├── Hero.astro       # Hero section utama ber-H1 SEO
│   │   ├── Navbar.astro     # Navigasi atas + toggle dark mode
│   │   └── SEO.astro        # Komponen pusat Meta & JSON-LD
│   ├── layouts/
│   │   └── Layout.astro     # Master layout
│   ├── lib/
│   │   └── notion.ts        # Client Notion API, parser & fallback data
│   ├── pages/
│   │   ├── 404.astro        # Halaman error not found
│   │   ├── about.astro      # Tentang Teman Bunda & Visi Misi
│   │   ├── blog/
│   │   │   ├── [slug].astro # Detail artikel blog dinamis
│   │   │   └── index.astro  # Katalog artikel & filter tag
│   │   ├── index.astro      # Homepage berkonversi tinggi
│   │   ├── kontak.astro     # Halaman konsultasi & formulir
│   │   └── panduan-gizi.astro # Panduan komprehensif Golden Age
│   └── styles/
│       └── global.css       # Tailwind + Typography + Pink theme tokens
├── .env.example             # Contoh format token
├── astro.config.mjs         # Konfigurasi Astro, Tailwind & Sitemap
├── package.json             # Dependensi project
├── tailwind.config.mjs      # Konfigurasi warna & token Tailwind
└── README.md                # Panduan lengkap ini
```

---

## 📝 Panduan Setup Notion CMS (Untuk Pemula)

Ikuti langkah-langkah mudah berikut untuk mengaktifkan konten dari Notion Anda:

### Langkah 1: Buat Database di Notion
1. Buka akun [Notion](https://www.notion.so) Anda.
2. Buat halaman baru (*Add a page*), lalu pilih opsi **Table view** -> **New database**.
3. Beri judul database misalnya: `Teman Bunda MPASI Database`.
4. Tambahkan kolom properti dengan nama dan tipe data **persis** seperti di bawah ini:

| Nama Properti | Tipe Properti di Notion | Keterangan |
| :--- | :--- | :--- |
| **Title** | `Title` *(Bawaan Notion)* | Judul artikel |
| **Slug** | `Text` | URL bersih (contoh: `resep-mpasi-hati-ayam-santan`) |
| **Status** | `Select` | Beri opsi: `Draft` dan `Published` (Hanya status `Published` yang akan tayang) |
| **Date** | `Date` | Tanggal publikasi artikel |
| **Tags** | `Multi-select` | Kategori (contoh: `MPASI 6 Bulan`, `Golden Age`, `BB Booster`, `Anti GTM`) |
| **Excerpt** | `Text` | Ringkasan isi artikel (150-160 karakter untuk meta description) |
| **Cover** | `Files & media` | Gambar sampul artikel |

---

### Langkah 2: Buat Notion Integration & Dapatkan `NOTION_TOKEN`
1. Kunjungi: [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Klik tombol **"+ New integration"**.
3. Masukkan nama (misal: `Teman Bunda Website`), pilih *Associated workspace* Anda.
4. Klik **Submit**.
5. Salin kode **Internal Integration Secret** (berawalan `secret_...`). Ini adalah **`NOTION_TOKEN`** Anda.

---

### Langkah 3: Dapatkan `NOTION_DATABASE_ID`
1. Buka database Notion yang telah Anda buat di browser.
2. Salin URL di address bar. Format URL Notion biasanya:
   ```
   https://www.notion.so/myworkspace/a8aec43384f447ed84390e8e42c2e089?v=...
   ```
3. Bagian 32 karakter acak setelah nama workspace sebelum tanda tanya `?` adalah **Database ID** Anda:
   ```
   a8aec43384f447ed84390e8e42c2e089
   ```

---

### Langkah 4: Hubungkan Integration ke Database Notion (PENTING!)
1. Di halaman Database Notion Anda, klik tombol titik tiga **`...`** di pojok kanan atas.
2. Pilih menu **"Connect to"** (atau *Add connections*).
3. Cari nama integrasi yang Anda buat di Langkah 2 (misal: `Teman Bunda Website`) dan klik **Confirm**.

---

## 💻 Cara Menjalankan di Komputer Lokal

### 1. Prasyarat: Pastikan Node.js Terpasang
Jika di komputer belum terpasang Node.js:
- Download dan pasang installer resmi dari [https://nodejs.org](https://nodejs.org) (pilih versi LTS).

### 2. Install Dependensi
Buka Terminal / PowerShell di folder project ini, lalu jalankan:
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file `.env` di direktori utama (atau edit file `.env` yang sudah disediakan):
```env
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
*(Jika dikosongkan, website otomatis menggunakan data demo bawaan yang tetap berfungsi 100%)*

### 4. Jalankan Local Server
```bash
npm run dev
```
Buka browser Anda di `http://localhost:4321`.

---

## 🌐 Cara Push ke GitHub

1. Buka terminal di folder project:
```bash
git init
git add .
git commit -m "feat: inisialisasi website Teman Bunda MPASI Astro Tailwind"
```
2. Buat repository baru di [GitHub](https://github.com/new).
3. Hubungkan dan push kode Anda:
```bash
git branch -M main
git remote add origin https://github.com/username-anda/teman-bunda.git
git push -u origin main
```

---

## 🚀 Cara Deploy ke Vercel (Gratis & Cepat)

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik **"Add New..."** -> **"Project"**.
3. Pilih repository GitHub `teman-bunda` yang baru saja Anda push, lalu klik **Import**.
4. Di bagian **Environment Variables**, tambahkan:
   - Key: `NOTION_TOKEN` | Value: `secret_xxxxxxxx...`
   - Key: `NOTION_DATABASE_ID` | Value: `xxxxxxxx...`
5. Klik tombol **Deploy**.
6. Website Anda akan online dalam hitungan detik dengan domain `https://temanbunda.vercel.app`! 🎉

---

## 💖 Hak Cipta & Lisensi
Dibuat khusus untuk project **TEMAN BUNDA** - Berikan Gizi Terbaik untuk Buah Hati dengan MPASI.
