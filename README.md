# Shop Manager

A comprehensive sweets inventory management application built with Next.js, featuring Google OAuth authentication, JWT-based authorization, and role-based access control. Streamline your shop operations with an intuitive dashboard for managing products, tracking inventory, and processing purchases.

## 🚀 Live Demo

The application is deployed on Vercel: [kaka-shop.vercel.app](https://kaka-shop.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js with Google OAuth
- **Authorization**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL with Prisma ORM
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database (local or cloud-hosted)
- Google OAuth credentials (Client ID and Client Secret)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/shop_manager?schema=public

# JWT Configuration
NEXT_JWT_SECRET=your_jwt_secret_here
```

### Environment Variables Explained

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (public, used in the browser)
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret (server-side only)
- `NEXTAUTH_SECRET`: A random secret string used to encrypt NextAuth.js cookies (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: The base URL of your application (use your production URL in production)
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_JWT_SECRET`: Secret key for signing and verifying JWT tokens

## 🏃 Local Development

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd shop-manager-master
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and populate it with the environment variables listed above.

### 4. Set Up Database

Make sure your PostgreSQL database is running, then run Prisma migrations:

```bash
npx prisma migrate dev
```

This will:
- Create the database schema
- Generate Prisma Client

### 5. Generate Prisma Client

If you need to regenerate Prisma Client:

```bash
npx prisma generate
```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 7. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
shop-manager-master/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/               # API endpoints
│   │   ├── auth/         # Authentication routes
│   │   ├── sweets/       # Sweet inventory management
│   │   └── user/         # User management
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   └── form/             # User onboarding form
├── components/           # Reusable React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions and configurations
│   ├── auth.ts          # NextAuth configuration
│   ├── jwt.ts           # JWT utilities
│   └── prisma.ts        # Prisma client
├── prisma/              # Prisma schema and migrations
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## 🔐 Features

- **Google OAuth Authentication**: Secure login with Google accounts
- **Role-Based Access Control**: USER and ADMIN roles with different permissions
- **Inventory Management**: Add, update, and track sweets inventory
- **Purchase Processing**: Handle customer purchases
- **Search Functionality**: Search for sweets by name
- **Restock Management**: Admins can restock inventory
- **User Dashboard**: Personalized dashboard for each user
- **JWT Authorization**: Secure API endpoints with JWT tokens

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication for Next.js
- [Prisma Documentation](https://www.prisma.io/docs) - Next-generation ORM for Node.js
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Re-usable components built with Radix UI and Tailwind CSS

## 🚢 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add all environment variables in Vercel's dashboard
4. Deploy!

The application is currently deployed at: [kaka-shop.vercel.app](https://kaka-shop.vercel.app)

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 🤖 My AI Usage

### AI Tools Used

Throughout the development of this project, I utilized **Cursor AI** (powered by Claude) as my primary AI coding assistant.

### How I Used AI

1. **Initial Project Setup**: I used Cursor AI to generate the initial boilerplate code for the Next.js application structure, including the App Router setup and basic configuration files.

2. **API Endpoint Development**: I leveraged AI assistance to generate the initial structure for API routes, including:
   - Authentication endpoints (`/api/auth/[...nextauth]`)
   - Sweet inventory management endpoints (`/api/sweets`)
   - User management endpoints (`/api/user`)
   - Purchase and restock endpoints

3. **Component Generation**: AI helped generate boilerplate code for React components, particularly the UI components from shadcn/ui and custom components like forms, cards, and accordions.

4. **Database Schema Design**: I used AI to help brainstorm and refine the Prisma schema structure for User and Sweet models, ensuring proper relationships and field types.

5. **Authentication Implementation**: AI assisted in setting up NextAuth.js configuration with Google OAuth provider, including the proper callback handling and session management.

6. **JWT Implementation**: I used AI to generate the initial JWT utility functions for token creation and verification, which were then manually refined with proper error handling and validation.

7. **Code Refactoring**: Throughout development, I used AI to suggest improvements, refactor code for better maintainability, and fix common bugs.

8. **Documentation**: AI helped generate initial documentation structure and code comments, which I then customized to match the project's specific needs.

### Reflection on AI Impact

Using Cursor AI significantly accelerated my development workflow. The AI assistant was particularly valuable for:

- **Rapid Prototyping**: Generating boilerplate code allowed me to focus on implementing business logic rather than setting up infrastructure.
- **Learning New Technologies**: When working with Next.js 16 App Router, NextAuth.js, and Prisma, AI provided contextual examples and explanations that helped me understand best practices.
- **Error Resolution**: AI quickly identified common issues and suggested fixes, reducing debugging time.
- **Code Consistency**: The AI helped maintain consistent coding patterns and styles across the project.

However, I found that AI-generated code often required manual refinement:
- **Security Considerations**: I had to manually add validation logic, input sanitization, and proper error handling.
- **Business Logic**: The core business logic, such as role-based access control and inventory management rules, required careful manual implementation.
- **Testing**: AI-generated code needed thorough testing and edge case handling.

Overall, AI served as an excellent pair programming partner, handling repetitive tasks and providing suggestions, while I focused on the critical aspects of security, business logic, and user experience. The combination of AI assistance and manual refinement resulted in a more efficient development process without compromising code quality.
