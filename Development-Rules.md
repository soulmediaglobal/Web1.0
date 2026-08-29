# Development-Rules

**Document Version:** v1.1.4
**Web Version:** v1.1.0
**Project:** Soul Media Global Website  
**Purpose:** Master rules for building, continuing, modifying, and maintaining the Soul Media Global website.  
**Description:** Soul Media Global Website adalah official company website sekaligus portfolio platform untuk menampilkan identitas, capability, selected works, case studies, dan positioning Soul Media Global sebagai IT consulting, digital transformation, creative, digital product, and technology company. Website ini dirancang sebagai pengalaman editorial yang premium, modern, art-directed, dan portfolio-led — bukan sekadar company profile atau agency template generik.

---

# Chapter 1 — Core Principle

## C1P1 — Brand Foundation

Website harus terasa modern, premium, editorial, technology-driven, dan confident. Identitasnya harus mencerminkan Soul Media Global sebagai IT consulting, digital transformation, creative, digital product, and technology company—bukan agency template generik.

## C1P2 — Tone & Manner

Cara website berbicara harus singkat, confident, intelligent, dan langsung ke inti. Hindari corporate jargon, buzzword generik, dan penjelasan berlebihan.

## C1P3 — Color System

Gunakan foundation dark yang sudah ada: background `#0a0a0a`, primary text `#e5e2e1`, dan red accent `#d0190f`. Pertahankan konsistensi palette dan jangan membuat color system paralel.

## C1P4 — Typography System

Gunakan Bebas Neue untuk display, Inter untuk body, navigation, dan UI, serta JetBrains Mono untuk metadata, label, angka, dan informasi teknis. Pertahankan hierarchy yang konsisten dan jangan menambah font tanpa alasan kuat.

## C1P5 — Layout & Composition

Gunakan strong alignment, generous whitespace, controlled asymmetry, clear rhythm, dan editorial flow. Hindari card-heavy generic layout; setiap composition harus memiliki underlying structure.

## C1P6 — Visual & Media Direction

Image, video, dan 3D harus curated, purposeful, high quality, serta mendukung narrative dan art direction. Media tidak boleh menjadi decorative filler atau random stock placeholder final.

## C1P7 — Interaction & Motion

Interaction dan motion harus subtle, intentional, dan responsive. Gunakan untuk memperkuat hierarchy, feedback, navigation, dan transition—bukan sebagai gimmick atau penghambat akses ke content.

## C1P8 — Experience Consistency

Desktop, tablet, dan mobile harus terasa sebagai satu brand system yang sama. Pertahankan approved visual state, existing experience, dan consistency antarhalaman; jangan membuat parallel design system.

---

# Chapter 2 — Hierarchy

## C2P1 — Development-Rules Governance

`Web1.0/Development-Rules.md` adalah canonical technical source of truth project-wide untuk development direction, design dan architecture decisions, page structure, technology, component behavior, coding convention, CMS development, AI collaboration, maintenance, dan future modification setelah perubahan terkait merged ke `main`.

Versi `Web1.0/Development-Rules.md` pada task branch boleh lebih baru daripada versi di `main`, tetapi statusnya adalah **branch-local newer version** dan belum menjadi canonical source of truth project-wide sampai merged ke `main`.

Hermes tetap berperan sebagai Guardian of The Document dan reviewer yang menjaga integrity, authenticity, structure, consistency, dan correctness dokumen. Untuk development flow, AI dan developer wajib menggunakan file tracked di repository sebagai technical reference utama sesuai scope branch aktif.

Keputusan final baru harus ditambahkan. Jika rule baru secara eksplisit menggantikan rule lama, rule terbaru yang sudah canonical menjadi source of truth.

## C2P2 — Current Technology Stack

Repository utama: `soulmediaglobal/Web1.0`  
Production domain: `soulmedia.id`

- Core: React 19, TypeScript, React DOM, Vite, React Router DOM.
- Styling: Tailwind CSS 4, CSS, PostCSS, Autoprefixer; global/custom styling berada di `src/App.css` dan `src/index.css`.
- Typography: Bebas Neue, Inter/Sans-serif, JetBrains Mono/Monospace.
- Routes: `/`, `/solutions`, `/work`, `/work/:slug`, `/about`, `/contact`.
- Structured case-study data: `src/data/caseStudies.ts`, digunakan oleh `WorkPage.tsx` dan `WorkDetailPage.tsx`.
- UI/visual: `lucide-react`; Three.js tersedia untuk advanced visual/3D tetapi tidak boleh digunakan secara arbitrary.
- Backend/data capability: Supabase JS tersedia, tetapi actual database, authentication, storage, API, CMS, dan persistence harus diverifikasi sebelum diasumsikan.
- Tooling: ESLint, TypeScript ESLint, React Hooks ESLint, React Refresh, dan Vite React Plugin.

Existing stack adalah default foundation. Prioritas: **Use existing stack → Extend existing stack → Add dependency only when necessary.** Jangan menambah framework, UI kit, state-management library, animation framework, CMS framework, atau backend framework tanpa kebutuhan teknis jelas.

## C2P3 — Existing Structure

Existing Structure dibagi menjadi **Tampilan Muka** dan **CMS**.

### A. Tampilan Muka

