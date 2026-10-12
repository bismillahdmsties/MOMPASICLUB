import { Client } from '@notionhq/client';

export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  date: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  author: string;
  readingTime: string;
  contentHtml?: string;
  blocks?: any[];
}

// Inisialisasi Notion Client jika Token tersedia
const notionToken = process.env.NOTION_TOKEN || import.meta.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID || import.meta.env.NOTION_DATABASE_ID;

const notion = notionToken ? new Client({ auth: notionToken }) : null;

/**
 * Fungsi pembantu untuk membuat slug URL ramah SEO (lowercased, tanpa karakter khusus)
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Ganti spasi dengan tanda minus
    .replace(/[^\w\-]+/g, '') // Hapus semua karakter non-alfanumerik
    .replace(/\-\-+/g, '-'); // Ganti multi minus dengan single minus
}

/**
 * Data Fallback Berkualitas Tinggi saat Notion API belum dihubungkan.
 * Memastikan website bisa langsung dijalankan (build/dev) dengan data MPASI & Golden Age.
 */
const fallbackPosts: NotionPost[] = [
  {
    id: '1',
    title: 'Pentingnya Keseimbangan Gizi untuk Pertumbuhan Anak di Masa Golden Age',
    slug: 'pentingnya-keseimbangan-gizi-golden-age',
    status: 'Published',
    date: '2026-09-15',
    tags: ['Golden Age', 'Gizi Anak', 'MPASI Pertama', 'Nutrisi Otak'],
    excerpt: 'Memahami nutrisi makro dan mikro esensial di 1000 hari pertama kehidupan untuk optimasi kecerdasan dan pertumbuhan fisik buah hati Bunda.',
    coverImage: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80',
    author: 'Tim Ahli Gizi MOMPASICLUB',
    readingTime: '5 menit baca',
    contentHtml: `
      <h2>Mengapa Masa Golden Age Sangat Krusial?</h2>
      <p>Masa <em>Golden Age</em> (0-2 tahun atau 1000 Hari Pertama Kehidupan) adalah jendela emas perkembangan otak anak yang mencapai 80% dari kapasitas otak dewasa. Pada periode ini, setiap suapan MPASI yang Bunda berikan memiliki dampak langsung pada pembentukan sinapsis sel saraf otak dan daya tahan tubuh si kecil.</p>
      
      <div class="callout">
        <span class="text-2xl">💡</span>
        <div>
          <strong>Pesan Dokter Spesialis Anak:</strong> MPASI bukan sekadar mengenalkan rasa, melainkan fondasi utama pencegahan <em>stunting</em> dan pembentukan kebiasaan makan sehat seumur hidup.
        </div>
      </div>

      <h2>Komposisi Menu 4 Bintang yang Seimbang</h2>
      <p>Menurut rekomendasi WHO dan Ikatan Dokter Anak Indonesia (IDAI), menu MPASI terbaik haruslah menu lengkap yang mengandung:</p>
      <ul>
        <li><strong>Karbohidrat Utama:</strong> Beras putih/merah, kentang, oat, atau ubi jalar sebagai sumber energi utama aktivitas bayi.</li>
        <li><strong>Protein Hewani (Zat Besi Tinggi):</strong> Daging sapi giling, hati ayam, ikan kembung/salmon, dan telur untuk mencegah anemia defisiensi besi.</li>
        <li><strong>Lemak Tambahan (Fat Booster):</strong> Minyak kelapa, butter (UB), santan segar, atau minyak zaitun untuk penyerapan vitamin A, D, E, K dan menambah kalori.</li>
        <li><strong>Sayur & Buah Kaya Serat:</strong> Wortel, labu siam, brokoli, dan alpukat secukupnya untuk pengenalan tekstur dan mikronutrien.</li>
      </ul>

      <blockquote>
        "Memberikan protein hewani sejak hari pertama MPASI terbukti secara klinis mempercepat pertumbuhan linear dan perkembangan kognitif bayi."
      </blockquote>

      <h2>Tips Praktis Mengatur Jadwal Makan Bayi</h2>
      <p>Konsistensi jadwal makan sangat membantu membentuk rasa lapar dan kenyang yang alami pada bayi:</p>
      <ol>
        <li>06.00 WIB: ASI / Susu Formula bangun tidur</li>
        <li>08.00 WIB: Makan Pagi (MPASI Menu Utama)</li>
        <li>10.00 WIB: Snack Sehat / Buah Potong</li>
        <li>12.30 WIB: Makan Siang (MPASI Menu Utama)</li>
        <li>15.30 WIB: ASI / Snack Sore</li>
        <li>18.30 WIB: Makan Malam (MPASI Menu Utama)</li>
      </ol>
      <p>Selalu ciptakan suasana makan yang menyenangkan tanpa paksaan (<em>responsive feeding</em>).</p>
    `
  },
  {
    id: '2',
    title: 'Panduan Lengkap MPASI 6 Bulan Pertama: Tekstur, Porsi, & Jadwal',
    slug: 'panduan-lengkap-mpasi-6-bulan-pertama',
    status: 'Published',
    date: '2026-09-20',
    tags: ['MPASI 6 Bulan', 'Panduan Pemula', 'Jadwal Makan', 'Ibu Newborn'],
    excerpt: 'Langkah demi langkah memulai MPASI pertama si kecil dengan tenang, tekstur puree yang tepat, serta tips mengatasi kebingungan ibu baru.',
    coverImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=80',
    author: 'Bunda Sarah, S.Gz',
    readingTime: '4 menit baca',
    contentHtml: `
      <h2>Tanda Si Kecil Siap Memulai MPASI</h2>
      <p>Tepat di usia 6 bulan, ASI saja sudah tidak mencukupi 100% kebutuhan kalori dan zat besi bayi. Pastikan si kecil menunjukkan tanda kesiapan:</p>
      <ul>
        <li>Sudah mampu duduk tegak dengan leher stabil dan kepala tegak tanpa goyang.</li>
        <li>Refleks menjulurkan lidah (<em>tongue-thrust reflex</em>) mulai berkurang.</li>
        <li>Menunjukkan ketertarikan tinggi saat melihat orang dewasa makan.</li>
      </ul>

      <h2>Aturan Tekstur Puree yang Benar</h2>
      <p>Tekstur awal adalah bubur kental yang disaring (semi-liquid ke semi-solid). Uji kekentalan dengan memiringkan sendok: bubur tidak boleh langsung tumpah seperti air, melainkan jatuh perlahan.</p>

      <div class="callout">
        <span class="text-2xl">🥣</span>
        <div>
          <strong>Porsi Awal:</strong> Mulai dari 2-3 sendok makan dewasa per sesi makan, 2 kali sehari di minggu pertama. Tingkatkan secara bertahap sesuai sinyal kenyang bayi.
        </div>
      </div>
    `
  },
  {
    id: '3',
    title: '5 Resep MPASI Penambah Berat Badan (BB Booster) Berbahan Lokal',
    slug: '5-resep-mpasi-penambah-berat-badan-lokal',
    status: 'Published',
    date: '2026-09-25',
    tags: ['Resep MPASI', 'BB Booster', 'Bahan Lokal', 'Anti GTM'],
    excerpt: 'Koleksi resep MPASI padat kalori menggunakan santan, hati ayam, telur puyuh, dan ikan kembung yang lezat dan disukai bayi.',
    coverImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=1200&q=80',
    author: 'Chef Bunda Rina',
    readingTime: '6 menit baca',
    contentHtml: `
      <h2>1. Bubur Hati Ayam Santan Gurih</h2>
      <p>Hati ayam merupakan sumber zat besi <em>heme</em> tertinggi yang paling mudah diserap tubuh bayi untuk mencegah anemia.</p>
      <ul>
        <li><strong>Bahan:</strong> Beras putih 3 sdm, Hati ayam kampung 1 buah, Santan kental 30 ml, Wortel parut 1 sdm, Bawang putih & merah geprek.</li>
        <li><strong>Cara Buat:</strong> Tumis bumbu aromatik, masukkan hati ayam hingga berubah warna. Tambahkan air dan beras, masak hingga menjadi bubur lunak. Saring hangat.</li>
      </ul>

      <h2>2. Puree Ikan Kembung Kuah Kuning</h2>
      <p>Tahukah Bunda? Ikan kembung lokal memiliki kandungan Omega-3 dan DHA yang lebih tinggi dibandingkan ikan salmon impor!</p>
    `
  },
  {
    id: '4',
    title: 'Cara Mengatasi Gerakan Tutup Mulut (GTM) pada Bayi Tanpa Stres',
    slug: 'cara-mengatasi-gtm-pada-bayi-tanpa-stres',
    status: 'Published',
    date: '2026-09-27',
    tags: ['Tips Parenting', 'Anti GTM', 'Psikologi Bayi', 'Ibu Newborn'],
    excerpt: 'Solusi jitu mengenali penyebab GTM: tumbuh gigi, bosan rasa, tekstur terlalu kasar, atau feeding rules yang perlu diperbaiki.',
    coverImage: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Anita, Sp.A',
    readingTime: '5 menit baca',
    contentHtml: `
      <h2>Membedakan GTM Fisiologis dan Perilaku</h2>
      <p>GTM bukan kegagalan Bunda! Ada banyak faktor alami seperti gusi yang bengkak karena tumbuh gigi (<em>teething</em>) atau rasa lelah. Terapkan <em>Feeding Rules</em> 30 menit maksimal setiap kali makan.</p>
    `
  }
];

