# JWT & Cookie Setup for Vercel Deployment

## Environment Variables Required

Make sure these are set in your Vercel project settings:

### Required Variables:
```
NEXT_JWT_SECRET=your_jwt_secret_here (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=https://your-app.vercel.app
DATABASE_URL=your_database_connection_string
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Vercel-Specific Variables:
- `VERCEL=1` - Automatically set by Vercel (used to detect production environment)

## Cookie Configuration

The JWT token is stored as an HTTP-only cookie with the following settings:

- **httpOnly**: `true` - Prevents JavaScript access (security)
- **secure**: `true` in production - Only sent over HTTPS (required for Vercel)
- **sameSite**: `lax` - Good for same-site requests, works with Vercel
- **maxAge**: 7 days (604800 seconds)
- **path**: `/` - Available site-wide

## How It Works

1. **Token Generation**: When a user completes onboarding, a JWT token is generated with their `id` and `role`
2. **Cookie Setting**: The token is set as an HTTP-only cookie in the response
3. **Token Verification**: API routes extract the token from cookies and verify it
4. **Authentication**: Protected routes use `authenticateRequest()` or `requireAuth()` to verify the token

## Testing on Vercel

1. **Check Cookie in Browser DevTools**:
   - Open DevTools → Application → Cookies
   - Look for `jwt_token` cookie
   - Verify it has `HttpOnly` and `Secure` flags set

2. **Test API Endpoints**:
   - Make a request to `/api/auth/me` - should return user info if authenticated
   - Make a request to protected endpoints - should work if token is valid

3. **Common Issues**:
   - **Cookie not set**: Check if `NEXT_JWT_SECRET` is set in Vercel
   - **Cookie not sent**: Ensure you're using HTTPS (Vercel provides this automatically)
   - **Token invalid**: Check if token hasn't expired (7 days) and secret matches

## Security Notes

- JWT secret should be at least 32 characters long
- Never commit secrets to git
- Use Vercel's environment variables for all secrets
- Cookies are automatically secure on Vercel (HTTPS only)
