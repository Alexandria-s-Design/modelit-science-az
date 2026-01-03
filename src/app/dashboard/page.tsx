"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  Target,
  Award,
} from "lucide-react";
import Link from "next/link";

// Demo data - will be replaced with real data from Supabase
const stats = [
  {
    name: "Total Students",
    value: "24",
    change: "+3 this week",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Active Assignments",
    value: "8",
    change: "2 due today",
    icon: BookOpen,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    name: "Avg. Completion",
    value: "78%",
    change: "+5% from last week",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    name: "Time on Platform",
    value: "4.2h",
    change: "Per student avg.",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const recentActivity = [
  {
    student: "Emma Wilson",
    action: "Completed",
    content: "Ecosystems: Food Web Reader",
    time: "2 min ago",
    score: 92,
  },
  {
    student: "James Chen",
    action: "Started",
    content: "Human Body Systems Activity",
    time: "15 min ago",
  },
  {
    student: "Sophia Martinez",
    action: "Completed",
    content: "Climate Systems Assessment",
    time: "1 hour ago",
    score: 88,
  },
  {
    student: "Liam Johnson",
    action: "Joined",
    content: "Your classroom",
    time: "2 hours ago",
  },
];

const quickActions = [
  {
    title: "Create Classroom",
    description: "Set up a new class with students",
    href: "/dashboard/classrooms",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Assign Content",
    description: "Send readers & activities to students",
    href: "/dashboard/assign",
    icon: BookOpen,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "View Progress",
    description: "Track student performance",
    href: "/dashboard/progress",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, Teacher!
        </h1>
        <p className="text-slate-600 mt-1">
          Here&apos;s what&apos;s happening in your classrooms today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-slate-200/60 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="h-full border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg shadow-slate-200`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent activity */}
        <Card className="lg:col-span-3 border-slate-200/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>
              Latest student interactions in your classrooms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {activity.student
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {activity.student}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      <span
                        className={
                          activity.action === "Completed"
                            ? "text-emerald-600"
                            : activity.action === "Started"
                            ? "text-blue-600"
                            : "text-amber-600"
                        }
                      >
                        {activity.action}
                      </span>{" "}
                      {activity.content}
                    </p>
                  </div>
                  <div className="text-right">
                    {activity.score && (
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                        <Award className="w-3.5 h-3.5" />
                        {activity.score}%
                      </span>
                    )}
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/progress">
              <Button
                variant="ghost"
                className="w-full mt-4 text-slate-600 hover:text-teal-600"
              >
                View all activity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tips & getting started */}
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Tips to make the most of ModelIt Readers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100">
                <Target className="w-5 h-5 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Set reading levels
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Assign Low, Mid, or High levels to each student for
                    personalized content.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                <BookOpen className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Explore all topics
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Browse Ecosystems, Human Body, Economics, and Climate
                    content.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                <TrendingUp className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Track progress weekly
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Monitor completion rates and identify students who need
                    support.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
              <p className="font-semibold">Need help?</p>
              <p className="text-sm text-teal-100 mt-1">
                Check out our teacher guides or contact support.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3 bg-white/20 hover:bg-white/30 text-white border-0"
              >
                View guides
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
