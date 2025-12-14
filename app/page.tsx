import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordian } from "./ui/accordian";
import { HoverCardComponent } from "./ui/hover-card";
import { Github, ExternalLink, Package, Shield, ShoppingCart, Search, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight text-balance bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Shop Manager
          </h1>
          
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-muted-foreground">
            Modern Inventory Management System
          </h2>

          <p className="leading-7 text-lg max-w-2xl mx-auto [&:not(:first-child)]:mt-6">
            A comprehensive sweets inventory management application built with Next.js, featuring 
            Google OAuth authentication, JWT-based authorization, and role-based access control. 
            Streamline your shop operations with an intuitive dashboard for managing products, 
            tracking inventory, and processing purchases.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg" className="flex items-center">
              <Link href="/login" className="flex items-center">
                Get Started
                <ExternalLink className="ml-2 h-3 w-3 align-middle" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex items-center">
              <a
                href="https://github.com/ihimanshu07/KAKA_SHOP.git"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-3 w-3 align-middle" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
            Technology Stack
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Frontend
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Next.js 16 (App Router)</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• shadcn/ui Components</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border bg-card">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backend & Database
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                <li>• Next.js API Routes</li>
                <li>• Prisma ORM</li>
                <li>• PostgreSQL</li>
                <li>• NextAuth.js</li>
                <li>• JWT Authentication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Table */}
        <div className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
            Key Features
          </h3>
          
          <div className="my-6 w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Feature
                  </th>
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Description
                  </th>
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Access Level
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td className="border px-4 py-2 text-left font-medium">Product Management</td>
                  <td className="border px-4 py-2 text-left">Create, read, update sweets inventory</td>
                  <td className="border px-4 py-2 text-left">Admin</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td className="border px-4 py-2 text-left font-medium">Search & Filter</td>
                  <td className="border px-4 py-2 text-left">Search by name, category, or price</td>
                  <td className="border px-4 py-2 text-left">All Users</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td className="border px-4 py-2 text-left font-medium">Purchase System</td>
                  <td className="border px-4 py-2 text-left">Purchase sweets with quantity control</td>
                  <td className="border px-4 py-2 text-left">All Users</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td className="border px-4 py-2 text-left font-medium">Restock Inventory</td>
                  <td className="border px-4 py-2 text-left">Increase product quantity</td>
                  <td className="border px-4 py-2 text-left">Admin Only</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td className="border px-4 py-2 text-left font-medium">Delete Products</td>
                  <td className="border px-4 py-2 text-left">Remove items from inventory</td>
                  <td className="border px-4 py-2 text-left">Admin Only</td>
                </tr>
                <tr className="even:bg-muted m-0 border-t p-0">
                  <td className="border px-4 py-2 text-left font-medium">Role-Based Access</td>
                  <td className="border px-4 py-2 text-left">USER and ADMIN roles with JWT auth</td>
                  <td className="border px-4 py-2 text-left">System</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
            Project Overview
          </h3>
          
          <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground">
            &quot;Shop Manager is a full-stack inventory management solution designed for modern 
            sweet shops. It combines secure authentication, intuitive user interfaces, and 
            powerful role-based access control to provide a seamless inventory management experience.&quot;
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg border bg-card text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Secure Auth</h4>
              <p className="text-sm text-muted-foreground mt-1">Google OAuth + JWT</p>
            </div>
            <div className="p-4 rounded-lg border bg-card text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Easy Purchases</h4>
              <p className="text-sm text-muted-foreground mt-1">Streamlined checkout</p>
            </div>
            <div className="p-4 rounded-lg border bg-card text-center">
              <Search className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h4 className="font-semibold">Smart Search</h4>
              <p className="text-sm text-muted-foreground mt-1">Find products instantly</p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Project Links & Resources
          </h4>
          
          <ul className="my-6 ml-6 list-disc space-y-2 [&>li]:mt-2">
            <li>
              <strong>GitHub Repository:</strong>{" "}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                github.com/shop-manager
              </a>
            </li>
            <li>
              <strong>Documentation:</strong> Available in the README.md file
            </li>
            <li>
              <strong>Tech Stack:</strong> Next.js, Prisma, PostgreSQL, NextAuth, JWT
            </li>
            <li>
              <strong>Deployment:</strong> Ready for Vercel deployment
            </li>
          </ul>
        </div>

        {/* Accordion Section */}
        <div className="space-y-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h4>
          <Accordian/>
        </div>

        {/* Footer with Hover Card */}
        <div className="pt-8 border-t flex justify-center items-center gap-4">
          <p className="text-sm text-muted-foreground">Developed by</p>
          <HoverCardComponent/>
        </div>
      </div>
    </div>
  );
}


