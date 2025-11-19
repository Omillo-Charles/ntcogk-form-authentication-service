# NTCOG Kenya Authentication API

Form-based authentication service for the New Testament Church of God Kenya website.

## Features

- User registration with email verification
- Login with JWT authentication
- Refresh token mechanism
- Password reset via email
- Profile management
- Password change
- OTP verification
- Admin statistics
- Rate limiting
- Input validation and sanitization

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT (Access & Refresh tokens)
- bcryptjs for password hashing
- Nodemailer for email notifications

## API Endpoints

### Public Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `POST /api/auth/verify-email` - Verify email with OTP
- `POST /api/auth/resend-otp` - Resend verification OTP

### Protected Routes (Require Authentication)

- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/admin/stats` - Get admin statistics

### Health Check

- `GET /health` - Check API status

## Local Development

### Prerequisites

- Node.js >= 16.0.0
- MongoDB Atlas account or local MongoDB
- Gmail account for email notifications

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
copy .env.example .env
```

3. Configure environment variables in `.env`:
```env
PORT=5502
NODE_ENV=development
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

5. Start production server:
```bash
npm start
```

## Vercel Deployment

### Step 1: Prepare for Deployment

The project is already configured with `vercel.json` for deployment.

### Step 2: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

### Step 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Set root directory to: `New-Testament-Backend/authentications/form-authentcation`
5. Configure environment variables in Vercel dashboard:

**Required Environment Variables:**
```
NODE_ENV=production
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-production-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
FRONTEND_URL=https://ntcogk.org
RESET_PASSWORD_EXPIRES=3600000
```

6. Click "Deploy"

### Step 4: Deploy via CLI (Alternative)

```bash
cd New-Testament-Backend/authentications/form-authentcation
vercel
```

Follow the prompts and add environment variables when asked.

### Step 5: Update Frontend Configuration

After deployment, update your frontend `.env` file:

```env
NEXT_PUBLIC_AUTH_API_URL=https://your-deployment-url.vercel.app/api/auth
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 5502 |
| NODE_ENV | Environment (development/production) | No | development |
| MONGO_URI | MongoDB connection string | Yes | - |
| JWT_SECRET | JWT secret key | Yes | - |
| JWT_EXPIRES_IN | JWT expiration time | No | 7d |
| JWT_REFRESH_SECRET | Refresh token secret | Yes | - |
| JWT_REFRESH_EXPIRES_IN | Refresh token expiration | No | 30d |
| EMAIL_HOST | SMTP host | Yes | - |
| EMAIL_PORT | SMTP port | No | 587 |
| EMAIL_USER | Email username | Yes | - |
| EMAIL_PASS | Email password/app password | Yes | - |
| FRONTEND_URL | Frontend URL for CORS | No | http://localhost:3000 |
| RESET_PASSWORD_EXPIRES | Password reset token expiry (ms) | No | 3600000 |

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Refresh token rotation
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- CORS protection
- HTTP-only cookies for tokens
- Password reset token expiration
- Email verification with OTP

## Rate Limiting

- General API: 100 requests per 15 minutes
- Auth endpoints: 5 requests per 15 minutes
- Password reset: 3 requests per 15 minutes

## Testing

Test the API using curl or Postman:

```bash
# Health check
curl https://your-deployment-url.vercel.app/health

# Register user
curl -X POST https://your-deployment-url.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "phone": "+254712345678"
  }'

# Login
curl -X POST https://your-deployment-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Vercel)
- Check connection string format
- Ensure database user has proper permissions

### Email Not Sending
- Use Gmail App Password, not regular password
- Enable "Less secure app access" if needed
- Check SMTP credentials

### CORS Errors
- Verify FRONTEND_URL matches your frontend domain
- Check allowed origins in app.js
- Ensure credentials are enabled

### JWT Errors
- Verify JWT_SECRET is set
- Check token expiration settings
- Ensure tokens are sent in Authorization header

## Support

For issues or questions:
- Email: info@ntcogk.org
- Phone: +254 759 120 222

## License

Private - New Testament Church of God Kenya
