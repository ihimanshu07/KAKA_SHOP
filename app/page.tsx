import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Accordian } from "./ui/accordian";
import { HoverCardComponent } from "./ui/hover-card";
import { Github, ArrowRight, Sparkles, Zap, Shield, ShoppingCart, Search, Database, Package, TrendingUp, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFE5E5]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b-[3px] border-black bg-[#FFE66D]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-[3px] border-black bg-[#FF6B6B] flex items-center justify-center neobrutalism-shadow">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="font-black text-xl text-black">SHOP MANAGER</span>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm" className="border-0">
              <a href="https://github.com/ihimanshu07/KAKA_SHOP" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="sm">
              <Link href="/login" className="flex items-center">
                GET STARTED
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 border-[3px] border-black bg-[#4ECDC4] neobrutalism-shadow mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="font-black text-sm text-black">MODERN INVENTORY MANAGEMENT</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight text-black leading-tight">
              MANAGE YOUR SHOP
              <br />
              <span className="text-[#FF6B6B]">
                EFFORTLESSLY
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-black max-w-3xl mx-auto leading-tight">
              A BOLD, INTUITIVE INVENTORY MANAGEMENT SYSTEM BUILT FOR MODERN SWEET SHOPS. 
              STREAMLINE OPERATIONS WITH POWERFUL FEATURES AND EYE-CATCHING DESIGN.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="bg-[#FF6B6B] text-white">
                <Link href="/login" className="flex items-center">
                  START FREE TRIAL
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-black">
                <a href="https://github.com/ihimanshu07/KAKA_SHOP" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-5 w-5" />
                  VIEW ON GITHUB
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-4">
              EVERYTHING YOU NEED
            </h2>
            <p className="text-2xl font-bold text-black">
              POWERFUL FEATURES DESIGNED FOR MODERN BUSINESSES
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "SECURE AUTHENTICATION", desc: "Google OAuth with JWT-based authorization for enterprise-grade security", color: "bg-[#FF6B6B]" },
              { icon: ShoppingCart, title: "EASY PURCHASES", desc: "Streamlined checkout process with real-time inventory updates", color: "bg-[#4ECDC4]" },
              { icon: Search, title: "SMART SEARCH", desc: "Find products instantly with advanced filtering and search capabilities", color: "bg-[#45B7D1]" },
              { icon: Database, title: "REAL-TIME SYNC", desc: "PostgreSQL database with Prisma ORM for reliable data management", color: "bg-[#FFA07A]" },
              { icon: Zap, title: "LIGHTNING FAST", desc: "Built with Next.js 16 and React 19 for optimal performance", color: "bg-[#FFE66D]" },
              { icon: Lock, title: "ROLE-BASED ACCESS", desc: "Granular permissions with USER and ADMIN role management", color: "bg-[#98D8C8]" },
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="p-8 border-[3px] border-black bg-white neobrutalism-shadow neobrutalism-hover transition-all duration-150"
              >
                <div className={`w-14 h-14 border-[3px] border-black ${feature.color} flex items-center justify-center mb-4 neobrutalism-shadow-sm`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-black text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-base font-semibold text-black leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="max-w-7xl mx-auto px-6 py-16 mb-16">
          <div className="border-[3px] border-black bg-[#FFE66D] p-12 neobrutalism-shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black text-black mb-4">
                BUILT WITH MODERN TECH
              </h2>
              <p className="text-2xl font-bold text-black">
                CUTTING-EDGE TECHNOLOGIES FOR THE BEST EXPERIENCE
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="p-8 border-[3px] border-black bg-white neobrutalism-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 border-[3px] border-black bg-[#45B7D1] flex items-center justify-center neobrutalism-shadow-sm">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-black">FRONTEND</h3>
                </div>
                <ul className="space-y-3 text-black font-bold">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#FF6B6B]"></div>
                    Next.js 16 (App Router)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#FF6B6B]"></div>
                    React 19 & TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#FF6B6B]"></div>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#FF6B6B]"></div>
                    shadcn/ui Components
                  </li>
                </ul>
              </div>
              
              <div className="p-8 border-[3px] border-black bg-white neobrutalism-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 border-[3px] border-black bg-[#FF6B6B] flex items-center justify-center neobrutalism-shadow-sm">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-black">BACKEND</h3>
                </div>
                <ul className="space-y-3 text-black font-bold">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#4ECDC4]"></div>
                    Next.js API Routes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#4ECDC4]"></div>
                    Prisma ORM
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#4ECDC4]"></div>
                    PostgreSQL Database
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 border-[2px] border-black bg-[#4ECDC4]"></div>
                    NextAuth.js & JWT
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-2xl font-bold text-black">
              EVERYTHING YOU NEED TO KNOW
            </p>
          </div>
          <div className="border-[3px] border-black bg-white p-8 neobrutalism-shadow-lg">
            <Accordian/>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="border-[3px] border-black bg-[#FF6B6B] p-12 md:p-16 text-center text-white neobrutalism-shadow-lg">
            <TrendingUp className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              READY TO GET STARTED?
            </h2>
            <p className="text-2xl mb-8 max-w-2xl mx-auto font-bold">
              JOIN MODERN SHOPS USING SHOP MANAGER TO STREAMLINE THEIR INVENTORY MANAGEMENT
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-[#FFE66D] text-black">
              <Link href="/login" className="flex items-center">
                START FREE TRIAL
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-[3px] border-black bg-[#4ECDC4] py-12 mt-16">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-[3px] border-black bg-[#FF6B6B] flex items-center justify-center neobrutalism-shadow-sm">
                <Package className="h-6 w-6 text-white" />
              </div>
              <span className="font-black text-lg text-black">SHOP MANAGER</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold text-black">
              <span>DEVELOPED BY</span>
              <HoverCardComponent/>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