Global application shell terdiri dari Global Header, Public Routes, dan Global Footer. Header/footer dan main routing dikelola pada `src/App.tsx`.

Primary navigation: HOME (`/`), SOLUTIONS (`/solutions`), WORK (`/work`), ABOUT (`/about`), CONTACT (`/contact`), serta GET STARTED (`/contact`). Navigation tersedia untuk desktop dan mobile.

1. **Home (`/`)** — Hero, Services, Selected Work, Why SMG, Leadership, dan Final CTA; menggunakan component terkait di `src/components/` dan dirakit melalui `HomePage()`.
2. **Solutions (`/solutions`)** — interactive capability system dengan empat pillar: Digital Strategy & Product Architecture; Custom Software & Enterprise Applications; AI, Automation & System Integration; Cloud & Platform Engineering.
3. **Work (`/work`)** — portfolio/case-study index dari `src/data/caseStudies.ts`, termasuk project count, sector filtering, featured/standard layout, project content, dan case-study navigation.
4. **Work Detail (`/work/:slug`)** — detail berdasarkan slug dengan Back to All Work, Project Header/Metadata, Hero Visual, The Challenge, The System, optional Client Feedback, dan adjacent project navigation. Slug yang tidak ditemukan kembali ke `/work`.
5. **About (`/about`)** — halaman company/about pada public website.
6. **Contact (`/contact`)** — halaman contact dan destination untuk Get Started CTA.

Perubahan global Header atau Footer harus diuji pada seluruh route. Actual current implementation harus selalu diperiksa sebelum mengubah structure atau behavior.

### B. CMS

CMS belum dibangun. Keberadaan dependency Supabase tidak boleh dianggap sebagai CMS implementation. Database, authentication, storage, API, content persistence, dan admin interface harus diverifikasi dari repository sebelum dinyatakan tersedia.

## C2P4 — Hermes, Guardian of The Document

Hermes adalah nama dan role untuk ChatGPT assistant dalam dedicated document-governance context sebagai **Guardian of The Document**. Hermes bertanggung jawab untuk membuat, memelihara, mengorganisasi, meninjau, dan melindungi integrity, authenticity, consistency, dan correctness The Document.

AI lain dan developer mengeskalasikan perubahan kepada Hermes jika scope-nya mencakup rule atau governance, reusable collaboration behavior, document structure, atau architecture/documentation standard yang perlu dipersist sebagai bagian dari The Document. Normal development task yang tidak mengubah area tersebut tidak membutuhkan Hermes involvement.

Hermes bukan nama generik untuk setiap AI. Hermes secara khusus merujuk kepada Guardian of The Document.

## C2P5 — Write Access Security Architecture

Sebelum implementation capability yang dapat mengubah CMS data dimulai, minimum security architecture harus didefinisikan terlebih dahulu.

Ini berlaku untuk capability seperti:

- authentication
- create / update / delete content
- publish / unpublish
- media upload / replace / delete
- privileged CMS operations

Minimum decisions yang harus tersedia:

### Roles

Siapa saja persona / role yang dapat mengakses CMS.

### Permissions

Untuk setiap role, tentukan authority terhadap:

- read
- create
- update
- delete
- publish

### Security Boundary

Tentukan operasi mana yang boleh menggunakan:

- browser Supabase client
- Supabase RLS
- privileged backend / service environment

### Storage Access

Tentukan siapa yang boleh upload, replace, dan delete media atau file.

Architecture harus cukup untuk mencegah broad write access atau insecure authenticated policies. Jangan membuat enterprise IAM architecture jika kebutuhan product belum memerlukannya.

---

# Chapter 3 — Changelog

## C3P1 — Changelog Rules

`/CHANGELOG.md` adalah single source of truth untuk actual website dan development change history. Chapter 3 hanya mengatur changelog governance dan tidak menyimpan duplicate development entries.

> No undocumented change should be pushed to the repository.

Setiap notable development change yang masuk repository harus dicatat di `/CHANGELOG.md` sebelum commit dan push. Catat apa dan kenapa berubah, area/file terdampak, hasil, testing, known issue, dan follow-up. Git history tidak menggantikan `/CHANGELOG.md`.

Mandatory development workflow:

```text
PRD
↓
GitHub Issue
↓
Branch
↓
Pre-Work Verification
↓
Implementation
↓
Testing
↓
Ray Approval
↓
Update /CHANGELOG.md
↓
Commit + Push
↓
Merge-Ready Verification
↓
Ray Merge
```

Yang wajib dicatat mencakup feature/page/component/interaction baru; UI/UX, layout, responsive, typography, navigation, animation, content structure, route, data, backend, database, dependency, dan infrastructure changes; bug, performance, accessibility, dan security fixes; significant refactor; serta removal. Internal comment atau typo tanpa dampak production tidak wajib.

Kategori: `Added`, `Changed`, `Fixed`, `Removed`, `Refactored`, `Security`, `Performance`, `Content`, `Infrastructure`.

Version menggunakan `MAJOR.MINOR.PATCH`: MAJOR untuk perubahan architecture/product/experience besar; MINOR untuk capability baru tanpa breaking change besar; PATCH untuk bug fix, visual refinement, atau perubahan kecil.

Format entry di `/CHANGELOG.md`:

