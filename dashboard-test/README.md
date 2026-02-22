## 🌍 Live Deployment

You can access the deployed project here:

🔗 https://bahman-e-sabz.netlify.app/login

## Login Feature

### Overview
The login page is implemented using modern best practices and clean architecture.

### Technologies Used
- React Hook Form → form state management
- Zod → validation
- React Query → API communication
- Chakra UI → UI components

## Architecture Highlights

- Feature-based folder structure
- SOLID principles
- Separation of Concerns
- DRY validation strategy
- Custom hooks for business logic
- Centralized API layer


### Architecture Decisions
- Validation schema is separated for reusability
- API logic is placed in services folder
- Custom hook `useLogin.ts` handles authentication logic
- UI and logic are separated (SOLID principle)

### Flow
Authentication Flow

User logs in via /login

Access token stored in localStorage

Refresh token stored in localStorage

Axios interceptor attaches access token automatically

Expired tokens are refreshed using refresh token

Protected routes redirect unauthenticated users to login


# Dashboard Feature

## Overview
This feature implements a professional admin dashboard including:
- Top-level statistics (users, products)
- Recent Users
- Recent Products
- Protected route for authenticated users


## Usage
- `StatCard` → reusable for showing any numeric stats
- `RecentUsers` → displays recent users with avatar, name, email, gender
- `RecentProducts` → displays recent products with thumbnail, title, price
- `useDashboardStates` → fetches users and products data using react-query

## Protected Route
Dashboard page is wrapped with `withAuth` HOC to prevent unauthenticated access.

## How to Run
1. `yarn install`
2. `yarn dev`
3. Navigate to `/dashboard` after login

# Dashboard – User Section

## Overview
The **User Section** allows an admin to view, add, edit, and delete users.  
It is implemented with **Next.js**, **React Query**, **Chakra UI**, and **React Hook Form**.  

Since the backend API simulates changes (no persistence), all CRUD operations are reflected using **React Query cache** for immediate UI updates.

---



## User Flow

1. **View Users:**  
   Open Users page → Users fetched via API → Displayed in table with pagination.

2. **Add User:**  
   Click "Add User" → Modal opens → Fill form → Click "Save" → User added to cache → Table updates.

3. **Edit User:**  
   Click "Edit" on a user → Modal opens with pre-filled info → Modify → Click "Save" → User updated in cache → Table updates.

4. **Delete User:**  
   Click "Delete" → Confirmation dialog opens → Confirm → User removed from cache → Table updates.

5. **Note:**  
   Backend is simulation-only; changes are **cached locally** using React Query to demonstrate CRUD operations.

---

## Tools & Libraries Used
- **Next.js** – Page routing & SSR
- **Chakra UI** – Styling and layout
- **React Query** – Data fetching, caching, and mutations
- **React Hook Form** – Form handling and validation
- **Axios** – API requests

---




Refactor Notes – Migration from users feature → generic entities feature
Why we refactored

Originally, the project had a dedicated users feature folder with its own:

components

hooks

services

types

When implementing the Products section, we noticed that:

Table UI was identical

Modal form behavior was identical

CRUD logic was identical

Pagination logic was identical

API structure was identical

This created duplication risk and violated:

DRY principle

SOLID (especially Open/Closed)

Separation of Concerns

So we redesigned the architecture to support multiple entities using one generic system.

🏗️ New Architecture (Scalable & Maintainable)

We replaced:

features/
  users/

With:

features/
  entities/
    components/
    hooks/
    services/
    types/

Now Users and Products are just configurations of the same engine.

This makes the system:

Easily scalable

Clean

Maintainable

Extendable for future entities (Orders, Categories, etc.)

🧠 Architectural Benefits
DRY

All shared CRUD logic exists in one place:

One table component

One modal form

One API layer

One mutation hook

No duplicated logic between users/products.

SOLID Principles

Single Responsibility

EntityTable → handles list display + actions

EntityFormModal → handles form UI

useEntities → handles fetching

useEntityMutations → handles mutations

entityApi → handles HTTP requests

Each file has one clear job.

Open/Closed

To support a new entity, we only:

Pass a different entityName

Pass different columns

No internal logic changes needed.

Liskov Substitution

User and Product both extend BaseEntity

Both can be used in the same components safely.

Interface Segregation

Components only receive what they need:

table → columns + items

modal → fields

Dependency Inversion

UI depends on hooks

Hooks depend on services

Services depend on axios

Clean layered structure.

Separation of Concerns
Layer	Responsibility
Pages	Entity configuration
Components	UI rendering
Hooks	State + logic
Services	API communication
Types	Contracts
🚀 Scalability

To add a new entity (example: Orders):

Only create:

pages/orders.tsx

And pass:

useEntities<Order>("orders")
<EntityTable columns=[...] />

No new components needed.