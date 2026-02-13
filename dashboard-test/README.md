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