/**
 * Mengubah blocks Notion menjadi representasi HTML
 */
function renderNotionBlocksToHtml(blocks: any[]): string {
  if (!blocks || blocks.length === 0) return '';

  return blocks
    .map((block) => {
      const type = block.type;
      const value = block[type];

      const richTextToHtml = (richTextArray: any[]) => {
        if (!richTextArray) return '';
        return richTextArray
          .map((item) => {
            let text = item.plain_text;
            if (item.annotations?.bold) text = `<strong>${text}</strong>`;
            if (item.annotations?.italic) text = `<em>${text}</em>`;
            if (item.annotations?.code) text = `<code class="bg-brand-50 text-brand-600 px-1 py-0.5 rounded text-sm">${text}</code>`;
            if (item.href) text = `<a href="${item.href}" target="_blank" rel="noopener noreferrer" class="text-brand-600 underline font-medium">${text}</a>`;
            return text;
          })
          .join('');
      };

      switch (type) {
        case 'paragraph':
          return `<p>${richTextToHtml(value.rich_text)}</p>`;
        case 'heading_1':
          return `<h2 class="text-2xl font-bold mt-6 mb-3">${richTextToHtml(value.rich_text)}</h2>`;
        case 'heading_2':
          return `<h2 class="text-xl font-bold mt-5 mb-2">${richTextToHtml(value.rich_text)}</h2>`;
        case 'heading_3':
          return `<h3 class="text-lg font-bold mt-4 mb-2">${richTextToHtml(value.rich_text)}</h3>`;
        case 'bulleted_list_item':
          return `<li>${richTextToHtml(value.rich_text)}</li>`;
        case 'numbered_list_item':
          return `<li>${richTextToHtml(value.rich_text)}</li>`;
        case 'quote':
          return `<blockquote>${richTextToHtml(value.rich_text)}</blockquote>`;
        case 'callout':
          return `<div class="callout"><span class="text-2xl">${value.icon?.emoji || '💡'}</span><div>${richTextToHtml(value.rich_text)}</div></div>`;
        case 'image':
          const src = value.type === 'external' ? value.external.url : value.file?.url;
          const caption = value.caption ? richTextToHtml(value.caption) : 'Foto Panduan MPASI MOMPASICLUB';
          return `<figure class="my-6"><img src="${src}" alt="${caption}" loading="lazy" class="w-full rounded-2xl shadow-md object-cover max-h-96" /><figcaption class="text-center text-sm text-gray-500 mt-2">${caption}</figcaption></figure>`;
        case 'divider':
          return `<hr class="my-8 border-brand-100 dark:border-brand-900" />`;
        default:
          return '';
      }
    })
    .join('\n');
}

