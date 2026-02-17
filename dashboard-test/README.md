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
- API logic is placed in `services/auth/authService.ts`
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

## Components

### 1. DashboardLayout
- Provides consistent dashboard layout (Sidebar + Header + Main content).
- Sidebar includes links to Dashboard, Users, Products.
- Header shows logged-in user avatar and greeting.

### 2. UsersPage (`pages/users.tsx`)
- Fetches paginated users using `useUsers` hook.
- Displays `UserTable` with list of users.
- Handles opening `UserFormModal` for add/edit operations.

### 3. UserTable
- Displays users in a table format with avatar, name, email, and gender.
- Includes **Add**, **Edit**, **Delete** buttons.
- Shows **pagination** controls.
- Handles opening `UserFormModal` and delete confirmation dialog.

### 4. UserFormModal
- Modal for adding/editing a user.
- Uses **React Hook Form** for validation and form management.
- Fields: `firstName`, `lastName`, `email`.

### 5. Hooks
#### `useUsers`
- Fetch paginated users via API.
- Returns `users`, `total`, `isLoading`.

#### `useUserMutations`
- Handles `addUser`, `updateUser`, `deleteUser`.
- Uses React Query mutations with **cache updates** instead of refetching.

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

## Future Improvements
- Implement real backend persistence.
- Add **search users** functionality.
- Add **filters** by role, gender, or status.
- Add **toast notifications** for add/update/delete operations.

