"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Leaf,
  Check,
  Users,
  School,
  Sparkles,
  BookOpen,
  BarChart3,
  Zap,
} from "lucide-react";

const plans = [
  {
    id: "teacher",
    name: "Teacher",
    price: 99,
    period: "year",
    description: "Perfect for individual classrooms",
    icon: Users,
    features: [
      "Up to 36 students",
      "All 4 topic modules",
      "3 reading levels per topic",
      "Progress tracking dashboard",
      "Printable activities",
      "Email support",
    ],
    popular: true,
  },
  {
    id: "school",
    name: "School",
    price: 499,
    period: "year",
    description: "Building-wide access for your school",
    icon: School,
    features: [
      "Unlimited teachers",
      "Unlimited students",
      "All 4 topic modules",
      "3 reading levels per topic",
      "School-wide analytics",
      "Admin dashboard",
      "Priority support",
      "Professional development resources",
    ],
    popular: false,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Leveled Readers",
    description: "Three reading levels ensure every student can access the content",
  },
  {
    icon: Sparkles,
    title: "Interactive Activities",
    description: "Hands-on activities reinforce systems thinking concepts",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Real-time insights into student progress and comprehension",
  },
  {
    icon: Zap,
    title: "NGSS Aligned",
    description: "All content aligned to Next Generation Science Standards",
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    // Redirect to login/register with plan selection
    window.location.href = `/register?plan=${planId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ModelIt Readers</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign in
              </Link>
              <Button
                asChild
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
              >
                <Link href="/register">Start Free Trial</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative border-2 ${
                  plan.popular
                    ? "border-teal-500 shadow-xl shadow-teal-500/10"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-12 text-base font-medium ${
                      plan.popular
                        ? "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                  >
                    {loading === plan.id ? "Loading..." : "Start Free Trial"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens after my free trial?
              </h3>
              <p className="text-gray-600">
                After 14 days, you&apos;ll be automatically charged for your selected plan.
                You can cancel anytime before the trial ends.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I switch between plans?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take
                effect immediately, and we&apos;ll prorate the difference.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer discounts for districts?
              </h3>
              <p className="text-gray-600">
                Yes, we offer custom pricing for districts. Contact us at{" "}
                <a
                  href="mailto:hello@modelitk12.com"
                  className="text-teal-600 hover:underline"
                >
                  hello@modelitk12.com
                </a>{" "}
                to learn more.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express).
                For schools, we also accept purchase orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-teal-600 hover:bg-gray-100 h-14 px-8 text-lg font-semibold"
          >
            <Link href="/register">Start Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">ModelIt Readers</span>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ModelIt K-12. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
