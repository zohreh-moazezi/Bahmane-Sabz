## Login Feature

### Overview
The login page is implemented using modern best practices and clean architecture.

### Technologies Used
- React Hook Form → form state management
- Zod → validation
- React Query → API communication
- Chakra UI → UI components

### Architecture Decisions
- Validation schema is separated for reusability
- API logic is placed in `services/auth/authService.ts`
- Custom hook `useLogin.ts` handles authentication logic
- UI and logic are separated (SOLID principle)

### Flow
1. User enters username & password
2. Zod validates inputs
3. React Query sends login request
4. On success:
   - Token stored
   - User redirected to dashboard
5. On error:
   - Error message shown
