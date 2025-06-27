# 🌍 Global Expense Tracker - Business Requirements Document (BRD)

## 📘 Project Title

**Global Expense Tracker**

## 📌 Purpose

To build a collaborative, multi-currency expense tracking platform for groups that enables real-time expense recording, transparent settlements, and shared access.

---

## 🎯 Objectives

- Track and split expenses within groups
- Support multiple currencies with real-time conversion
- Allow collaborative participation via invitations
- Provide clear, itemized settle-up reports

---

## 🔍 Scope

### ✅ In Scope

- Group creation (name, currency, participants)
- Add expenses (category, date, currency, paid by, shared with)
- Display expense list in tabular format
- Perform settle-up calculations
- Invite users to join and contribute to groups

### ❌ Out of Scope

- Bank/payment integrations
- Tax handling
- Offline functionality

---

## 🧑‍💼 Stakeholders

- **End Users:** Travelers, roommates, teams
- **Admin Users:** Group creators
- **Product Owner**
- **Engineering Team**
- **QA Team**

---

## 🧱 Functional Requirements

| ID  | Feature           | Description                                                               | Priority | Story Points |
| --- | ----------------- | ------------------------------------------------------------------------- | -------- | ------------ |
| FR1 | Group Creation    | Create a group with name, base currency, and invited users                | High     | 5            |
| FR2 | Invite Users      | Invite people via email to join group                                     | High     | 3            |
| FR3 | Add Expense       | Add expenses with amount, date, currency, category, payer, and recipients | High     | 8            |
| FR4 | Expense Table     | List all group expenses in a sortable table                               | High     | 3            |
| FR5 | Settle-Up Summary | Show per-head total, category-wise breakdown, and who owes whom           | High     | 8            |
| FR6 | Currency Handling | Convert expenses to group currency using real-time FX rates               | Medium   | 13           |
| FR7 | User Roles        | Admins can invite; all members can add/view expenses                      | Medium   | 5            |

---

## 👤 User Stories & Acceptance Criteria

### US1: Group Creation

**As a user**, I want to create a group with a base currency and invite others.

- **Acceptance Criteria:**

  - Group name and base currency are required
  - Invitations can be sent via email
  - Invited users must register/login

- **Story Points:** 5

---

### US2: Add Expense

**As a user**, I want to log expenses with all necessary details.

- **Acceptance Criteria:**

  - Inputs: amount, date, currency, category, paid by, split with
  - Auto-split logic applies
  - Valid only for group members

- **Story Points:** 8

---

### US3: Expense Table

**As a user**, I want to view all group expenses in a table.

- **Acceptance Criteria:**

  - Columns: date, description, amount, currency, payer, split with
  - Sortable by date and amount

- **Story Points:** 3

---

### US4: Settle-Up Summary

**As a user**, I want to see clear settle-up info.

- **Acceptance Criteria:**

  - Shows: total per person, per-head cost
  - Category breakdown
  - Who owes whom in group currency

- **Story Points:** 8

---

### US5: Multi-Currency Support

**As a user**, I want to record expenses in any currency.

- **Acceptance Criteria:**

  - Accepts multiple currencies
  - Converts to group base currency
  - Uses FX rate on expense date

- **Story Points:** 13

---

### US6: Invite Users

**As a group admin**, I want to invite others to the group.

- **Acceptance Criteria:**

  - Users get email invite
  - Must log in to join
  - Only group members have access

- **Story Points:** 3

---

## 📐 Non-Functional Requirements

- ✅ 99.9% uptime
- ✅ Mobile responsive
- ✅ OAuth 2.0 secure login
- ✅ Real-time sync
- ✅ GDPR compliant

---

## 🔐 Security Requirements

- Role-based access: admin vs member
- Secure token authentication
- Data encrypted at rest and in transit

---

## 🔄 SOP (Standard Operating Procedures)

### QA Checklist

- Verify FX rates applied correctly
- Validate access control per group
- Confirm expense splits for edge cases

### Dev Guidelines

- REST or GraphQL APIs
- NoSQL DB (e.g., Firebase, Appwrite)
- Use external FX API (e.g., OpenExchangeRates)

---

## 🧱 Tech Stack

| Layer       | Stack Used                                  |
| ----------- | ------------------------------------------- |
| Frontend    | Next.js (App Router), React 19, TypeScript  |
| Styling     | Tailwind CSS, tailwindcss-animate, Radix UI |
| Icons       | Lucide React                                |
| Auth & DB   | Supabase (auth, database, SSR)              |
| State/Theme | next-themes                                 |
| Fonts       | Geist (Google Fonts)                        |
| Deployment  | Vercel                                      |
| FX API      | OpenExchangeRates (planned)                 |

---
