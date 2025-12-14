"use client";
import { useSession, signOut } from "next-auth/react";
import { FORM } from "../ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <button
        onClick={() => signOut()}
        className="fixed top-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors z-10"
      >
        Sign Out
      </button>
      <div className="max-w-md mx-auto mt-8 p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="p-2 border rounded-md bg-gray-50">
            {session?.user?.name || "N/A"}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="p-2 border rounded-md bg-gray-50">
            {session?.user?.email || "N/A"}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <FORM value={role} onValueChange={setRole} />
        </div>
        
        {message && (
          <div className={`p-2 rounded-md text-sm ${
            message.includes("success") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      </div>
    </div>
  );
}

