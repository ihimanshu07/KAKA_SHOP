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
import { Chrome, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Only check if session is authenticated (not loading) and haven't redirected yet
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
          
          // If user exists and has completed onboarding, go to dashboard
          // Otherwise (user doesn't exist or onboarding incomplete), go to form
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

  // Show loading state while checking session or redirecting
  if (status === "loading" || isChecking || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
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

