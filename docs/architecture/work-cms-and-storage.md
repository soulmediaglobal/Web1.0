# Work CMS and Storage

Work CMS extends the existing protected admin shell and the existing case-study schema. Active administrators from `public.cms_users` can read, create, and update case studies and manage their tags, system points, optional testimonial, and managed image. Parent case studies cannot be hard-deleted; `archived` is the removal path.

Anonymous access remains governed by the original published-only policies. Draft and archived parent rows—and all relations belonging to them—remain unavailable publicly.

## Media boundary

CMS-managed images use the public `work` bucket under `case-studies/` and are stored in the database as `storage://work/<object-path>`. JPG, PNG, WebP, and AVIF files up to 5 MB are accepted. Only active admins can list, upload, update, or delete objects in this path.

Existing `projects/...` references identify bundled application assets. They remain valid until replaced and are never eligible for Storage cleanup. For managed replacements, the CMS uploads first, saves the new database reference, then removes the superseded managed object. A failed database save removes the newly uploaded object.

Parent and relation writes are performed by the security-invoker `save_work_case_study` database function. The function remains subject to active-admin RLS and updates the parent, tags, system points, and optional testimonial in one transaction, preventing partial relation replacement on a failed save.

## Content behavior

`sort_order` controls public ordering and adjacent navigation. `number` remains editorially controlled. Tags drive the existing public filter list. Published records require complete public fields, an image with alt text, and at least one system point. A testimonial is optional, but quote, author, and role must be supplied together.
