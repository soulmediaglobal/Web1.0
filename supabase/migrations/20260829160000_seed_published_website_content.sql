-- Approved public website baseline for Issue #5. This migration is idempotent.
insert into public.pages (slug, title, status, sort_order, published_at) values
  ('home', 'Home', 'published', 1, now()), ('solutions', 'Solutions', 'published', 2, now()),
  ('work', 'Work', 'published', 3, now()), ('about', 'About', 'published', 4, now()),
  ('contact', 'Contact', 'published', 5, now())
on conflict (slug) do update set title = excluded.title, status = excluded.status, sort_order = excluded.sort_order, published_at = excluded.published_at;

insert into public.site_content (key, value, group_name, description) values
  ('shared.footer.tagline', 'Digital Transformation & Technology Partner', 'shared.footer', 'Footer positioning line'),
  ('shared.footer.practice', 'Strategy. Product. Engineering. AI. Infrastructure.', 'shared.footer', 'Footer practice list'),
  ('shared.footer.location', 'Yogyakarta, Indonesia', 'shared.footer', 'Shared office location'),
  ('home.services.eyebrow', 'What We Do', 'home.services', 'Services section eyebrow'),
  ('home.services.title', E'From Strategy to\nScalable Systems.', 'home.services', 'Services section title; newline controls the approved break'),
  ('home.services.description', 'We help businesses define, build, and scale digital systems across product, engineering, automation, and infrastructure.', 'home.services', 'Services section introduction'),
  ('home.work.eyebrow', 'Selected Work', 'home.work', 'Selected work eyebrow'),
  ('home.work.title', E'Built for Real\nBusiness Problems.', 'home.work', 'Selected work title; newline controls the approved break'),
  ('home.work.description', 'A selection of digital products, platforms, and systems designed to solve real operational and business challenges.', 'home.work', 'Selected work introduction'),
  ('home.leadership.eyebrow', 'Founders', 'home.leadership', 'Leadership section eyebrow'),
  ('home.leadership.title', E'Built by Operators,\nProduct Thinkers,\nand Technologists.', 'home.leadership', 'Leadership section title; newlines control approved breaks'),
  ('home.leadership.description', 'Soul Media Global is led by founders with hands-on experience across business operations, digital products, and technology execution.', 'home.leadership', 'Leadership section introduction'),
  ('solutions.intro', 'Select a node to see how each capability connects to your business system — the same core capabilities behind every system we build.', 'solutions', 'Solutions page introduction'),
  ('work.intro', 'A record of platforms, command centers, and infrastructure delivered for government, banking, and enterprise clients across Indonesia.', 'work', 'Work page introduction')
on conflict (key) do update set value = excluded.value, group_name = excluded.group_name, description = excluded.description;

insert into public.solutions (key, number, number_label, short_title, title, description, status, sort_order, published_at) values
  ('strategy', '01', '01 / 04', 'Strategy', 'Digital Strategy & Product Architecture', 'Define the right product direction, system structure, and roadmap before development begins.', 'published', 1, now()),
  ('product', '02', '02 / 04', 'Product', 'Custom Software & Enterprise Applications', 'Build web applications, internal systems, platforms, dashboards, and business-critical tools.', 'published', 2, now()),
  ('intelligence', '03', '03 / 04', 'Intelligence', 'AI, Automation & System Integration', 'Connect systems, automate workflows, and apply AI where it creates real operational value.', 'published', 3, now()),
  ('infrastructure', '04', '04 / 04', 'Infrastructure', 'Cloud & Platform Engineering', 'Design reliable infrastructure, deployment environments, and scalable technical foundations.', 'published', 4, now())
on conflict (key) do update set number = excluded.number, number_label = excluded.number_label, short_title = excluded.short_title, title = excluded.title, description = excluded.description, status = excluded.status, sort_order = excluded.sort_order, published_at = excluded.published_at;

delete from public.solution_capabilities where solution_id in (select id from public.solutions where key in ('strategy','product','intelligence','infrastructure'));
insert into public.solution_capabilities (solution_id, label, sort_order)
select s.id, item.label, item.sort_order from public.solutions s join (values
  ('strategy', 'Product Roadmapping', 1), ('strategy', 'System Architecture', 2), ('strategy', 'Technical Discovery', 3),
  ('product', 'Web Platforms', 1), ('product', 'Internal Tools', 2), ('product', 'Dashboards', 3),
  ('intelligence', 'Workflow Automation', 1), ('intelligence', 'API Integration', 2), ('intelligence', 'Applied AI', 3),
  ('infrastructure', 'Cloud Architecture', 1), ('infrastructure', 'Deployment', 2), ('infrastructure', 'Scalability', 3)
) as item(solution_key, label, sort_order) on s.key = item.solution_key;

