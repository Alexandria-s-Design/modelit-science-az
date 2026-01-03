"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Volume2,
  Settings,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Demo content - will be replaced with MDX/database content
const demoReader = {
  id: "1",
  title: "Food Webs: Connections in Nature",
  topic: "Ecosystems",
  level: "mid",
  totalPages: 5,
  pages: [
    {
      title: "What is an Ecosystem?",
      content: `An **ecosystem** is like a big neighborhood where living things and non-living things work together. Just like in your neighborhood, everyone has a role to play!

In an ecosystem, you'll find:
- **Living things** (biotic): plants, animals, insects, and tiny organisms you can't see
- **Non-living things** (abiotic): water, sunlight, soil, rocks, and air

Think about a pond. The fish, frogs, and plants are the living parts. The water, mud, and sunlight are the non-living parts. They all need each other!`,
      image: "/images/ecosystem-intro.jpg",
    },
    {
      title: "Producers: The Food Makers",
      content: `Every ecosystem has **producers**. These are living things that make their own food using sunlight. Plants are the most common producers.

Through a process called **photosynthesis**, plants:
1. Take in sunlight through their leaves
2. Absorb water through their roots
3. Take in carbon dioxide from the air
4. Turn all of this into food (sugar) and oxygen

Without producers, no other life could exist! They are the foundation of every food web.`,
      image: "/images/producers.jpg",
    },
    {
      title: "Consumers: The Food Eaters",
      content: `**Consumers** are living things that eat other organisms to get energy. They can't make their own food like producers can.

There are different types of consumers:
- **Primary consumers** (herbivores): Eat only plants. Examples: rabbits, deer, grasshoppers
- **Secondary consumers** (carnivores): Eat primary consumers. Examples: frogs, small birds
- **Tertiary consumers** (top predators): Eat other consumers. Examples: hawks, wolves

Some animals are **omnivores** - they eat both plants and animals. Humans are omnivores!`,
      image: "/images/consumers.jpg",
    },
    {
      title: "Food Chains and Food Webs",
      content: `A **food chain** shows how energy moves from one organism to another. It's like a line:

Sun → Grass → Rabbit → Fox

But nature is more complex! In real ecosystems, animals eat many different things. When we connect all the food chains together, we get a **food web**.

Food webs show us that:
- Every organism is connected to others
- If one species disappears, it affects many others
- Energy flows through the entire system`,
      image: "/images/food-web.jpg",
    },
    {
      title: "Decomposers: Nature's Recyclers",
      content: `**Decomposers** are the cleanup crew of every ecosystem. They break down dead plants and animals into nutrients.

Common decomposers include:
- Fungi (mushrooms)
- Bacteria
- Worms
- Some insects

When decomposers break down dead matter, nutrients return to the soil. Plants use these nutrients to grow. And the cycle continues!

This is called the **nutrient cycle** - nothing is wasted in nature. It's one of the most important systems in our world.`,
      image: "/images/decomposers.jpg",
    },
  ],
};

export default function ReaderPage() {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">(
    "normal"
  );

  const page = demoReader.pages[currentPage];
  const progress = ((currentPage + 1) / demoReader.totalPages) * 100;
  const isLastPage = currentPage === demoReader.totalPages - 1;

  const fontSizeClass = {
    normal: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  }[fontSize];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/student"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
            <Leaf className="w-3 h-3 mr-1" />
            {demoReader.topic}
          </Badge>
          <Badge variant="secondary" className="capitalize">
            {demoReader.level} Level
          </Badge>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mb-2">
        {demoReader.title}
      </h1>

      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-slate-500 whitespace-nowrap">
          {currentPage + 1} of {demoReader.totalPages}
        </span>
      </div>

      {/* Content card */}
      <Card className="border-slate-200/60 shadow-lg mb-6">
        <CardContent className="p-6 lg:p-8">
          {/* Page title */}
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            {page.title}
          </h2>

          {/* Content */}
          <div
            className={`prose prose-slate max-w-none ${fontSizeClass} leading-relaxed`}
          >
            {page.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph.split("**").map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-teal-700 font-semibold">
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            ))}
          </div>

          {/* Placeholder image */}
          <div className="mt-6 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 h-48 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <Leaf className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Illustration coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {/* Font size controls */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setFontSize("normal")}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              fontSize === "normal"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize("large")}
            className={`px-3 py-1.5 rounded text-base font-medium transition-colors ${
              fontSize === "large"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize("xlarge")}
            className={`px-3 py-1.5 rounded text-lg font-medium transition-colors ${
              fontSize === "xlarge"
                ? "bg-white shadow text-slate-900"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            A
          </button>
        </div>

        {isLastPage ? (
          <Link href="/student">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-teal-500 to-emerald-600"
            >
              <CheckCircle className="w-4 h-4" />
              Complete
            </Button>
          </Link>
        ) : (
          <Button
            size="lg"
            onClick={() =>
              setCurrentPage((p) => Math.min(demoReader.totalPages - 1, p + 1))
            }
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Page dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {demoReader.pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentPage
                ? "bg-teal-500 w-6"
                : i < currentPage
                ? "bg-teal-200"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