```text
Date:
Version:
Status:
Category:

Summary:

Changes:
-

Files / Areas Affected:
-

Reason:

Testing / Verification:

Known Issues:

Next Action:
```

Bagian yang tidak relevan dapat diisi `None`.

Repository `soulmediaglobal/Web1.0` sudah memiliki history sebelum changelog formal. Seluruh implementation sebelumnya dianggap **INITIAL BASELINE** dan tidak perlu direkonstruksi. `/CHANGELOG.md` bersifat append-only; revisi terhadap perubahan lama dibuat sebagai entry baru.

Actual baseline dan seluruh development history tersedia hanya di `/CHANGELOG.md`. C3P2 Development Baseline telah di-retire untuk menghilangkan duplikasi.

---

# Chapter 4 — Collaboration Behavior

## C4P1 — PRD → GitHub Issue → Branch → Verification

Sebelum memulai aktivitas development baru, baik untuk membuat feature baru maupun memperbaiki bug, proses wajib dimulai dengan preparation yang jelas.

Urutan kerja:

```text
PRD
↓
GitHub Issue
↓
Branch
↓
Verification
↓
Implementation
```

### PRD

Sebelum GitHub Issue dibuat, feature atau perubahan harus didefinisikan terlebih dahulu dalam bentuk PRD yang:

- Singkat
- Jelas
- Padat
- Actionable

Untuk feature baru, PRD wajib menyebutkan **Target Persona** secara eksplisit.

PRD tidak boleh terlalu panjang atau dipenuhi diskusi yang belum final.

### GitHub Issue

Setelah PRD disepakati, bagian PRD yang relevan untuk execution dipadatkan menjadi GitHub Issue.

Kamu sebagai AI wajib memberikan:

1. Issue Title
2. Issue Description

Keduanya harus diberikan dalam **dua bash-formatted block terpisah** supaya Ray dapat langsung copy-paste.

Issue Description hanya perlu memuat:

- Objective
- Target Persona
- Problem / Need
- Scope
- Out of Scope
- Expected Behavior / Acceptance Criteria
- Relevant Notes / Constraints

Issue Description tidak perlu memuat:

- Background bisnis yang panjang
- Brainstorm alternatif
- Diskusi yang belum final
- Rationale yang berulang
- Detail teknis yang belum diputuskan

### Branch

Setelah GitHub Issue dibuat, Ray membuat dedicated branch dari terminal.

Ray kemudian mengirimkan kembali output Git / branch state kepada Kamu sebagai AI.

### Verification

Sebelum implementation dimulai, Kamu sebagai AI wajib memastikan:

- Branch sudah dibuat
- Branch yang aktif adalah branch yang benar
- Branch sesuai dengan task yang sedang dikerjakan

Implementation tidak boleh dimulai sebelum branch terverifikasi.

## C4P2 — Concise Communication & Check/Execution Separation

Ray mudah terdistraksi jika menerima penjelasan yang terlalu panjang.

Karena itu, selama proses development, komunikasi harus:

- Singkat
- Padat
- Langsung ke inti
- Tidak penuh penjelasan tambahan yang tidak diperlukan

Setiap response development harus membedakan dengan jelas antara:

### Yang Akan Dicek

Apa yang perlu diperiksa terlebih dahulu sebelum tindakan dilakukan.

Contoh:

- Repository state
- Current branch
- Existing implementation
- Error
- Relevant file
- Production behavior

### Yang Akan Dieksekusi

Apa yang benar-benar akan dilakukan setelah pengecekan selesai.

Contoh:

- Edit file
- Fix bug
- Add feature
- Run build
- Update changelog
- Commit
- Push

Pemisahan ini harus jelas untuk kedua sisi:

### Sisi Kamu sebagai AI

Harus jelas:

- Apa yang akan Kamu sebagai AI cek sendiri
- Apa yang akan Kamu sebagai AI eksekusi sendiri

### Sisi Ray

Harus jelas:

- Apa yang perlu Ray cek
- Apa yang perlu Ray jalankan
- Apa yang perlu Ray kirim balik

Tujuannya adalah mengurangi cognitive load dan mencegah instruction yang bercampur antara inspection dan execution.

## C4P3 — Conditional Chapter 6 Update

Chapter 6 diperbarui hanya ketika milestone atau high-level project state berubah secara material, atau ketika Ray memintanya secara eksplisit. Normal task yang tidak mengubah state tersebut tidak membutuhkan Chapter 6 update.

Hasil dan status yang material harus ditempatkan pada bagian yang tepat:

- **C6P1 — Existing State** untuk capability, system, atau module yang sudah tersedia dan aktif.
- **C6P2 — Active Work** untuk workstream yang benar-benar sedang berjalan.
- **C6P3 — Next / Pending** untuk milestone atau capability berikutnya yang belum dikerjakan atau belum selesai.

Chapter 6 harus tetap ringkas dan tidak boleh mirror branch, commit hash, working-tree status, ahead/behind, merge status, atau local/remote sync. Git dan GitHub adalah source of truth untuk operational repository state.

## C4P4 — Governance Change Threshold and Hermes Escalation

The Document tidak boleh diubah hanya karena muncul satu suggestion, preference, atau situational optimization selama development. Perubahan rule hanya perlu dievaluasi jika terdapat:

