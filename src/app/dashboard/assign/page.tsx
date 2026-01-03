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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Users,
  BookOpen,
  Send,
  Check,
  ChevronRight,
  Leaf,
  Heart,
  TrendingUp,
  Globe,
} from "lucide-react";

const classrooms = [
  { id: "1", name: "Period 1 - Life Science", studentCount: 28 },
  { id: "2", name: "Period 3 - Earth Science", studentCount: 24 },
  { id: "3", name: "Period 5 - Biology Honors", studentCount: 22 },
];

const contentItems = [
  {
    id: "1",
    title: "Food Webs: Connections in Nature",
    topic: "Ecosystems",
    type: "reader",
    level: "mid",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "2",
    title: "Energy Flow Activity",
    topic: "Ecosystems",
    type: "activity",
    level: "mid",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "The Heart: A Pumping System",
    topic: "Body Systems",
    type: "reader",
    level: "low",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: "4",
    title: "Supply & Demand Basics",
    topic: "Economics",
    type: "reader",
    level: "mid",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "5",
    title: "Carbon Cycle Explorer",
    topic: "Climate",
    type: "activity",
    level: "high",
    icon: Globe,
    color: "from-blue-500 to-cyan-600",
  },
];

export default function AssignPage() {
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const toggleClassroom = (id: string) => {
    setSelectedClassrooms((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleContent = (id: string) => {
    setSelectedContent((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const selectedClassroomData = classrooms.filter((c) =>
    selectedClassrooms.includes(c.id)
  );
  const selectedContentData = contentItems.filter((c) =>
    selectedContent.includes(c.id)
  );
  const totalStudents = selectedClassroomData.reduce(
    (sum, c) => sum + c.studentCount,
    0
  );

  const handleAssign = () => {
    // TODO: Actually create assignments in Supabase
    alert(
      `Assigned ${selectedContent.length} items to ${totalStudents} students!`
    );
    setStep(1);
    setSelectedClassrooms([]);
    setSelectedContent([]);
    setDueDate("");
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          Create Assignment
        </h1>
        <p className="text-slate-600 mt-1">
          Assign content to your classrooms
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { num: 1, label: "Select Classrooms" },
          { num: 2, label: "Choose Content" },
          { num: 3, label: "Review & Assign" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <button
              onClick={() => setStep(s.num as 1 | 2 | 3)}
              disabled={s.num > step}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                step === s.num
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25"
                  : step > s.num
                  ? "bg-teal-100 text-teal-700"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > s.num ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{s.num}</span>
              )}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < 2 && (
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Classrooms */}
      {step === 1 && (
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Select Classrooms
            </CardTitle>
            <CardDescription>
              Choose which classrooms should receive this assignment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classrooms.map((classroom) => (
                <label
                  key={classroom.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedClassrooms.includes(classroom.id)
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Checkbox
                    checked={selectedClassrooms.includes(classroom.id)}
                    onCheckedChange={() => toggleClassroom(classroom.id)}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">
                      {classroom.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {classroom.studentCount} students
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setStep(2)}
                disabled={selectedClassrooms.length === 0}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Choose Content */}
      {step === 2 && (
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              Choose Content
            </CardTitle>
            <CardDescription>
              Select the readers and activities to assign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contentItems.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedContent.includes(item.id)
                      ? "border-teal-500 bg-teal-50/50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Checkbox
                    checked={selectedContent.includes(item.id)}
                    onCheckedChange={() => toggleContent(item.id)}
                  />
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${item.color} shrink-0`}
                  >
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                      <span>{item.topic}</span>
                      <span>•</span>
                      <Badge variant="secondary" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={selectedContent.length === 0}
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Assign */}
      {step === 3 && (
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-teal-600" />
              Review & Assign
            </CardTitle>
            <CardDescription>
              Confirm your assignment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-blue-50">
                <p className="text-sm text-blue-600 font-medium">Classrooms</p>
                <p className="text-2xl font-bold text-slate-900">
                  {selectedClassrooms.length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50">
                <p className="text-sm text-emerald-600 font-medium">Students</p>
                <p className="text-2xl font-bold text-slate-900">
                  {totalStudents}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50">
                <p className="text-sm text-amber-600 font-medium">
                  Content Items
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {selectedContent.length}
                </p>
              </div>
            </div>

            {/* Due date */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Due Date (Optional)
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Selected items preview */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Classrooms
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedClassroomData.map((c) => (
                    <Badge key={c.id} variant="secondary">
                      {c.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Content
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedContentData.map((c) => (
                    <Badge key={c.id} variant="secondary">
                      {c.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                onClick={handleAssign}
                className="bg-gradient-to-r from-teal-500 to-emerald-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Assign to {totalStudents} Students
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