delete from public.leadership where name in ('Rayhan', 'Tomy Galih Prasetyo');
insert into public.leadership (number, name, role, description, image_url, image_alt, status, sort_order, published_at) values
  ('01', 'Rayhan', 'Founder — Product & Technology', 'Leads product direction and technology execution, translating complex business needs into clear, scalable digital systems.', 'leadership/ray.png', 'Rayhan, Founder — Product & Technology', 'published', 1, now()),
  ('02', 'Tomy Galih Prasetyo', 'Founder — Business & Marketing', 'Leads business execution and market strategy, keeping every engagement connected to real operational and growth priorities.', 'leadership/tomy.png', 'Tomy Galih Prasetyo, Founder — Business & Marketing', 'published', 2, now())
;

insert into public.case_studies (slug, number, category, sector, type, client, name, summary, image_url, image_alt, featured, challenge, status, sort_order, published_at) values
  ('minerbaone', '01', 'Mining / Government', 'Government', 'Platform Build', 'Kementerian ESDM', 'MinerbaOne', 'An integrated digital platform unifying governance, licensing workflows, monitoring, and sector data for mineral and coal mining.', 'projects/minerba-one.png', 'Abstract visualization of an integrated digital mining governance platform', true, 'Licensing and oversight for mineral and coal mining were spread across disconnected tools and manual review steps, making approvals slow and sector-wide visibility difficult for regulators.', 'published', 1, now()),
  ('bri-command-center', '02', 'Banking / State-owned Company', 'Banking', 'Command Center', 'Bank Rakyat Indonesia', 'BRI Digital Command Center', 'A centralized command center connecting real-time sentiment and audience insights with business performance indicators.', 'projects/bri-command-center.png', 'Abstract visualization of a banking intelligence and digital monitoring command center', true, 'Sentiment signals, audience insight, and business performance data lived in separate systems, making it hard to see how public perception connected to actual business outcomes in one place.', 'published', 2, now()),
  ('network-monitoring', '03', 'Communication / Government', 'Telecommunications', 'National Monitoring System', 'Kementerian Komunikasi dan Informasi', 'Internet Connection Network Monitoring', 'A nationwide digital map visualizing 2G and 3G coverage, performance, and network quality across regions.', 'projects/network-monitoring.png', 'Abstract visualization of nationwide telecommunications network monitoring across Indonesia', true, 'Understanding network coverage and quality nationwide meant piecing together regional reports with no single, current view of where connectivity was strong, weak, or missing.', 'published', 3, now()),
  ('apartment-tenant-management', '04', 'Property / Private Sector', 'Property', 'Mobile Product & Engineering', 'Agung Podomoro Group', 'APG Tenant Mobile App & Marketplace', 'An integrated Android application connecting apartment information, management communication, and direct booking for tenant services in one residential experience.', 'projects/apartment-tenant-management.png', 'Abstract visualization of a connected apartment tenant application and residential services marketplace', false, 'Apartment tenants depended on separate manual channels for building information, management communication, and internal service bookings. This fragmented experience created additional coordination work for management teams and made routine tenant transactions less convenient than they needed to be.', 'published', 4, now()),
  ('carsworld-ai-executive-dashboard', '05', 'Automotive / Private Sector', 'Automotive', 'AI Executive Dashboard', 'Carsworld', 'Carsworld AI Executive Dashboard', 'An AI-powered executive dashboard transforming distributed transaction and operational data into a unified view for faster, more informed business decisions.', 'projects/carsworld-ai-dashboard.png', 'Abstract visualization of an AI-powered automotive transaction and executive intelligence dashboard', false, 'Transaction and operational data were scattered across separate sources, limiting executive visibility into business performance and making critical insights harder to surface. Teams needed a clearer way to connect transactional activity with operational conditions and productivity priorities.', 'published', 5, now()),
  ('national-command-center', '06', 'Law Enforcement / Government', 'Law Enforcement', 'Integrated Command Center', 'Confidential', 'National Command Center', 'A large-scale command center integrating multi-format regional reporting into a unified operational view for faster cross-regional analysis and decision-making.', 'projects/national-command-center.png', 'Abstract visualization of a secure national command center integrating multi-format regional data', false, 'Operational data arrived from different regions and organizational levels in multiple formats, creating disconnected reporting flows and slowing cross-regional analysis. The client needed a scalable way to normalize those inputs without losing the context required for coordinated decision-making.', 'published', 6, now()),
  ('precious-contractor-company-profile', '07', 'Construction / Private Sector', 'Construction', 'Corporate Website', 'Precious Contractor', 'Construction Company Profile Website', 'A modern, high-impact company profile website presenting construction capabilities and project experience to strengthen credibility with prospective clients and investors.', 'projects/precious-contractor-profile.png', 'Abstract visualization of a construction company profile website connecting architectural projects, blueprints, and structural capabilities', false, 'The company lacked a professional digital presence capable of communicating its construction expertise and completed work to prospective clients and investors. Without a credible central destination for company information and project experience, establishing trust and supporting new business conversations was more difficult.', 'published', 7, now())