- rule baru atau revisi rule existing
- perubahan governance atau development workflow
- reusable collaboration behavior atau mechanism baru
- perubahan structure, ownership, atau source of truth dokumentasi
- architecture atau documentation standard jangka panjang
- repeated friction yang layak dijadikan permanent rule
- security atau reliability gap
- automation yang dapat menggantikan manual process dengan safety yang sama atau lebih baik

**Decision rule:** sebelum mengubah governance, collaboration rules, documentation structure, atau long-lived operating standard, Kamu sebagai AI wajib berhenti dan bertanya kepada Ray apakah perubahan tersebut perlu direview oleh Hermes terlebih dahulu. Jika perubahan mengubah cara project bekerja ke depannya, wajib stop → konfirmasi Ray → Hermes review jika disetujui. Jika tidak, lanjutkan menggunakan rule existing.

Konfirmasi ke Hermes tidak diperlukan untuk coding biasa, bug fix biasa, implementation sesuai PRD dan rule existing, test/build, update `/CHANGELOG.md`, normal Git verification, atau task-specific technical decision yang tidak mengubah operating standard.

Gunakan wording:

> “Ini terlihat seperti perubahan yang layak menjadi rule permanen. Mau update ke Hermes dulu?”

Hermes pada poin ini secara eksplisit merujuk kepada **Guardian of The Document**. Tujuannya adalah menjaga The Document tetap stabil, lean, dan tidak berubah karena setiap situational improvement.

## C4P5 — Repository Verification & Automated Quality Gate

Repository verification dilakukan pada dua checkpoint utama.

### Pre-Work Checkpoint

Sebelum implementation, jalankan:

```bash
git fetch origin
git status -sb
git branch --show-current
git log -1 --oneline
```

Tujuannya adalah memverifikasi branch yang benar sedang aktif, working tree dalam kondisi aman, local dan remote berada pada starting state yang benar, serta existing work tetap dipertahankan. Mismatch harus diselesaikan sebelum implementation.

### Automated Quality Gate

Setelah perubahan di-push, technical quality harus diverifikasi melalui CI.

```bash
npm ci
npm run lint
npm run build
```

CI menjadi objective technical gate untuk memastikan branch tidak memiliki dependency, lint, atau build failure.

Manual verification tambahan hanya dilakukan jika CI gagal, terdapat mismatch atau error yang membutuhkan investigation, atau task memiliki verification khusus yang tidak tercakup CI. Tujuannya adalah mengganti repeated manual verification dengan automated enforcement tanpa mengurangi development safety.

## C4P6 — Approval Gate Before Commit and Push

Setelah implementation dan testing selesai, **Kamu sebagai AI wajib berhenti dan meminta approval Ray sebelum melakukan commit atau push ke GitHub**.

Commit dan push tidak boleh dilakukan sebelum Ray memberikan approval.

Setelah approval diberikan, urutan yang wajib diikuti adalah:

```text
Update Changelog
↓
Commit + Push
↓
Merge-Ready Verification
↓
Ray Merge
```

## C4P7 — Branch Creation After GitHub Issue

Setelah GitHub Issue selesai dibuat, **Kamu sebagai AI wajib meminta Ray membuat dedicated branch sebelum implementation dimulai**.

Branch name harus diturunkan dari:

- GitHub Issue number
- GitHub Issue title
- Slug yang singkat dan mudah dibaca

Format branch:

```text
<issue-number>-<issue-title-slug>
```

Contoh:

```text
2-cms-database-foundation-supabase-content-schema
```

Kamu sebagai AI wajib menghasilkan command terminal yang siap di-copy-paste berdasarkan issue yang baru dibuat. Command yang diberikan harus disesuaikan dengan kondisi aktual repository. Untuk branch baru, default-nya adalah membuat sekaligus berpindah ke branch tersebut.

Command harus diberikan dalam bash block terpisah:

```bash
git fetch origin
git checkout -b 2-cms-database-foundation-supabase-content-schema
```

Setelah Ray menjalankan command tersebut, Ray harus mengirim kembali output terminal.

Kamu sebagai AI kemudian wajib memverifikasi:

- Branch berhasil dibuat
- Branch aktif sesuai issue
- Branch name sesuai convention
- Branch dibuat dari base branch yang benar
- Tidak ada error yang menghalangi implementation

Implementation tidak boleh dimulai sebelum branch diverifikasi.

## C4P8 — Conditional New-Behavior Detection

Kamu sebagai AI tidak perlu melakukan behavior audit penuh setelah setiap task. Detection hanya diperlukan jika selama task ditemukan reusable collaboration behavior baru yang belum tercatat dan memiliki nilai jangka panjang.

Jika behavior tersebut ditemukan:

- Identify behavior baru tersebut.
- Jelaskan kenapa behavior itu reusable dan layak dipersist.
- Konfirmasi kepada Ray apakah perlu dieskalasikan ke Hermes.

Jika ada behavior baru yang layak disimpan, Kamu sebagai AI wajib mengonfirmasi kepada Ray:

> “Ada mekanisme/behavior baru dari task ini yang belum tercatat di The Document. Mau update ke Hermes dulu sebelum lanjut?”

Jika Ray setuju:

