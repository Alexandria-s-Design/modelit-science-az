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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Award,
  ChevronDown,
  Download,
  Filter,
} from "lucide-react";

const classrooms = [
  { id: "all", name: "All Classrooms" },
  { id: "1", name: "Period 1 - Life Science" },
  { id: "2", name: "Period 3 - Earth Science" },
  { id: "3", name: "Period 5 - Biology Honors" },
];

// Demo student data
const students = [
  {
    id: "1",
    name: "Emma Wilson",
    classroom: "Period 1",
    completed: 8,
    total: 10,
    avgScore: 92,
    lastActive: "2 hours ago",
    trend: "up",
    level: "high",
  },
  {
    id: "2",
    name: "James Chen",
    classroom: "Period 1",
    completed: 7,
    total: 10,
    avgScore: 85,
    lastActive: "1 day ago",
    trend: "up",
    level: "mid",
  },
  {
    id: "3",
    name: "Sophia Martinez",
    classroom: "Period 1",
    completed: 10,
    total: 10,
    avgScore: 88,
    lastActive: "3 hours ago",
    trend: "up",
    level: "mid",
  },
  {
    id: "4",
    name: "Liam Johnson",
    classroom: "Period 1",
    completed: 4,
    total: 10,
    avgScore: 71,
    lastActive: "3 days ago",
    trend: "down",
    level: "low",
  },
  {
    id: "5",
    name: "Olivia Brown",
    classroom: "Period 3",
    completed: 6,
    total: 10,
    avgScore: 79,
    lastActive: "5 hours ago",
    trend: "up",
    level: "mid",
  },
  {
    id: "6",
    name: "Noah Davis",
    classroom: "Period 3",
    completed: 9,
    total: 10,
    avgScore: 94,
    lastActive: "1 hour ago",
    trend: "up",
    level: "high",
  },
];

const getCompletionColor = (pct: number) => {
  if (pct >= 80) return "bg-emerald-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-rose-500";
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-emerald-600";
  if (score >= 70) return "text-amber-600";
  return "text-rose-600";
};

const levelColors = {
  low: "bg-sky-100 text-sky-700",
  mid: "bg-violet-100 text-violet-700",
  high: "bg-fuchsia-100 text-fuchsia-700",
};

export default function ProgressPage() {
  const [selectedClassroom, setSelectedClassroom] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredStudents = students
    .filter(
      (s) =>
        selectedClassroom === "all" ||
        s.classroom ===
          classrooms.find((c) => c.id === selectedClassroom)?.name.split(" - ")[0]
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "score") return b.avgScore - a.avgScore;
      if (sortBy === "completion") return b.completed / b.total - a.completed / a.total;
      return 0;
    });

  // Calculate stats
  const totalStudents = filteredStudents.length;
  const avgCompletion = Math.round(
    filteredStudents.reduce((sum, s) => sum + (s.completed / s.total) * 100, 0) /
      totalStudents
  );
  const avgScore = Math.round(
    filteredStudents.reduce((sum, s) => sum + s.avgScore, 0) / totalStudents
  );
  const needsAttention = filteredStudents.filter(
    (s) => s.completed / s.total < 0.5 || s.avgScore < 70
  ).length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Student Progress
          </h1>
          <p className="text-slate-600 mt-1">
            Track performance across your classrooms
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Students
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {totalStudents}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Avg. Completion
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {avgCompletion}%
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Score</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {avgScore}%
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Needs Attention
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {needsAttention}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50">
                <TrendingDown className="w-5 h-5 text-rose-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select classroom" />
          </SelectTrigger>
          <SelectContent>
            {classrooms.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="score">Score (High to Low)</SelectItem>
            <SelectItem value="completion">Completion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Student list */}
      <Card className="border-slate-200/60 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                    Student
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                    Level
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                    Completion
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                    Avg Score
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                    Trend
                  </th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-4">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const completionPct = Math.round(
                    (student.completed / student.total) * 100
                  );
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {student.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {student.classroom}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="secondary"
                          className={
                            levelColors[student.level as keyof typeof levelColors]
                          }
                        >
                          {student.level.charAt(0).toUpperCase() +
                            student.level.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getCompletionColor(
                                completionPct
                              )} transition-all`}
                              style={{ width: `${completionPct}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 whitespace-nowrap">
                            {student.completed}/{student.total}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-semibold ${getScoreColor(
                            student.avgScore
                          )}`}
                        >
                          {student.avgScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {student.trend === "up" ? (
                          <div className="flex items-center gap-1 text-emerald-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm">Up</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-rose-600">
                            <TrendingDown className="w-4 h-4" />
                            <span className="text-sm">Down</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{student.lastActive}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Needs attention callout */}
      {needsAttention > 0 && (
        <Card className="mt-6 border-rose-200 bg-rose-50/50">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-rose-100">
                <TrendingDown className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-rose-900">
                  {needsAttention} student{needsAttention !== 1 ? "s" : ""} need
                  attention
                </p>
                <p className="text-sm text-rose-700 mt-0.5">
                  Students with less than 50% completion or below 70% average
                  score
                </p>
              </div>
              <Button variant="outline" className="border-rose-300 text-rose-700">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
