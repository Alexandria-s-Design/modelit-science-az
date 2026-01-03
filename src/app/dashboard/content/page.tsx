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
import {
  BookOpen,
  Search,
  Filter,
  Leaf,
  Heart,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const topics = [
  {
    id: "ecosystems",
    name: "Ecosystems & Food Webs",
    icon: Leaf,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    description: "Explore interconnected systems in nature",
    contentCount: 12,
    domain: "Life Systems",
  },
  {
    id: "body-systems",
    name: "Human Body Systems",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    textColor: "text-rose-600",
    description: "Discover how organs work together",
    contentCount: 12,
    domain: "Life Systems",
  },
  {
    id: "economics",
    name: "Economic Systems",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    description: "Understand markets and trade-offs",
    contentCount: 12,
    domain: "Social Systems",
  },
  {
    id: "climate",
    name: "Climate & Carbon Cycle",
    icon: Globe,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Learn about global cycles and cause & effect",
    contentCount: 12,
    domain: "Earth Systems",
  },
];

const contentTypes = [
  { label: "All", value: "all" },
  { label: "Readers", value: "reader" },
  { label: "Activities", value: "activity" },
  { label: "Assessments", value: "assessment" },
];

const readingLevels = [
  { label: "Low", value: "low", color: "bg-sky-100 text-sky-700" },
  { label: "Mid", value: "mid", color: "bg-violet-100 text-violet-700" },
  { label: "High", value: "high", color: "bg-fuchsia-100 text-fuchsia-700" },
];

// Demo content items
const demoContent = [
  {
    id: "1",
    title: "Food Webs: Connections in Nature",
    topic: "ecosystems",
    type: "reader",
    level: "mid",
    duration: "15 min",
    assigned: true,
  },
  {
    id: "2",
    title: "Energy Flow Activity",
    topic: "ecosystems",
    type: "activity",
    level: "mid",
    duration: "20 min",
    assigned: false,
  },
  {
    id: "3",
    title: "Ecosystem Balance Assessment",
    topic: "ecosystems",
    type: "assessment",
    level: "mid",
    duration: "25 min",
    assigned: false,
  },
  {
    id: "4",
    title: "The Heart: A Pumping System",
    topic: "body-systems",
    type: "reader",
    level: "low",
    duration: "12 min",
    assigned: true,
  },
  {
    id: "5",
    title: "Circulatory System Exploration",
    topic: "body-systems",
    type: "activity",
    level: "high",
    duration: "25 min",
    assigned: false,
  },
];

export default function ContentPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = demoContent.filter((item) => {
    if (selectedTopic && item.topic !== selectedTopic) return false;
    if (selectedType !== "all" && item.type !== selectedType) return false;
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const getTopicData = (topicId: string) =>
    topics.find((t) => t.id === topicId);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          Content Library
        </h1>
        <p className="text-slate-600 mt-1">
          Browse readers, activities, and assessments by topic
        </p>
      </div>

      {/* Topics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() =>
              setSelectedTopic(selectedTopic === topic.id ? null : topic.id)
            }
            className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
              selectedTopic === topic.id
                ? "border-teal-500 bg-teal-50/50 shadow-lg shadow-teal-500/10"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${topic.color} shadow-lg`}
              >
                <topic.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm truncate">
                  {topic.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{topic.domain}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {topic.contentCount} items
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {contentTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type.value)}
              className={
                selectedType === type.value
                  ? "bg-slate-900"
                  : "hover:bg-slate-50"
              }
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Reading levels legend */}
      <div className="flex items-center gap-3 mb-6 text-sm">
        <span className="text-slate-500">Reading Levels:</span>
        {readingLevels.map((level) => (
          <Badge key={level.value} variant="secondary" className={level.color}>
            {level.label}
          </Badge>
        ))}
      </div>

      {/* Content list */}
      {filteredContent.length === 0 ? (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No content found
            </h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Try adjusting your filters or search query.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredContent.map((item) => {
            const topic = getTopicData(item.topic);
            const level = readingLevels.find((l) => l.value === item.level);
            return (
              <Card
                key={item.id}
                className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Topic icon */}
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${
                        topic?.color || "from-slate-400 to-slate-500"
                      } shadow-sm shrink-0`}
                    >
                      {topic?.icon ? (
                        <topic.icon className="w-5 h-5 text-white" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Content info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {item.title}
                        </h3>
                        {item.assigned && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-50 text-emerald-700 shrink-0"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Assigned
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                        <span className="capitalize">{item.type}</span>
                        <span>•</span>
                        <Badge variant="secondary" className={level?.color}>
                          {level?.label}
                        </Badge>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Link href={`/dashboard/assign?content=${item.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-emerald-600"
                        >
                          Assign
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Coming soon note */}
      <Card className="mt-8 border-slate-200/60 bg-gradient-to-r from-slate-50 to-slate-100">
        <CardContent className="py-6">
          <div className="text-center">
            <h3 className="font-semibold text-slate-900">More content coming</h3>
            <p className="text-sm text-slate-600 mt-1">
              We&apos;re adding new readers and activities every week. Check
              back soon for more topics!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