on conflict (slug) do update set number = excluded.number, category = excluded.category, sector = excluded.sector, type = excluded.type, client = excluded.client, name = excluded.name, summary = excluded.summary, image_url = excluded.image_url, image_alt = excluded.image_alt, featured = excluded.featured, challenge = excluded.challenge, status = excluded.status, sort_order = excluded.sort_order, published_at = excluded.published_at;

delete from public.case_study_tags where case_study_id in (select id from public.case_studies where slug in ('minerbaone','bri-command-center','network-monitoring','apartment-tenant-management','carsworld-ai-executive-dashboard','national-command-center','precious-contractor-company-profile'));
insert into public.case_study_tags (case_study_id, tag)
select c.id, item.tag from public.case_studies c join (values
  ('minerbaone','mining'), ('bri-command-center','banking'), ('network-monitoring','telecommunications'),
  ('apartment-tenant-management','property'), ('carsworld-ai-executive-dashboard','automotive'),
  ('national-command-center','law-enforcement'), ('precious-contractor-company-profile','construction')
) as item(slug, tag) on c.slug = item.slug;

delete from public.case_study_system_points where case_study_id in (select id from public.case_studies where slug in ('minerbaone','bri-command-center','network-monitoring','apartment-tenant-management','carsworld-ai-executive-dashboard','national-command-center','precious-contractor-company-profile'));
insert into public.case_study_system_points (case_study_id, title, description, sort_order)
select c.id, item.title, item.description, item.sort_order from public.case_studies c join (values
  ('minerbaone','Unified Licensing','A single workflow for permit submission and review.',1),
  ('minerbaone','Sector Monitoring','Consolidated visibility into mining activity and compliance.',2),
  ('minerbaone','Sector Data Hub','Centralized data across regions and licensing bodies.',3),
  ('minerbaone','Governance Controls','Structured access for regulators and operators.',4),
  ('bri-command-center','Unified Dashboard','Sentiment and performance data in a single command view.',1),
  ('bri-command-center','Real-Time Feeds','Continuously updated audience and market signals.',2),
  ('bri-command-center','Cross-Team Visibility','Shared view across communications and business teams.',3),
  ('network-monitoring','National Coverage Map','A live map of 2G and 3G coverage by region.',1),
  ('network-monitoring','Quality Tracking','Ongoing visibility into network performance, not just presence.',2),
  ('network-monitoring','Regional Breakdown','Drill-down views for provincial and local oversight.',3),
  ('apartment-tenant-management','Resident Information Hub','Centralized apartment information and essential tenant updates in one mobile experience.',1),
  ('apartment-tenant-management','Management Communication','Created a direct digital channel between property management and residents.',2),
  ('apartment-tenant-management','In-App Service Booking','Enabled tenants to discover and book available residential services from the application.',3),
  ('apartment-tenant-management','Tenant Marketplace','Brought internal service transactions into a structured mobile marketplace.',4),
  ('carsworld-ai-executive-dashboard','Unified Transaction View','Consolidated distributed transaction data into a single executive perspective.',1),
  ('carsworld-ai-executive-dashboard','AI-Assisted Insights','Applied AI to surface meaningful patterns across operational and transactional information.',2),
  ('carsworld-ai-executive-dashboard','Operational Visibility','Connected business activity with the workflow conditions affecting productivity.',3),
  ('carsworld-ai-executive-dashboard','Executive Decision Support','Presented critical signals in a form designed for faster management review and action.',4),
  ('national-command-center','Multi-Format Data Pipeline','Structured varied incoming data formats into a consistent integration flow.',1),
  ('national-command-center','Regional Reporting Network','Unified reporting from different regions and organizational levels.',2),
  ('national-command-center','Command Analysis View','Consolidated operational inputs into one environment for cross-regional analysis.',3),
  ('national-command-center','Coordinated Visibility','Provided decision-makers with a shared view across previously separated data silos.',4),
  ('precious-contractor-company-profile','Corporate Positioning','Structured the company profile around its capabilities, experience, and professional credibility.',1),
  ('precious-contractor-company-profile','Project Showcase','Created a clear visual destination for presenting representative construction work.',2),
  ('precious-contractor-company-profile','Stakeholder Information','Organized essential company information for prospective clients and investors.',3),
  ('precious-contractor-company-profile','Lead Generation Path','Provided a focused digital route from project discovery to business inquiry.',4)
) as item(slug, title, description, sort_order) on c.slug = item.slug;
