"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Loader2, Package, Sparkles } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email && !hasRedirected.current) {
      hasRedirected.current = true;
      setIsChecking(true);
      async function checkExistingUser() {
        try {
          const response = await fetch("/api/exsistinguser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          
          if (!response.ok) {
            console.error("API error:", response.status, response.statusText);
            router.replace("/form");
            return;
          }
          
          const data = await response.json();
          console.log("Response data:", data);
          
          if (data && data.onboading === true) {
            router.replace("/dashboard");
          } else {
            router.replace("/form");
          }
        } catch (error) {
          console.error("Error checking existing user:", error);
          router.replace("/form");
        } finally {
          setIsChecking(false);
        }
      }
      checkExistingUser();
    }
  }, [session, status, router]);

  if (status === "loading" || isChecking || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE5E5] p-4">
        <Card className="w-full max-w-md border-[3px] border-black bg-white neobrutalism-shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-20 h-20 border-[3px] border-black bg-[#FF6B6B] flex items-center justify-center neobrutalism-shadow">
              <Loader2 className="h-10 w-10 text-white animate-spin" />
            </div>
            <p className="text-base font-bold text-black">LOADING...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE5E5] p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-black bg-[#FF6B6B] mx-auto neobrutalism-shadow">
            <Package className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-black mb-2">
              WELCOME BACK
            </h1>
            <p className="text-lg font-bold text-black">
              SIGN IN TO CONTINUE TO SHOP MANAGER
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-[3px] border-black bg-white neobrutalism-shadow-lg">
          <CardHeader className="space-y-1 text-center pb-4">
            <CardTitle className="text-3xl font-black text-black">
              GET STARTED
            </CardTitle>
            <CardDescription className="text-base font-bold text-black">
              USE YOUR GOOGLE ACCOUNT TO SIGN IN SECURELY
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={() => signIn("google")}
              className="w-full h-14 text-base bg-[#4ECDC4] text-black border-[3px] border-black neobrutalism-shadow neobrutalism-hover neobrutalism-active font-black"
              size="lg"
            >
              <Chrome className="mr-3 h-6 w-6" />
              CONTINUE WITH GOOGLE
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-[3px] border-black"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-black font-black">
                  SECURE AUTHENTICATION
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 border-[3px] border-black bg-[#FFE66D] neobrutalism-shadow-sm">
              <Sparkles className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
              <div className="text-sm text-black">
                <p className="font-black mb-1">ENTERPRISE SECURITY</p>
                <p className="font-bold">
                  YOUR DATA IS PROTECTED WITH GOOGLE OAUTH AND JWT ENCRYPTION
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm font-bold text-black">
          BY CONTINUING, YOU AGREE TO OUR{" "}
          <a href="#" className="text-[#FF6B6B] hover:underline font-black">
            TERMS OF SERVICE
          </a>{" "}
          AND{" "}
          <a href="#" className="text-[#FF6B6B] hover:underline font-black">
            PRIVACY POLICY
          </a>
        </p>
      </div>
    </div>
  );
}
