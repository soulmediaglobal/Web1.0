# Development-Rules

**Document Version:** v1.0.20
**Web Version:** v1.0.0  
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

---

# Chapter 3 — Changelog

## C3P1 — Changelog Rules

Changelog adalah catatan resmi seluruh perubahan Soul Media Global Website. Setiap perubahan yang masuk repository harus dicatat di Chapter ini sebelum commit atau push.

> No undocumented change should be pushed to the repository.

Catat apa dan kenapa berubah, area/file terdampak, hasil, testing, known issue, dan follow-up. Git history tidak menggantikan Changelog.

Mandatory workflow:

```text
Development
↓
Testing
↓
Update Changelog
↓
Commit
↓
Push
```

Yang wajib dicatat mencakup feature/page/component/interaction baru; UI/UX, layout, responsive, typography, navigation, animation, content structure, route, data, backend, database, dependency, dan infrastructure changes; bug, performance, accessibility, dan security fixes; significant refactor; serta removal. Internal comment atau typo tanpa dampak production tidak wajib.

Kategori: `Added`, `Changed`, `Fixed`, `Removed`, `Refactored`, `Security`, `Performance`, `Content`, `Infrastructure`.

Version menggunakan `MAJOR.MINOR.PATCH`: MAJOR untuk perubahan architecture/product/experience besar; MINOR untuk capability baru tanpa breaking change besar; PATCH untuk bug fix, visual refinement, atau perubahan kecil.

Format entry mulai Point 2:

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

Repository `soulmediaglobal/Web1.0` sudah memiliki history sebelum Changelog formal. Seluruh implementation sebelumnya dianggap **INITIAL BASELINE** dan tidak perlu direkonstruksi. Changelog bersifat append-only; revisi terhadap perubahan lama dibuat sebagai entry baru.

AI wajib mengikuti: **Implement → Verify → Update Chapter 3 → Commit → Push**.

## C3P2 — v1.0.0 — Initial Production Baseline

**Date:** 28 August 2026  
**Version:** v1.0.0  
**Status:** Active  
**Category:** Infrastructure / Documentation

### Summary

Current production state Soul Media Global Website ditetapkan sebagai official baseline untuk seluruh development tracking berikutnya. Formal Changelog dimulai dari versi ini; historical changes sebelum baseline tidak direkonstruksi secara individual.

### Changes

- Current production website ditetapkan sebagai baseline resmi v1.0.0.
- Development-Rules digunakan sebagai source of truth dan Chapter 3 menjadi official development history.
- Seluruh notable changes setelah baseline wajib didokumentasikan di Changelog sebelum di-push ke GitHub.

### Repository

`soulmediaglobal/Web1.0`

### Production Domain

`soulmedia.id`

### Existing Public Structure at Baseline

- Home
- Solutions
- Work
- Work Detail / Case Study
- About
- Contact

### Existing Core Stack at Baseline

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Supabase client dependency
- Three.js
- Lucide React

### Existing CMS Status

- CMS belum dibangun.
- Belum ada official CMS architecture pada baseline ini.

### Testing / Verification

Current production structure, routes, dependencies, and CMS status reviewed against the repository and established as the baseline.

### Known Issues

Historical changes sebelum v1.0.0 tidak direkonstruksi menjadi individual Changelog entries. Riwayat sebelumnya tetap tersedia melalui Git commit history.

### Next Action

All future notable changes must be documented in Chapter 3 and the repository `CHANGELOG.md` before being pushed to GitHub. New entries start from Point 3.

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

## C4P3 — Mandatory Chapter 6 Update

Setelah menyelesaikan setiap task, Kamu sebagai AI wajib memperbarui Chapter 6 agar selalu sesuai dengan kondisi project aktual.

Chapter 6 juga wajib diperbarui ketika Ray memintanya secara eksplisit.

Hasil dan status task harus ditempatkan pada bagian yang tepat:

- **C6P1 — Existing State** untuk kondisi yang sudah ada, sudah selesai, atau aktif.
- **C6P2 — Pending Tasks** untuk pekerjaan yang masih gantung, belum selesai, belum diverifikasi, atau belum masuk development.
- **C6P3 — Active Work** untuk pekerjaan yang sudah berjalan tetapi belum selesai.

Chapter 6 tidak boleh tertinggal dari kondisi project aktual.

## C4P4 — New Collaboration Mechanism Confirmation

Jika Kamu sebagai AI menemukan mekanisme kolaborasi baru yang belum ada di dokumen ini, mekanisme tersebut tidak boleh langsung diadopsi sebagai kebiasaan baru.

Kamu sebagai AI wajib mengonfirmasi terlebih dahulu kepada Ray dengan wording:

> “Ini bukan mekanisme yang ada dalam rule. Mau update ke Hermes dulu sebelum kita lanjut?”

Hermes pada poin ini secara eksplisit merujuk kepada **Guardian of The Document**.

Urutan yang wajib diikuti:

```text
Mekanisme baru terdeteksi
↓
Konfirmasi kepada Ray
↓
Update melalui Hermes jika disetujui
↓
Adopsi mekanisme dan lanjutkan
```

## C4P5 — Status Verification Before Starting a Task

Setelah menerima initial prompt dan membaca `Development-Rules.md`, **Kamu sebagai AI wajib memverifikasi status project aktual sebelum memulai task apa pun**.