1. Behavior dirumuskan.
2. Dikirim ke Hermes untuk review dan pembaruan The Document.
3. Flow development dilanjutkan ke approval, changelog, commit, dan push.

Jika tidak ada behavior baru, tidak ada behavior update atau Hermes handoff yang diperlukan.

## C4P9 — Synchronize The Document to GitHub

Setiap perubahan The Document yang sudah disetujui wajib disinkronkan ke file tracked:

`Web1.0/Development-Rules.md`

Perubahan dilakukan melalui Git dan mengikuti branch serta workflow aktif.

Jika update dilakukan pada task branch, versi tersebut dianggap sebagai **branch-local newer version** sampai merged ke `main`. Project-wide canonical version hanya berlaku setelah perubahan masuk ke `main`.

Sebelum melakukan synchronization, Kamu sebagai AI wajib:

- Memeriksa current branch.
- Memeriksa working tree.
- Memastikan tidak menimpa existing work atau perubahan yang belum di-commit.
- Memastikan Document Version sesuai dengan perubahan terbaru.

Untuk documentation-only update yang tidak membutuhkan website deployment, gunakan approved deploy-skip mechanism pada commit message, seperti `[skip netlify]` atau `[skip ci]`, sesuai konfigurasi repository.

Setelah push, Kamu sebagai AI wajib melaporkan:

- Branch.
- Commit hash.
- Commit message.
- File yang berubah.
- Push status.

## C4P10 — Sequential Execution / One-Step-at-a-Time Mode

Untuk task yang bersifat procedural dan setiap langkah berikutnya bergantung pada hasil langkah sebelumnya, seperti Git setup, Supabase setup, migration, deployment, authentication, atau environment configuration, Kamu sebagai AI wajib:

1. Memberikan satu langkah execution pada satu waktu.
2. Menunggu output atau result yang dikembalikan Ray.
3. Memverifikasi output atau result tersebut.
4. Baru memberikan langkah berikutnya setelah hasil langkah sebelumnya terverifikasi.

Kamu sebagai AI tidak boleh memberikan beberapa langkah execution yang saling bergantung sekaligus.

Pengecualian: beberapa command boleh digabungkan dalam satu bash block hanya jika seluruh command tersebut membentuk satu operasi atomic yang aman dan tidak membutuhkan intermediate verification.

## C4P11 — Merge-Ready & Merge Ownership

Kamu sebagai AI tidak boleh melakukan merge task branch ke `main`. Final merge ke `main` dilakukan manual oleh Ray.

Sebelum menyatakan branch sebagai merge-ready, Kamu sebagai AI wajib memastikan:

- implementation selesai
- testing / task-specific verification selesai
- Ray sudah memberikan approval
- `/CHANGELOG.md` sudah diperbarui
- perubahan sudah committed dan pushed
- CI telah PASS
- working tree clean
- local dan remote synchronized
- tidak ada known conflict atau blocker

Jika semua kondisi terpenuhi, Kamu sebagai AI harus menyatakan branch **Merge Ready** dan menyerahkan final merge kepada Ray.

---

# Chapter 5 — Hand Over Rule

## C5P1 — AI Onboarding Reading Order

Kamu sebagai AI yang menerima handover wajib membaca dokumen ini dengan urutan berikut:

1. **Header Document** — untuk mengetahui Document Version, Web Version, Project, Purpose, dan Description.
2. **Chapter 4 — Collaboration Behavior** — untuk memahami cara kerja Ray serta standar komunikasi dan execution.
3. **Chapter 5 — Hand Over Rule** — untuk memahami cara menerima dan melanjutkan handover.
4. **Chapter 2 — Hierarchy** — terutama Current Technology Stack dan Existing Structure.
5. **`/CHANGELOG.md`** — terutama entry terbaru untuk mengetahui actual development change terakhir; Chapter 3 hanya mengatur changelog governance.
6. **Chapter 1 — Core Principle** — sebagai rulebook brand dan experience selama development.
7. **Chapter 6 — Project State** — untuk mengetahui high-level existing state, active work, dan next/pending capability.

Setelah selesai membaca, Kamu sebagai AI wajib membalas dengan TL;DR yang minimal menjelaskan:

- Project ini apa.
- Cara kerja yang harus diikuti.
- Current technology dan structure secara singkat.
- Current Web Version.
- Perubahan terakhir.
- Existing state saat ini.
- Task yang masih gantung atau pending.

Balasan wajib diakhiri dengan dua bagian berikut:

### Existing State

Kondisi project yang sudah ada, sudah selesai, atau aktif sekarang.

### Pending Tasks

Pekerjaan yang masih gantung, belum selesai, belum diverifikasi, atau belum dieksekusi.

---

# Chapter 6 — Project State

## C6P1 — Existing State

- Current Web Version adalah **v1.1.0**.
- Public website memiliki Home, Solutions, Work, Work Detail / Case Study, About, dan Contact.
- Supabase CMS Database Foundation tersedia dan sudah diverifikasi, termasuk sembilan CMS tables, Row Level Security, public read policies, required indexes, dan `updated_at` triggers.
- Public website masih menggunakan static dan hardcoded content sources; frontend belum membaca content dari Supabase.

## C6P2 — Active Work

None.