/**
 * Mengambil daftar artikel dari Notion Database (atau fallback)
 */
export async function getDatabase(): Promise<NotionPost[]> {
  if (!notion || !databaseId) {
    // Mode offline / fallback
    return fallbackPosts.filter((p) => p.status === 'Published');
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const posts: NotionPost[] = response.results.map((page: any) => {
      const props = page.properties;

      const titleProp = props.Title || props.Tittle || Object.values(props).find((p: any) => p.type === 'title');
      const title = titleProp?.title?.[0]?.plain_text || 'Judul Tanpa Nama';
      const slugRaw = props.Slug?.rich_text?.[0]?.plain_text || title;
      const slug = slugify(slugRaw);
      const date = props.Date?.date?.start || new Date().toISOString().split('T')[0];
      const tagProp = props.Tags || props.Tag;
      const tags = tagProp?.multi_select?.map((t: any) => t.name) || ['MPASI'];
      const excerptProp = props.Excerpt || props.Expert;
      const excerpt = excerptProp?.rich_text?.[0]?.plain_text || 'Panduan nutrisi MPASI terbaik untuk buah hati di masa golden age.';
      
      let coverImage = 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80';
      if (page.cover) {
        coverImage = page.cover.type === 'external' ? page.cover.external.url : page.cover.file.url;
      } else if (props.Cover?.files?.[0]) {
        coverImage = props.Cover.files[0].file?.url || props.Cover.files[0].external?.url || coverImage;
      }

      return {
        id: page.id,
        title,
        slug,
        status: 'Published',
        date,
        tags,
        excerpt,
        coverImage,
        author: 'Tim MOMPASICLUB',
        readingTime: '5 menit baca',
      };
    });

    // Jika database belum memiliki artikel berstatus 'Published', tampilkan data demo
    if (posts.length === 0) {
      return fallbackPosts.filter((p) => p.status === 'Published');
    }

    return posts;
  } catch (error) {
    console.warn('⚠️ Gagal terhubung ke Notion API. Menggunakan database lokal MOMPASICLUB:', error);
    return fallbackPosts.filter((p) => p.status === 'Published');
  }
}

