import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function Accordian () {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>How does authentication work?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Shop Manager uses Google OAuth for initial authentication. After signing in with 
              Google, users complete their profile by selecting a role (USER or ADMIN) during 
              the onboarding process.
            </p>
            <p>
              The application then generates a JWT token containing the user&apos;s Google session 
              ID and role, which is stored as an HTTP-only cookie. This token is automatically 
              sent with every API request for secure authentication and authorization.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What are the different user roles?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              The application supports two role types: <strong>USER</strong> and <strong>ADMIN</strong>.
            </p>
            <p>
              <strong>USER:</strong> Can browse inventory, search for products, and make purchases. 
              Cannot modify or delete products.
            </p>
            <p>
              <strong>ADMIN:</strong> Has full access including creating, editing, deleting products, 
              and restocking inventory. Admin-only actions are protected by JWT-based authorization.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What technologies power this application?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Shop Manager is built with modern web technologies including Next.js 16 with App Router 
              for the frontend and API routes, React 19 for the UI, and TypeScript for type safety.
            </p>
            <p>
              The backend uses Prisma ORM with PostgreSQL for data persistence, NextAuth.js for 
              OAuth integration, and JWT (JSON Web Tokens) for secure session management. The UI 
              is styled with Tailwind CSS and shadcn/ui components for a polished, professional look.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How do I get started?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              To get started, click the &quot;Get Started&quot; button and sign in with your Google account. 
              You&apos;ll be prompted to complete your profile by selecting your role.
            </p>
            <p>
              Once authenticated, you&apos;ll have access to the dashboard where you can browse the 
              inventory, search for products, and make purchases. If you&apos;re an admin, you&apos;ll 
              also see options to manage the inventory.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  