## C6P3 — Next / Pending

- Authentication and write-access foundation.
- Media and storage implementation.
- CMS Admin UI.
- Frontend integration and migration to CMS-backed content.

---

# Chapter 7 — Document Changelog

## C7P1 — Document Change Log

Document Change Log mencatat setiap perubahan pada dokumen ini, bukan perubahan pada website.

Setiap entry wajib menggunakan format **Audit Style** dan memuat:

- Version dan Date
- Type
- Affected
- Summary
- Previous Version
- Current Version

Jenis perubahan yang dapat dicatat: `Added`, `Changed`, `Removed`, atau `Reorganized`.

The Document menggunakan semantic versioning:

- **PATCH** — refine, clarify, atau correct isi yang ada.
- **MINOR** — expand scope atau capability. Setiap penambahan Chapter baru wajib menaikkan MINOR.
- **MAJOR** — redefine The Document secara fundamental atau membuat breaking change terhadap cara dokumen bekerja.

### v1.0.0 — 28 August 2026

**Type:** Added

**Affected:**

- Initial document baseline

**Summary:**
Established the initial Development-Rules document baseline.

**Previous Version:** None  
**Current Version:** v1.0.0

### v1.0.1 — 28 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P1

**Summary:**  
Added the initial collaboration workflow requiring a GitHub Issue and a verified dedicated branch before implementation.

**Previous Version:** v1.0.0  
**Current Version:** v1.0.1

### v1.0.2 — 28 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P2

**Summary:**  
Added concise communication and clear separation between checks and execution for Ray and the AI.

**Previous Version:** v1.0.1  
**Current Version:** v1.0.2

### v1.0.3 — 28 August 2026

**Type:** Changed

**Affected:**

- Chapter 3
- C3P2

**Summary:**  
Updated Chapter 3 with the v1.0.0 Initial Production Baseline.

**Previous Version:** v1.0.2  
**Current Version:** v1.0.3

### v1.0.4 — 28 August 2026

**Type:** Changed

**Affected:**

- C4P1

**Summary:**  
Revised C4P1 into the PRD → GitHub Issue → Branch → Verification workflow, including a concise PRD and mandatory Target Persona for new features.

**Previous Version:** v1.0.3  
**Current Version:** v1.0.4

### v1.0.5 — 28 August 2026

**Type:** Changed

**Affected:**

- Document terminology

**Summary:**  
Replaced general references to the Guardian's name with “Kamu sebagai AI” so the document remains clear for other AI readers.

**Previous Version:** v1.0.4  
**Current Version:** v1.0.5

### v1.0.6 — 28 August 2026

**Type:** Changed

**Affected:**

- All Chapters
- All point identifiers

**Summary:**  
Standardized every point identifier to the C#P# format.

**Previous Version:** v1.0.5  
**Current Version:** v1.0.6

### v1.0.7 — 28 August 2026

**Type:** Added

**Affected:**

- Chapter 5
- C5P1
- Chapter 6
- C6P1
- C6P2
- C6P3

**Summary:**  
Added the AI onboarding reading order and Project State sections for Existing State, Pending Tasks, and Active Work.

**Previous Version:** v1.0.6  
**Current Version:** v1.0.7

### v1.0.8 — 28 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P3

**Summary:**  
Added the mandatory Chapter 6 update after every completed task or when Ray explicitly requests it.

**Previous Version:** v1.0.7  
**Current Version:** v1.0.8

### v1.0.9 — 28 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P4

**Summary:**  
Added mandatory confirmation with the Guardian of The Document before adopting a new collaboration mechanism that is not yet documented.

**Previous Version:** v1.0.8  
**Current Version:** v1.0.9

### v1.0.10 — 28 August 2026

**Type:** Reorganized

**Affected:**

- Chapter 1
- C1P1–C1P8

**Summary:**  
Condensed Chapter 1 into the agreed eight-point brand and experience structure.

**Previous Version:** v1.0.9  
**Current Version:** v1.0.10

### v1.0.11 — 28 August 2026

**Type:** Added

**Affected:**

- Chapter 7
- C7P1

**Summary:**  
Added Chapter 7 — Document Changelog and C7P1 — Document Change Log to separate document-history tracking from website development history.

**Previous Version:** v1.0.10  
**Current Version:** v1.0.11

### v1.0.12 — 28 August 2026

**Type:** Changed

**Affected:**

- C7P1

**Summary:**  
Changed the C7P1 document changelog format to Compact Structured.

**Previous Version:** v1.0.11  
**Current Version:** v1.0.12

### v1.0.13 — 28 August 2026

**Type:** Changed

**Affected:**

- C7P1

**Summary:**  
Revised the C7P1 document changelog format from Compact Structured to Audit Style.

**Previous Version:** v1.0.12  
**Current Version:** v1.0.13

### v1.0.14 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P5

**Summary:**  
Added C4P5 — Status Verification Before Starting a Task, including separate standard command blocks for local repository checks and local-vs-GitHub checks, plus mandatory comparison against Chapter 6 before development begins.

**Previous Version:** v1.0.13  
**Current Version:** v1.0.14

### v1.0.15 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P6

**Summary:**  
Added the approval gate requiring the AI to stop after implementation and testing, obtain Ray's approval, and only then update the changelog, commit, and push.

