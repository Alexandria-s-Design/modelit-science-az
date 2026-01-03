"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  User,
  Mail,
  Building,
  Calendar,
  ExternalLink,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Demo data - will be replaced with real data from Supabase/Stripe
const demoProfile = {
  displayName: "Sarah Thompson",
  email: "sarah.thompson@school.edu",
  school: "Lincoln Middle School",
  role: "teacher",
  createdAt: "2025-12-15",
};

const demoSubscription = {
  tier: "teacher",
  status: "active",
  seatsLimit: 36,
  seatsUsed: 24,
  currentPeriodEnd: "2026-12-15",
  pricePerYear: 99,
};

export default function AccountPage() {
  const [profile, setProfile] = useState(demoProfile);
  const [saving, setSaving] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);

  const handleSaveProfile = async () => {
    setSaving(true);
    // TODO: Actually save to Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch("/api/portal", { method: "POST" });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to open billing portal:", error);
    }
    setPortalLoading(false);
  };

  const seatsRemaining = demoSubscription.seatsLimit - demoSubscription.seatsUsed;
  const seatsPercentage = Math.round(
    (demoSubscription.seatsUsed / demoSubscription.seatsLimit) * 100
  );

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-slate-600 mt-1">
          Manage your profile and subscription
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile card */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" />
              Profile
            </CardTitle>
            <CardDescription>
              Your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={profile.displayName}
                    onChange={(e) =>
                      setProfile({ ...profile, displayName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input
                    id="school"
                    value={profile.school}
                    onChange={(e) =>
                      setProfile({ ...profile, school: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{profile.email}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Contact support to change your email address
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription card */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-teal-600" />
                  Subscription
                </CardTitle>
                <CardDescription>
                  Manage your plan and billing
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className={
                  demoSubscription.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }
              >
                {demoSubscription.status === "active" ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Active
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {demoSubscription.status}
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Plan details */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 capitalize">
                      {demoSubscription.tier} Plan
                    </h3>
                    <p className="text-sm text-slate-600">
                      ${demoSubscription.pricePerYear}/year
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleManageBilling}
                    disabled={portalLoading}
                  >
                    {portalLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Manage Billing
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>

                {/* Seats usage */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Student Seats</span>
                    <span className="font-medium text-slate-900">
                      {demoSubscription.seatsUsed} / {demoSubscription.seatsLimit}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        seatsPercentage >= 90
                          ? "bg-rose-500"
                          : seatsPercentage >= 70
                          ? "bg-amber-500"
                          : "bg-teal-500"
                      }`}
                      style={{ width: `${seatsPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {seatsRemaining} seats remaining
                  </p>
                </div>
              </div>

              {/* Billing info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Next billing date</p>
                    <p className="font-medium text-slate-900">
                      {new Date(
                        demoSubscription.currentPeriodEnd
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50">
                  <Building className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Account type</p>
                    <p className="font-medium text-slate-900 capitalize">
                      {demoSubscription.tier}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upgrade prompt */}
              {demoSubscription.tier === "teacher" && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">
                        Need more seats?
                      </h4>
                      <p className="text-sm text-slate-600 mt-0.5">
                        Upgrade to a School plan for unlimited teachers and
                        students.
                      </p>
                    </div>
                    <Button>Upgrade Plan</Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-rose-200">
          <CardHeader>
            <CardTitle className="text-rose-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border border-rose-200 bg-rose-50/50">
              <div>
                <h4 className="font-medium text-slate-900">Cancel Subscription</h4>
                <p className="text-sm text-slate-600 mt-0.5">
                  Your subscription will remain active until the end of the
                  billing period.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
