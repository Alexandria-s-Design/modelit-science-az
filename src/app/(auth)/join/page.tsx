"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, AlertCircle, User, Info } from "lucide-react";

export default function JoinClassroomPage() {
  const [step, setStep] = useState<"code" | "name">("code");
  const [joinCode, setJoinCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const code = joinCode.toUpperCase().trim();
    if (code.length !== 6) {
      setError("Join code must be 6 characters");
      setLoading(false);
      return;
    }

    // TODO: Replace with Supabase lookup when connected
    // For demo, accept any 6-char code
    await new Promise((resolve) => setTimeout(resolve, 500));

    setClassroomName("Demo Classroom");
    setTeacherName("Demo Teacher");
    setStep("name");
    setLoading(false);
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!displayName.trim()) {
      setError("Please enter your name");
      setLoading(false);
      return;
    }

    // TODO: Replace with Supabase auth when connected
    await new Promise((resolve) => setTimeout(resolve, 500));
    setError("Supabase not configured. Please set up .env.local with your Supabase credentials.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mx-auto">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ModelIt Readers</span>
          </Link>
          <div>
            <CardTitle className="text-2xl font-bold">
              {step === "code" ? "Join a Classroom" : `Join ${classroomName}`}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {step === "code"
                ? "Enter the code your teacher gave you"
                : `${teacherName}'s class`}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Demo notice */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              Demo mode: Enter any 6-character code to proceed.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {step === "code" ? (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Classroom Code</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="ABC123"
                    className="pl-10 h-14 text-center text-2xl font-mono uppercase tracking-widest"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase().slice(0, 6))}
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                disabled={loading || joinCode.length !== 6}
              >
                {loading ? "Looking up..." : "Find Classroom"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">What&apos;s your name?</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="First name and last initial"
                    className="pl-10 h-12"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Example: &quot;Alex M.&quot; or &quot;Jordan&quot;
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => {
                    setStep("code");
                    setError(null);
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                  disabled={loading || !displayName.trim()}
                >
                  {loading ? "Joining..." : "Join Class"}
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-600">
            Are you a teacher?{" "}
            <Link href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
              Sign in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