**Previous Version:** v1.0.14  
**Current Version:** v1.0.15

### v1.0.16 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P7

**Summary:**  
Added dynamic branch creation after a GitHub Issue using the issue number and title slug, with repository-aware commands and mandatory verification before implementation.

**Previous Version:** v1.0.15  
**Current Version:** v1.0.16

### v1.0.17 — 29 August 2026

**Type:** Changed

**Affected:**

- C7P1
- Document versioning rules

**Summary:**  
Clarified semantic versioning for The Document: PATCH refines, clarifies, or corrects; MINOR expands scope or capability and is mandatory for every new Chapter; MAJOR fundamentally redefines the document or introduces breaking changes.

**Previous Version:** v1.0.16  
**Current Version:** v1.0.17

### v1.0.18 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P8

**Summary:**  
Added mandatory capture of newly observed collaboration behavior after local verification and before approval, changelog, commit, and push.

**Previous Version:** v1.0.17  
**Current Version:** v1.0.18

### v1.0.20 — 29 August 2026

**Type:** Changed / Added

**Affected:**

- Document Header
- C2P1
- C4P9
- Chapter 6
- C6P1
- C6P2
- C6P3
- C7P1

**Summary:**
Clarified that the repository document becomes the project-wide canonical technical source of truth only after merge to `main`, while task-branch copies remain branch-local newer versions. Preserved Hermes as Guardian and reviewer of document integrity, added the Git synchronization and deploy-skip reporting workflow, and updated the verified Supabase CMS database foundation, pending tasks, and active Git-flow state. The tracked branch moved directly from v1.0.18 to v1.0.20 because v1.0.19 was not present in repository history at the time of this update.

**Previous Version:** v1.0.18
**Current Version:** v1.0.20

### v1.0.21 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P10
- C7P1

**Summary:**
Added C4P10 — Sequential Execution / One-Step-at-a-Time Mode, requiring dependent procedural execution steps to be provided one at a time, with Ray's returned result verified before the next step is given, while allowing commands to be grouped only when they form one safe atomic operation that requires no intermediate verification.

**Previous Version:** v1.0.20
**Current Version:** v1.0.21

### v1.0.22 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 2
- C2P4
- C7P1

**Summary:**
Added C2P4 — Hermes, Guardian of The Document, defining Hermes as the ChatGPT assistant in the dedicated document-governance context responsible for creating, maintaining, organizing, reviewing, and protecting the integrity, authenticity, consistency, and correctness of The Document. Clarified that other AI and developers may escalate new collaboration mechanisms, rule changes, or document updates to Hermes for review before inclusion, and that Hermes is not a generic name for every AI.

**Previous Version:** v1.0.21
**Current Version:** v1.0.22

### v1.0.23 — 29 August 2026

**Type:** Added

**Affected:**

- Chapter 4
- C4P11
- C7P1

**Summary:**
Added C4P11 — Merge Approval & Ownership, allowing AI to prepare a merge, pull request, or merge-ready state while prohibiting merge to `main` without Ray's explicit approval. Required the AI to stop at the branch or pull request before approval and report the merge result after approval.

**Previous Version:** v1.0.22
**Current Version:** v1.0.23

### v1.0.24 — 29 August 2026

**Type:** Changed

**Affected:**

- Document Header
- Chapter 6
- C6P1
- C6P2
- C6P3
- C7P1

**Summary:**
Synchronized Chapter 6 with the completed CMS Database Foundation state on the current task branch, including the verified remote schema and controls, environment-file protection, pushed commit, clean synchronized working tree, remaining CMS tasks, and merge governance. Clarified that the project-wide Web Version remains v1.0.0 until the task branch is merged to `main`.

**Previous Version:** v1.0.23
**Current Version:** v1.0.24

### v1.0.25 — 29 August 2026

**Type:** Changed

**Affected:**

- Document Header
- Chapter 4
- C4P11
- Chapter 6
- C6P2
- C6P3
- C7P1

**Summary:**
Revised C4P11 so AI may prepare a pull request or merge-ready state but must never merge a task branch to `main`. Required AI to verify a clean working tree, synchronized local and remote branches, successful testing and verification, completed documentation and changelog, and no known conflict or blocker before reporting merge-ready. Assigned the final manual merge exclusively to Ray and synchronized the pending CMS Database Foundation merge state in Chapter 6 with this ownership rule.

**Previous Version:** v1.0.24
**Current Version:** v1.0.25

### v1.1.0 — 29 August 2026

**Type:** Added

**Affected:**

- Document Header
- Chapter 8
- C8P1–C8P10
- C7P1

**Summary:**
Added Chapter 8 — Documentation Structure to define documentation purpose, canonical repository locations, PRD storage and its relationship to GitHub Issues, changelog and Development-Rules storage, handover and architecture documentation, file naming conventions, and documentation synchronization. Increased the Document Version from v1.0.25 to v1.1.0 because adding a new Chapter requires a MINOR version bump.

**Previous Version:** v1.0.25
**Current Version:** v1.1.0

### v1.1.1 — 29 August 2026

**Type:** Changed

**Affected:**

- Document Header
- Chapter 6
- C6P1
- C6P2
- C6P3
- C7P1