/**
 * Mengambil detail artikel berdasarkan slug beserta isi kontennya
 */
export async function getPostBySlug(slug: string): Promise<NotionPost | null> {
  const posts = await getDatabase();
  const matched = posts.find((p) => p.slug === slug);

  if (!matched) return null;

  // Jika menggunakan fallback data
  const fallback = fallbackPosts.find((p) => p.slug === slug);
  if (!notion || !databaseId || fallback) {
    return {
      ...matched,
      contentHtml: fallback?.contentHtml || '<p>Konten artikel sedang disiapkan.</p>',
    };
  }

  try {
    const blocksResponse = await notion.blocks.children.list({
      block_id: matched.id,
      page_size: 100,
    });

    const contentHtml = renderNotionBlocksToHtml(blocksResponse.results);

    return {
      ...matched,
      contentHtml: contentHtml || '<p>Artikel ini belum memiliki konten teks.</p>',
      blocks: blocksResponse.results,
    };
  } catch (error) {
    console.error(`Gagal mengambil konten artikel untuk slug ${slug}:`, error);
    return {
      ...matched,
      contentHtml: '<p>Konten artikel sedang dimuat dari arsip lokal.</p>',
    };
  }
}

/**
 * Mengambil artikel terbaru (untuk Homepage)
 */
export async function getRecentPosts(limit = 3): Promise<NotionPost[]> {
  const posts = await getDatabase();
  return posts.slice(0, limit);
}

/**
 * Mengambil artikel terkait berdasarkan kesamaan tags
 */
export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Promise<NotionPost[]> {
  const posts = await getDatabase();
  const filtered = posts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      // Hitung skor kesamaan tags
      const matchCount = p.tags.filter((t) => tags.includes(t)).length;
      return { post: p, matchCount };
    })
    .sort((a, b) => b.matchCount - a.matchCount)
    .map((item) => item.post);

  return filtered.slice(0, limit);
}