Status yang tertulis di The Document tidak boleh langsung dianggap pasti benar tanpa pengecekan.

Verifikasi dilakukan terhadap dua sumber:

1. **GitHub Repository**
2. **Local Repository**

Tujuannya untuk memastikan:

- Branch aktif
- Working tree status
- Commit terbaru
- Local dan remote sinkron atau tidak
- Ada atau tidak perubahan lokal yang belum di-commit
- Ada atau tidak perubahan remote yang belum masuk local
- Kondisi repository sesuai dengan Existing State / Active Work di Chapter 6

### Command untuk Cek Local Repository

```bash
git status
git branch --show-current
git log -1 --oneline
```

### Command untuk Cek Local vs GitHub

```bash
git fetch origin
git status -sb
git log --oneline --decorate --graph --all -10
```

Setelah output terminal diberikan, **Kamu sebagai AI wajib membandingkan hasil aktual dengan status yang tertulis di The Document**.

Jika sesuai:

- Konfirmasi bahwa project state sudah sinkron.
- Lanjut ke proses task sesuai C4P1.

Jika tidak sesuai:

- Jangan langsung mulai development.
- Jelaskan secara singkat perbedaannya.
- Tentukan dulu mana yang menjadi current source of truth.
- Update Chapter 6 jika diperlukan sebelum task dilanjutkan.

## C4P6 — Approval Gate Before Commit and Push

Setelah implementation dan testing selesai, **Kamu sebagai AI wajib berhenti dan meminta approval Ray sebelum melakukan commit atau push ke GitHub**.

Commit dan push tidak boleh dilakukan sebelum Ray memberikan approval.

Setelah approval diberikan, urutan yang wajib diikuti adalah:

```text
Update Changelog
↓
Commit
↓
Push
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

## C4P8 — Capture New Collaboration Behavior Before Push

Setelah feature atau bug fix selesai di local dan sudah melalui testing atau verification, tetapi **belum di-commit atau di-push ke GitHub**, Kamu sebagai AI wajib mengevaluasi apakah selama task tersebut muncul mekanisme kolaborasi atau working behavior baru.

Kamu sebagai AI harus merangkum behavior tersebut secara singkat dan membaginya menjadi:

- **Already Documented** — behavior yang sudah tercakup di The Document.
- **New Behavior Detected** — behavior baru yang belum ada di The Document.
- **Suggested Rule Update** — behavior baru yang layak dijadikan rule permanen.

Jika ada behavior baru yang layak disimpan, Kamu sebagai AI wajib mengonfirmasi kepada Ray:

> “Ada mekanisme/behavior baru dari task ini yang belum tercatat di The Document. Mau update ke Hermes dulu sebelum lanjut?”

Jika Ray setuju:

1. Behavior dirumuskan.
2. Dikirim ke Hermes untuk memperbarui The Document.
3. Flow development dilanjutkan ke approval, changelog, commit, dan push.

Tujuannya adalah supaya working behavior yang efektif tidak hilang setelah task selesai dan dapat menjadi institutional memory untuk AI berikutnya.

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

---

# Chapter 5 — Hand Over Rule

## C5P1 — AI Onboarding Reading Order

Kamu sebagai AI yang menerima handover wajib membaca dokumen ini dengan urutan berikut:

1. **Header Document** — untuk mengetahui Document Version, Web Version, Project, Purpose, dan Description.
2. **Chapter 4 — Collaboration Behavior** — untuk memahami cara kerja Ray serta standar komunikasi dan execution.
3. **Chapter 5 — Hand Over Rule** — untuk memahami cara menerima dan melanjutkan handover.
4. **Chapter 2 — Hierarchy** — terutama Current Technology Stack dan Existing Structure.
5. **Chapter 3 — Changelog** — terutama entry terbaru untuk mengetahui perubahan terakhir.
6. **Chapter 1 — Core Principle** — sebagai rulebook brand dan experience selama development.
7. **Chapter 6 — Project State** — untuk mengetahui kondisi project saat ini, pekerjaan yang masih pending, dan pekerjaan yang sedang aktif.

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

- Current Web Version adalah **v1.0.0**.
- Current production website ditetapkan sebagai official development baseline.
- Public website memiliki Home, Solutions, Work, Work Detail / Case Study, About, dan Contact.
- Supabase project sudah dibuat dan repository sudah linked ke project tersebut.
- CMS database foundation sudah diimplementasikan pada remote database dan diverifikasi.
- Sembilan CMS tables sudah diverifikasi.
- Row Level Security (RLS) aktif.
- Public read policies aktif pada table yang sesuai.
- Required indexes aktif.
- `updated_at` triggers aktif.
- `Web1.0/Development-Rules.md` menjadi canonical technical source of truth project-wide setelah merged ke `main`; versi pada task branch berstatus branch-local newer version.
- Chapter 3 menjadi official development history setelah baseline.

## C6P2 — Pending Tasks

- Authentication implementation.
- Write policies.
- Media and storage implementation.
- CMS Admin UI.
- Frontend migration to CMS-backed content.

## C6P3 — Active Work

- **CMS Database Foundation** — database foundation sudah diimplementasikan dan remote database sudah diverifikasi. Pada current repository state, tidak ada uncommitted database implementation file; task belum memiliki repository commit selain documentation branch setup dan masih memerlukan penyelesaian Git flow atau task closure sesuai approval gate.

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
