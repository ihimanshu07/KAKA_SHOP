"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome } from "lucide-react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      async function checkExistingUser() {
        try {
          const response = await fetch("/api/exsistinguser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Ensure cookies are sent
          });
          
          if (!response.ok) {
            console.error("API error:", response.status, response.statusText);
            // If unauthorized or error, redirect to form for onboarding
            window.location.href = "/form";
            return;
          }
          
          const data = await response.json();
          console.log("Response data:", data);
          
          // If user exists and has completed onboarding, go to dashboard
          // Otherwise (user doesn't exist or onboarding incomplete), go to form
          if (data && data.onboading === true) {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/form";
          }
        } catch (error) {
          console.error("Error checking existing user:", error);
          // On error, redirect to form
          window.location.href = "/form";
        }
      }
      // Small delay to ensure session is fully established
      const timer = setTimeout(() => {
        checkExistingUser();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [session]);

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Good to see you again !
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={() => signIn("google")}
            className="w-full h-11 text-base"
            size="lg"
            variant="default"
          >
            <Chrome className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <p className="text-xs text-center text-muted-foreground px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