**Summary:**
Synchronized Chapter 6 with the completed CMS Database Foundation implementation commit `dba54ae`, retained the manual merge to `main` as a pending governance and release step owned by Ray, and cleared Active Work to `None`. Kept the Web Version at v1.0.0.

**Previous Version:** v1.1.0
**Current Version:** v1.1.1

### v1.1.2 — 29 August 2026

**Type:** Changed

**Affected:**

- Document Header
- Chapter 6
- C6P1
- C6P2
- C6P3
- C7P1

**Summary:**
Synchronized the document with the post-merge project state after CMS Database Foundation was merged to `main` through PR #4 at merge commit `5b64c76ee52d156b79243f23fab08a687524118d`. Recorded implementation commit `dba54ae` as part of `main`, removed the completed merge task from Pending Tasks, confirmed Active Work as `None`, and synchronized the Web Version from v1.0.0 to v1.1.0.

**Previous Version:** v1.1.1
**Current Version:** v1.1.2

### v1.1.3 — 29 August 2026

**Type:** Changed / Removed / Reorganized

**Affected:**

- Document Header
- C2P4
- Chapter 3
- C3P1
- C3P2
- C4P3
- C4P4
- C4P5
- C4P6
- C4P8
- C4P11
- C5P1
- Chapter 6
- C6P1
- C6P2
- C6P3
- C7P1

**Summary:**
Applied efficiency-focused revisions approved from the Argus audit. Made `/CHANGELOG.md` the single source of truth for actual development history and retired C3P2 Development Baseline; reduced Chapter 6 to high-level Existing State, Active Work, and Next / Pending without mirroring Git operational state; made Hermes involvement and new-behavior detection conditional; consolidated repository checks into Pre-Work and Merge-Ready checkpoints; and standardized the mandatory workflow as PRD → GitHub Issue → Branch → Pre-Work Verification → Implementation → Testing → Ray Approval → CHANGELOG.md → Commit + Push → Merge-Ready Verification → Ray Merge.

**Previous Version:** v1.1.2
**Current Version:** v1.1.3

### v1.1.4 — 29 August 2026

**Type:** Added / Changed

**Affected:**

- Document Header
- C2P5
- C4P4
- C4P5
- C4P11
- C7P1

**Summary:**
Added C2P5 — Write Access Security Architecture to require minimum roles, permissions, security-boundary, and storage-access decisions before CMS write capability implementation. Revised C4P4 with an explicit governance change threshold and decision rule requiring AI to stop and ask Ray about Hermes review before changing governance, collaboration rules, documentation structure, or long-lived operating standards. Revised C4P5 to retain the Pre-Work Checkpoint and establish CI with `npm ci`, `npm run lint`, and `npm run build` as the automated quality gate. Revised C4P11 so merge-ready requires CI to pass and the final merge remains manual and exclusively owned by Ray.

**Previous Version:** v1.1.3
**Current Version:** v1.1.4

---

# Chapter 8 — Documentation Structure

## C8P1 — Documentation Purpose

Setiap artefak development penting harus memiliki lokasi dokumentasi yang jelas di repository dan tidak boleh bergantung pada chat history sebagai satu-satunya sumber informasi.

## C8P2 — Canonical Documentation Locations

Lokasi canonical untuk dokumentasi utama di repository adalah:

```text
/Development-Rules.md
/CHANGELOG.md
/docs/prd/
/docs/handover/
/docs/architecture/
```

## C8P3 — PRD Storage

Semua PRD lengkap disimpan di:

```text
/docs/prd/
```

Format nama file:

```text
<issue-number>-<short-feature-name>.md
```

Contoh:

```text
2-cms-database-foundation.md
3-cms-authentication.md
4-media-library.md
```

## C8P4 — PRD Relationship to GitHub Issue

PRD adalah source lengkap untuk kebutuhan feature atau task. GitHub Issue hanya berisi versi ringkas dan actionable dari PRD.

Issue Description boleh mencantumkan path PRD:

```text
PRD: docs/prd/2-cms-database-foundation.md
```

## C8P5 — Changelog Storage

Website/development changelog disimpan di:

```text
/CHANGELOG.md
```

Isinya hanya perubahan yang sudah benar-benar terjadi pada website atau development.

## C8P6 — Development-Rules Storage

The Document disimpan sebagai:

```text
/Development-Rules.md
```

The Document mengikuti governance yang sudah diatur di Chapter 2.

## C8P7 — Handover Documentation

Handover antar-AI atau developer yang cukup besar dapat disimpan di:

```text
/docs/handover/
```

Handover penting tidak boleh hanya hidup di chat.

## C8P8 — Architecture Documentation

Dokumen teknis yang menjelaskan architecture, schema, flow, atau system design dapat disimpan di:

```text
/docs/architecture/
```

## C8P9 — File Naming Convention

Nama file dokumentasi harus:

- Singkat.
- Deskriptif.
- Lowercase.
- Menggunakan kebab-case.
- Tidak menggunakan penanda seperti `final`, `latest`, `new`, atau `fix`.

## C8P10 — Documentation Sync Rule

Dokumentasi harus ikut diperbarui ketika task selesai atau state project berubah signifikan. Dokumen yang stale harus diperbaiki sebelum task dinyatakan selesai.
