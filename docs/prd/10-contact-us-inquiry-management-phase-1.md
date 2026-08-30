# Contact Us Inquiry Management — Phase 1

## Objective

Turn the existing public Contact Us form into a real inquiry flow where submitted messages are stored in Supabase and can be accessed and followed up from the CMS.

## Approved scope

- Preserve identity/title, corporate email, organization, budget, service/project type, and briefing/message.
- Add client and server validation plus loading, success, and error states.
- Store inquiries in `contact_inquiries`, defaulting to `new` and allowing only `new`, `contacted`, or `closed`.
- Prevent public read/update access and use a secure public write boundary without browser-exposed privileged credentials.
- Reuse CMS authentication and the active-admin `cms_users` authorization architecture.
- Add Contact Inquiries list, full detail, and status update UI while preserving responsive behavior.

## Explicit exclusions

Email notifications, sender confirmation, PIC assignment, activity log, attachments, CRM, WhatsApp, Slack, advanced search/filter, analytics, lead scoring, automation/routing, duplicate detection, and reporting are outside Phase 1.

## Acceptance criteria

The public form persists a validated inquiry through the approved boundary; public users cannot read or update inquiry data; authorized CMS admins can list and open complete inquiries and change only their supported status; controlled UI states and responsive behavior work; RLS/security, documentation, and required quality gates are verified.
