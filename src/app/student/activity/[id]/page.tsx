"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Leaf,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Demo activity - will be replaced with database content
const demoActivity = {
  id: "2",
  title: "Energy Flow Activity",
  topic: "Ecosystems",
  totalQuestions: 5,
  questions: [
    {
      id: 1,
      type: "multiple_choice",
      question: "Which of the following is a producer in an ecosystem?",
      options: ["Rabbit", "Oak tree", "Fox", "Mushroom"],
      correctAnswer: 1,
      explanation:
        "Oak trees are producers because they make their own food through photosynthesis. Rabbits are consumers, foxes are predators, and mushrooms are decomposers.",
    },
    {
      id: 2,
      type: "multiple_choice",
      question:
        "What do we call animals that only eat plants?",
      options: ["Carnivores", "Omnivores", "Herbivores", "Decomposers"],
      correctAnswer: 2,
      explanation:
        "Herbivores are animals that only eat plants. Carnivores eat meat, omnivores eat both plants and meat, and decomposers break down dead matter.",
    },
    {
      id: 3,
      type: "multiple_choice",
      question: "In a food chain, energy flows from:",
      options: [
        "Consumers to producers",
        "Producers to consumers",
        "Decomposers to producers",
        "Consumers to decomposers only",
      ],
      correctAnswer: 1,
      explanation:
        "Energy flows from producers (like plants) to consumers (like animals). Producers capture energy from the sun and pass it along when they are eaten.",
    },
    {
      id: 4,
      type: "multiple_choice",
      question: "Why are decomposers important in an ecosystem?",
      options: [
        "They provide shade for other organisms",
        "They hunt and control animal populations",
        "They break down dead matter and return nutrients to the soil",
        "They produce oxygen through photosynthesis",
      ],
      correctAnswer: 2,
      explanation:
        "Decomposers break down dead plants and animals, returning nutrients to the soil. This allows plants to grow and keeps the ecosystem healthy.",
    },
    {
      id: 5,
      type: "multiple_choice",
      question: "A food web is different from a food chain because:",
      options: [
        "It only includes producers",
        "It shows how multiple food chains connect",
        "It doesn't include decomposers",
        "It only shows one path of energy flow",
      ],
      correctAnswer: 1,
      explanation:
        "A food web shows how multiple food chains are interconnected in an ecosystem. It gives a more complete picture of how energy flows between many organisms.",
    },
  ],
};

export default function ActivityPage() {
  const params = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = demoActivity.questions[currentQuestion];
  const progress =
    ((currentQuestion + (isAnswered ? 1 : 0)) / demoActivity.totalQuestions) *
    100;

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    if (optionIndex === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < demoActivity.totalQuestions - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  const percentage = Math.round((score / demoActivity.totalQuestions) * 100);

  // Completion screen
  if (isComplete) {
    return (
      <div className="max-w-xl mx-auto text-center py-8">
        <div
          className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            percentage >= 80
              ? "bg-emerald-100"
              : percentage >= 60
              ? "bg-amber-100"
              : "bg-rose-100"
          }`}
        >
          <Award
            className={`w-12 h-12 ${
              percentage >= 80
                ? "text-emerald-600"
                : percentage >= 60
                ? "text-amber-600"
                : "text-rose-600"
            }`}
          />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {percentage >= 80
            ? "Great job!"
            : percentage >= 60
            ? "Good effort!"
            : "Keep practicing!"}
        </h1>
        <p className="text-slate-600 mb-8">
          You scored {score} out of {demoActivity.totalQuestions}
        </p>

        <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-2xl mb-8">
          <span className="text-4xl font-bold text-slate-900">
            {percentage}%
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="outline" size="lg" onClick={handleRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Link href="/student">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-emerald-600"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/student"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
          <Leaf className="w-3 h-3 mr-1" />
          {demoActivity.topic}
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        {demoActivity.title}
      </h1>

      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-slate-500 whitespace-nowrap">
          Question {currentQuestion + 1} of {demoActivity.totalQuestions}
        </span>
      </div>

      {/* Question card */}
      <Card className="border-slate-200/60 shadow-lg mb-6">
        <CardContent className="p-6 lg:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = isAnswered;

              let className =
                "w-full p-4 rounded-xl border-2 text-left transition-all ";

              if (showResult) {
                if (isCorrect) {
                  className +=
                    "border-emerald-500 bg-emerald-50 text-emerald-900";
                } else if (isSelected && !isCorrect) {
                  className += "border-rose-500 bg-rose-50 text-rose-900";
                } else {
                  className += "border-slate-200 text-slate-400";
                }
              } else if (isSelected) {
                className += "border-teal-500 bg-teal-50 text-teal-900";
              } else {
                className +=
                  "border-slate-200 hover:border-slate-300 hover:bg-slate-50";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={className}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        showResult && isCorrect
                          ? "bg-emerald-500 text-white"
                          : showResult && isSelected && !isCorrect
                          ? "bg-rose-500 text-white"
                          : isSelected
                          ? "bg-teal-500 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {showResult && isCorrect ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : showResult && isSelected && !isCorrect ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                selectedAnswer === question.correctAnswer
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-amber-50 border border-amber-200"
              }`}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  selectedAnswer === question.correctAnswer
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}
              >
                {selectedAnswer === question.correctAnswer
                  ? "Correct!"
                  : "Not quite..."}
              </p>
              <p className="text-sm text-slate-600">{question.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next button */}
      {isAnswered && (
        <div className="flex justify-end">
          <Button size="lg" onClick={handleNext} className="gap-2">
            {currentQuestion < demoActivity.totalQuestions - 1
              ? "Next Question"
              : "See Results"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
