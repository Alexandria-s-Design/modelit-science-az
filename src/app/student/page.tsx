"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Award,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  Leaf,
  Heart,
  TrendingUp,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Demo data - will be replaced with real data from Supabase
const assignments = [
  {
    id: "1",
    title: "Food Webs: Connections in Nature",
    topic: "Ecosystems",
    type: "reader",
    status: "in_progress",
    progress: 60,
    dueDate: "2026-01-10",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "2",
    title: "Energy Flow Activity",
    topic: "Ecosystems",
    type: "activity",
    status: "not_started",
    progress: 0,
    dueDate: "2026-01-12",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "The Heart: A Pumping System",
    topic: "Body Systems",
    type: "reader",
    status: "completed",
    progress: 100,
    score: 92,
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "4",
    title: "Supply & Demand Basics",
    topic: "Economics",
    type: "reader",
    status: "not_started",
    progress: 0,
    dueDate: "2026-01-15",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-600",
  },
];

const stats = {
  completed: 5,
  inProgress: 2,
  avgScore: 88,
  streak: 3,
};

const getStatusBadge = (status: string, score?: number) => {
  switch (status) {
    case "completed":
      return (
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
          <CheckCircle className="w-3 h-3 mr-1" />
          {score ? `${score}%` : "Done"}
        </Badge>
      );
    case "in_progress":
      return (
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          <PlayCircle className="w-3 h-3 mr-1" />
          In Progress
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="bg-slate-100 text-slate-600">
          Not Started
        </Badge>
      );
  }
};

export default function StudentDashboard() {
  const pendingAssignments = assignments.filter(
    (a) => a.status !== "completed"
  );
  const completedAssignments = assignments.filter(
    (a) => a.status === "completed"
  );

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back! 👋
        </h1>
        <p className="text-slate-600 mt-2">
          You&apos;re doing great. Keep up the good work!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200/60 shadow-sm text-center">
          <CardContent className="pt-6 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {stats.completed}
            </p>
            <p className="text-sm text-slate-500">Completed</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm text-center">
          <CardContent className="pt-6 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <PlayCircle className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {stats.inProgress}
            </p>
            <p className="text-sm text-slate-500">In Progress</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm text-center">
          <CardContent className="pt-6 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">
              {stats.avgScore}%
            </p>
            <p className="text-sm text-slate-500">Avg Score</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm text-center">
          <CardContent className="pt-6 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stats.streak}</p>
            <p className="text-sm text-slate-500">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Continue where you left off */}
      {assignments.find((a) => a.status === "in_progress") && (
        <Card className="border-teal-200 bg-gradient-to-r from-teal-50/50 to-emerald-50/50 shadow-sm">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-teal-600 mb-1">
                  Continue Reading
                </p>
                <h3 className="font-semibold text-slate-900 text-lg">
                  {assignments.find((a) => a.status === "in_progress")?.title}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1 max-w-xs">
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 transition-all"
                        style={{
                          width: `${
                            assignments.find((a) => a.status === "in_progress")
                              ?.progress || 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-slate-600">
                    {
                      assignments.find((a) => a.status === "in_progress")
                        ?.progress
                    }
                    % complete
                  </span>
                </div>
              </div>
              <Link
                href={`/student/read/${
                  assignments.find((a) => a.status === "in_progress")?.id
                }`}
              >
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-600">
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending assignments */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Your Assignments
        </h2>
        <div className="space-y-3">
          {pendingAssignments.map((assignment) => (
            <Link
              key={assignment.id}
              href={
                assignment.type === "reader"
                  ? `/student/read/${assignment.id}`
                  : `/student/activity/${assignment.id}`
              }
            >
              <Card className="border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${assignment.color} shadow-sm shrink-0`}
                    >
                      <assignment.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 group-hover:text-teal-600 transition-colors truncate">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span>{assignment.topic}</span>
                        <span>•</span>
                        <span className="capitalize">{assignment.type}</span>
                        {assignment.dueDate && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Due{" "}
                              {new Date(assignment.dueDate).toLocaleDateString(
                                "en-US",
                                { month: "short", day: "numeric" }
                              )}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {getStatusBadge(assignment.status)}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Completed */}
      {completedAssignments.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Completed
          </h2>
          <div className="space-y-3">
            {completedAssignments.map((assignment) => (
              <Card
                key={assignment.id}
                className="border-slate-200/60 bg-slate-50/50"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${assignment.color} opacity-60 shadow-sm shrink-0`}
                    >
                      <assignment.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-700 truncate">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {assignment.topic} • {assignment.type}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {getStatusBadge(assignment.status, assignment.score)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
