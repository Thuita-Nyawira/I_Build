╔══════════════════════════════════════════════════════════════════╗
║         ILoadList — Construction Equipment Rental System         ║
║                    Phase 1 — Ready to Use                        ║
╚══════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HOW TO START
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Open the file "index.html" in Google Chrome or Microsoft Edge
2. No internet required to run — it works completely offline
3. All your data saves automatically inside Chrome on this computer
4. Bookmark it so you can open it quickly every day

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FILE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  index.html             Application shell
  styles.css             Shared layout and component styles
  app.js                 Shared data store and application behavior
  sections/login.js      Login screen
  sections/dashboard.js  Dashboard view
  sections/products.js   Products and inventory view
  sections/hires.js      Active hires view
  sections/reservations.js Reservations and pickup conversion view
  sections/reminders.js  Reminders view
  sections/clients.js    Clients view
  sections/invoices.js   Invoices and documents view
  sections/reports.js    Reports view
  sections/users.js      User management view
  sections/activity-log.js Activity log view
  sections/modals.js     Shared modal workflows

The section files are loaded by index.html and remain compatible with
opening the application directly as a local file.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  FIRST-TIME SETUP (do this before entering real data)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1 — Log in as Owner (username: owner / password: owner123)

Step 2 — Go to User Management and set up real user accounts:
   • Click "+ Admit user" to add your real Manager and Staff accounts
   • Give each person their own username and password
   • Remove the demo accounts (owner, manager, john) once yours are set

Step 3 — Go to Products and delete the demo products:
   • Click "− Sell/Dispose" on each item, set qty to full total, reason: "Demo data removal"
   • Then click "+ New Purchase" to add your real equipment

Step 4 — Customize your business details:
   • Open index.html in a text editor (Notepad works)
   • Find and replace "YOUR COMPANY NAME" with your real business name
   • Find and replace "0700 000 000" with your real phone number
   • Find and replace "000000" (M-Pesa till) with your real till number
   • Find and replace "info@yourcompany.co.ke" with your real email
   • Find and replace "YOUR KRA PIN" with your real KRA PIN
   • Save the file — done

Step 5 — Enter your existing active hires (if migrating from book/spreadsheet)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  DEMO ACCOUNTS (for testing only — replace before going live)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  owner    / owner123   → Owner (full access including prices)
  manager  / mgr123     → Manager (no price changes)
  john     / staff123   → Staff (hires, payments, invoices only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CRITICAL — DATA BACKUP (do this every week without fail)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Your data lives inside Chrome on this specific computer.
If the computer crashes or Chrome is reset, data can be lost.

TO BACK UP:
1. Open index.html in Chrome
2. Press F12 on your keyboard (opens Developer Tools)
3. Click the "Console" tab
4. Type:  exportData()  and press Enter
5. A file called iloadlist_backup_[date].json downloads automatically
6. Move that file to Google Drive, a USB drive, or WhatsApp yourself

Do this every Friday before leaving the office.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHAT EACH USER CAN DO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OWNER:       Everything — prices, discounts, users, all reports, returns
MANAGER:     Hires, payments, returns, invoices, reports, reminders
STAFF:       Hires, payments, invoices, clients (no prices, no returns)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  KEY FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Dashboard — live fleet utilization, overdue returns, unpaid balances
✓ Products — buy new equipment, restock, sell/dispose, utilization tracking
✓ Price Management — owner/manager only, with mandatory reason & full audit
✓ Discounts — set % discount per product, automatically applies to new hires
✓ Active Hires — up to 5 installment payments, payment progress tracking
✓ Return Processing — collects final payment, flags any unpaid balance
✓ Unpaid Balance Alerts — manager & owner notified on next login
✓ Reminders — due soon, overdue escalation, outstanding balance queues
✓ Invoices — hire invoice, deposit receipt, payment receipt, return note
✓ WhatsApp Share — one-click sends invoice to client's WhatsApp
✓ Print / PDF — professional printable invoices direct from browser
✓ Clients — directory with outstanding balance tracking per client
✓ Reports — utilization charts, revenue analytics
✓ User Management — up to 5 users, owner controls access
✓ Login Alerts — owner & manager notified when others sign in
✓ Session History — login time, logout time, duration, actions per session
✓ Activity Log — full audit trail of everything, filterable
✓ Auto Logout — 10-minute inactivity timeout with countdown warning
✓ Data Backup — one command exports all data to JSON

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  IMPORTANT RULES FOR YOUR TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. NEVER clear Chrome's browsing history/cache — this deletes all data
2. NEVER use the system on two different computers at the same time
3. ONE computer is the master — all users log into this same machine
4. Back up every Friday using exportData() in the console
5. The owner is the only one who can change prices and admit/remove users
6. Every price change requires a reason — this is mandatory and logged

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SUPPORT & NEXT STEPS (Phase 2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When ready to upgrade to Phase 2 (cloud database, M-Pesa auto-confirm,
multi-device access, eTIMS), a Nairobi developer can migrate this
system for approximately KSh 80,000–150,000 one-time.

Built with ILoadList · Phase 1 Production Build
