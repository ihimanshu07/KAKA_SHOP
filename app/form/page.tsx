"use client";
import { useSession, signOut } from "next-auth/react";
import { FORM } from "../ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LogOut, User, Mail, Shield, Loader2, CheckCircle2, AlertCircle, Package, Sparkles } from "lucide-react";

export default function FormPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [role, setRole] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      setMessage("Please select a role");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      console.log("Submitting form with role:", role);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to save user");
      }

      setMessage("User saved successfully!");
      console.log("User saved:", data);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      setMessage(errorMessage);
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE5E5] p-4">
      <Button
        onClick={() => signOut()}
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-10 border-0 text-black hover:bg-[#FF6B6B] hover:text-white font-black"
      >
        <LogOut className="mr-2 h-4 w-4" />
        SIGN OUT
      </Button>
      
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-lg space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 border-[3px] border-black bg-[#FF6B6B] mx-auto neobrutalism-shadow">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-black mb-2">
                COMPLETE YOUR PROFILE
              </h1>
              <p className="text-lg font-bold text-black">
                CHOOSE YOUR ROLE TO GET STARTED WITH SHOP MANAGER
              </p>
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-[3px] border-black bg-white neobrutalism-shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-black text-black">
                ACCOUNT INFORMATION
              </CardTitle>
              <CardDescription className="text-base font-bold text-black">
                YOUR ACCOUNT DETAILS FROM GOOGLE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-black text-black">
                      <User className="h-4 w-4" />
                      NAME
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={session?.user?.name || "N/A"}
                      disabled
                      className="bg-[#FFE66D] border-[3px] border-black cursor-not-allowed text-black font-bold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-black text-black">
                      <Mail className="h-4 w-4" />
                      EMAIL
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={session?.user?.email || "N/A"}
                      disabled
                      className="bg-[#FFE66D] border-[3px] border-black cursor-not-allowed text-black font-bold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role" className="flex items-center gap-2 text-sm font-black text-black">
                      <Shield className="h-4 w-4" />
                      ROLE
                    </Label>
                    <FORM value={role} onValueChange={setRole} />
                    <p className="text-xs font-bold text-black mt-2">
                      <strong>ADMIN:</strong> FULL ACCESS TO MANAGE INVENTORY, PRODUCTS, AND USERS
                      <br />
                      <strong>USER:</strong> BROWSE AND PURCHASE PRODUCTS
                    </p>
                  </div>
                </div>
                
                {message && (
                  <div 
                    className={`p-4 border-[3px] border-black flex items-start gap-3 ${
                      message.includes("success") 
                        ? "bg-[#4ECDC4] text-black" 
                        : "bg-[#FF6B6B] text-white"
                    }`}
                  >
                    {message.includes("success") ? (
                      <CheckCircle2 className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-black">{message.toUpperCase()}</p>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isSubmitting || !role}
                  className="w-full h-14 text-base bg-[#FF6B6B] text-white border-[3px] border-black font-black neobrutalism-shadow neobrutalism-hover neobrutalism-active"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      SETTING UP YOUR ACCOUNT...
                    </>
                  ) : (
                    <>
                      COMPLETE SETUP
                      <CheckCircle2 className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-[3px] border-black bg-[#FFE66D] neobrutalism-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-black mt-0.5 flex-shrink-0" />
                <div className="text-sm text-black">
                  <p className="font-black mb-1">WHAT HAPPENS NEXT?</p>
                  <p className="font-bold">
                    ONCE YOU COMPLETE YOUR PROFILE, YOU'LL BE REDIRECTED TO THE DASHBOARD WHERE YOU CAN START MANAGING YOUR INVENTORY.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
