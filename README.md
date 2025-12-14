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

Throughout the development of this project, I utilized **Cursor** and **ChatGPT** as my primary AI coding assistants.

### How I Used AI

1. **Project Structure and Brainstorming**: Prior to coding, I used ChatGPT to brainstorm and prepare the overall structure of the project. This included planning the architecture, deciding on the tech stack, and outlining the feature set before diving into implementation.

2. **shadcn/ui and Tailwind CSS Implementation**: I used Cursor to help implement shadcn/ui components and Tailwind CSS styling throughout the application. The AI assistant provided guidance on:
   - Setting up and configuring shadcn/ui components
   - Implementing responsive layouts with Tailwind CSS
   - Creating consistent UI components and styling patterns
   - Troubleshooting styling issues and component integration

3. **JWT Flow Implementation**: I leveraged Cursor to implement the JWT (JSON Web Token) authentication and authorization flow. This included:
   - Setting up JWT token generation and verification utilities
   - Implementing JWT middleware for protecting API routes
   - Configuring token-based authentication flow
   - Handling token refresh and validation logic

### Reflection on AI Impact

Using Cursor and ChatGPT significantly enhanced my development workflow in several ways:

- **Planning and Architecture**: ChatGPT was invaluable during the initial brainstorming phase, helping me think through the project structure and make informed decisions about technology choices before writing any code. This upfront planning saved time and reduced refactoring later.

- **UI/UX Development**: Cursor's assistance with shadcn/ui and Tailwind CSS implementation accelerated the UI development process. The AI helped me quickly understand component APIs, implement responsive designs, and maintain consistent styling patterns across the application.

- **Complex Implementation**: For the JWT flow, Cursor provided step-by-step guidance on implementing secure authentication patterns, which helped me avoid common security pitfalls and implement best practices from the start.

- **Learning and Problem-Solving**: Both tools served as excellent learning resources, providing explanations and examples that helped me understand new concepts and solve problems more efficiently.

However, I found that AI assistance worked best when combined with my own understanding and critical thinking:
- **Code Review**: I always reviewed and tested AI-generated code to ensure it met my specific requirements and security standards.
- **Customization**: While AI provided excellent starting points, I often needed to customize the code to fit the project's specific business logic and requirements.
- **Best Practices**: I used AI suggestions as a foundation but applied my own knowledge of security, performance, and maintainability to refine the implementation.

Overall, AI tools served as powerful assistants that accelerated development while allowing me to maintain control over code quality and project direction. The combination of AI assistance for repetitive tasks and complex implementations, along with manual refinement for business logic and security, resulted in a more efficient and effective development process.


# Gaurav Singh 
### Portfolio : https://gauravsingh.info