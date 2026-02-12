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
