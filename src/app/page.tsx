"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TreePine,
  Heart,
  TrendingUp,
  Cloud,
  BookOpen,
  Users,
  Sparkles,
  Check,
  ArrowRight,
  GraduationCap,
  School,
  Layers,
  Zap,
} from "lucide-react";
import Link from "next/link";

const topics = [
  {
    icon: TreePine,
    title: "Ecosystems",
    domain: "Life Systems",
    description: "Interconnections, energy flow, and balance in nature",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Heart,
    title: "Human Body",
    domain: "Life Systems",
    description: "Organs working together through feedback loops",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: TrendingUp,
    title: "Economics",
    domain: "Social Systems",
    description: "Markets, trade-offs, and equilibrium",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Cloud,
    title: "Climate",
    domain: "Earth Systems",
    description: "Global cycles and cause & effect",
    color: "from-sky-500 to-blue-600",
  },
];

const benefits = [
  {
    icon: Layers,
    title: "Systems Thinking Across Subjects",
    description:
      "Not just biology—see the systems in ecosystems, economics, technology, and more.",
  },
  {
    icon: BookOpen,
    title: "Leveled Readers for Every Student",
    description:
      "Three reading levels per topic ensure every student accesses content at their level.",
  },
  {
    icon: Zap,
    title: "Teacher-Friendly Tools",
    description:
      "Simple classroom codes, progress tracking, and ready-to-use activities.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-teal-50/30 to-emerald-50/40">
      {/* Organic background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-teal-200/40 to-emerald-300/30 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-200/30 to-rose-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-sky-200/30 to-teal-200/20 blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-teal-100/50 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-emerald-600 shadow-lg shadow-teal-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              ModelIt<span className="text-teal-600">Readers</span>
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#topics"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Topics
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              Sign In
            </Link>
            <Button className="bg-gradient-to-r from-teal-600 to-emerald-600 shadow-lg shadow-teal-500/25 transition hover:shadow-xl hover:shadow-teal-500/30">
              Start Free Trial
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 border-teal-200 bg-teal-50/80 px-4 py-1.5 text-teal-700"
            >
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              The only K-12 platform for systems literacy
            </Badge>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              See the{" "}
              <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                Systems
              </span>{" "}
              in Everything
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              Leveled readers that teach students to understand how the world
              works—from ecosystems to economies, from the human body to
              climate. Systems thinking for every subject.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-14 w-full bg-gradient-to-r from-teal-600 to-emerald-600 px-8 text-base shadow-xl shadow-teal-500/25 transition hover:shadow-2xl hover:shadow-teal-500/30 sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-full border-slate-200 bg-white/80 px-8 text-base shadow-lg backdrop-blur transition hover:bg-white sm:w-auto"
              >
                See Pricing
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>

        {/* Decorative interconnected nodes */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2">
          <svg
            width="800"
            height="120"
            viewBox="0 0 800 120"
            fill="none"
            className="opacity-20"
          >
            <circle cx="100" cy="60" r="8" fill="#0D9488" />
            <circle cx="250" cy="40" r="6" fill="#14B8A6" />
            <circle cx="400" cy="80" r="10" fill="#0D9488" />
            <circle cx="550" cy="30" r="5" fill="#10B981" />
            <circle cx="700" cy="70" r="7" fill="#0D9488" />
            <path
              d="M100 60 Q175 20 250 40 T400 80 T550 30 T700 70"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0D9488" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why teachers choose ModelIt Readers
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              A complete reading platform designed for how students actually
              learn.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border-slate-100 bg-white/80 shadow-xl shadow-slate-200/50 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <CardHeader>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/25">
                    <benefit.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-amber-200 bg-amber-50/80 px-4 py-1.5 text-amber-700"
            >
              4 Topics at Launch
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Systems are everywhere
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Start with four carefully designed topic units spanning life
              science, social studies, and earth science.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden border-0 bg-white shadow-xl shadow-slate-200/50 transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 transition group-hover:opacity-5`}
                />
                <CardHeader className="pb-2">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${topic.color} shadow-lg`}
                  >
                    <topic.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="mb-2 w-fit bg-slate-100 text-slate-600"
                  >
                    {topic.domain}
                  </Badge>
                  <CardTitle className="text-lg text-slate-900">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500">
              Each topic includes 3 reading levels, 9 activities, 1 assessment,
              and a teacher guide.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Start your 14-day free trial today. No credit card required.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Teacher Plan */}
            <Card className="relative overflow-hidden border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <GraduationCap className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle className="text-2xl text-slate-900">
                  Teacher
                </CardTitle>
                <p className="text-slate-600">
                  Perfect for individual classrooms
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-500">/year</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Up to 36 students",
                    "All 4 topic units",
                    "3 reading levels per topic",
                    "Progress tracking",
                    "Teacher guides & lesson plans",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100">
                        <Check className="h-3 w-3 text-teal-700" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-slate-200 py-6 text-base"
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* School Plan */}
            <Card className="relative overflow-hidden border-teal-200 bg-gradient-to-br from-teal-600 to-emerald-600 shadow-2xl shadow-teal-500/25">
              <div className="absolute right-4 top-4">
                <Badge className="bg-white/20 text-white backdrop-blur">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <School className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">School</CardTitle>
                <p className="text-teal-100">Best value for your building</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$499</span>
                  <span className="text-teal-100">/year</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Unlimited teachers",
                    "Unlimited students",
                    "All 4 topic units",
                    "School-wide analytics",
                    "Priority support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-white py-6 text-base text-teal-700 shadow-lg hover:bg-teal-50">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500">
              Need a district license?{" "}
              <Link
                href="/contact"
                className="font-medium text-teal-700 hover:underline"
              >
                Contact us for custom pricing
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <CardContent className="relative p-12 text-center sm:p-16">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to transform how your students see the world?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
                Join hundreds of teachers using ModelIt Readers to build systems
                thinking skills across subjects.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="h-14 w-full bg-white px-8 text-base text-slate-900 shadow-xl transition hover:bg-slate-100 sm:w-auto"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 px-6 py-12 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-emerald-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-slate-800">
                ModelIt<span className="text-teal-600">Readers</span>
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
              <Link href="/about" className="hover:text-teal-700">
                About
              </Link>
              <Link href="/contact" className="hover:text-teal-700">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-teal-700">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-teal-700">
                Terms
              </Link>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 ModelIt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
