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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Users,
  Copy,
  Check,
  MoreVertical,
  UserPlus,
  Settings,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Demo data - will be replaced with real data from Supabase
const demoClassrooms = [
  {
    id: "1",
    name: "Period 1 - Life Science",
    joinCode: "ABC123",
    studentCount: 28,
    createdAt: "2025-12-15",
  },
  {
    id: "2",
    name: "Period 3 - Earth Science",
    joinCode: "XYZ789",
    studentCount: 24,
    createdAt: "2025-12-16",
  },
  {
    id: "3",
    name: "Period 5 - Biology Honors",
    joinCode: "DEF456",
    studentCount: 22,
    createdAt: "2025-12-17",
  },
];

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState(demoClassrooms);
  const [newClassroomName, setNewClassroomName] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const generateJoinCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCreateClassroom = () => {
    if (!newClassroomName.trim()) return;

    const newClassroom = {
      id: String(classrooms.length + 1),
      name: newClassroomName,
      joinCode: generateJoinCode(),
      studentCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClassrooms([...classrooms, newClassroom]);
    setNewClassroomName("");
    setDialogOpen(false);
  };

  const copyJoinCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
            Classrooms
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your classes and student rosters
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-lg shadow-teal-500/25">
              <Plus className="w-4 h-4 mr-2" />
              New Classroom
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Classroom</DialogTitle>
              <DialogDescription>
                Create a classroom and share the join code with your students.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Classroom Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Period 1 - Life Science"
                  value={newClassroomName}
                  onChange={(e) => setNewClassroomName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateClassroom()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateClassroom}
                disabled={!newClassroomName.trim()}
              >
                Create Classroom
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classrooms grid */}
      {classrooms.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No classrooms yet
            </h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Create your first classroom to start adding students and assigning
              content.
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Classroom
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card
              key={classroom.id}
              className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {classroom.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {classroom.studentCount} students
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Students
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                {/* Join code display */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Join Code
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => copyJoinCode(classroom.joinCode)}
                    >
                      {copiedCode === classroom.joinCode ? (
                        <>
                          <Check className="w-3 h-3 mr-1 text-emerald-500" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="font-mono text-2xl font-bold text-slate-900 tracking-widest">
                    {classroom.joinCode}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Share this code with students to join
                  </p>
                </div>

                {/* Student preview */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(4, classroom.studentCount))].map(
                      (_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold shadow-sm"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      )
                    )}
                    {classroom.studentCount > 4 && (
                      <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-slate-600 text-xs font-semibold">
                        +{classroom.studentCount - 4}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    View Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Help section */}
      <Card className="mt-8 border-slate-200/60 bg-gradient-to-r from-teal-50/50 to-emerald-50/50">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">
                How students join
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Students go to{" "}
                <span className="font-mono text-teal-600">
                  modelitreaders.com/join
                </span>{" "}
                and enter the 6-character code. No email required!
              </p>
            </div>
            <Button variant="outline">View student guide</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
