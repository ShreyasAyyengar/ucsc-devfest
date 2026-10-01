"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  ExternalLink,
  Gift,
  HelpCircle,
  Mail,
  MapPin,
  Search,
  ShieldAlert,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DiscordSvg } from "@/SVGs/discord-svg";
import { GdgLogoSvg } from "@/SVGs/gdg-logo-svg";

type FaqItem = {
  answerText: string;
  category: string;
  id: string;
  question: string;
  renderCustomContent?: (openCodeOfConduct: () => void) => React.ReactNode;
};

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle, color: "#4285F4" },
  { id: "getting-started", label: "Getting Started", icon: Sparkles, color: "#4285F4" },
  { id: "teams", label: "Teams", icon: Users, color: "#34A853" },
  { id: "location", label: "Location", icon: MapPin, color: "#EA4335" },
  { id: "time-schedule", label: "Time & Schedule", icon: Clock, color: "#FBBC05" },
  { id: "building", label: "Building Your Project", icon: Code2, color: "#4285F4" },
  { id: "food-prizes", label: "Food, Swag & Prizes", icon: Gift, color: "#EA4335" },
  { id: "registration", label: "Registration & Logistics", icon: CheckCircle2, color: "#34A853" },
] as const;

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "what-is-devfest": true, // open the first by default
  });
  const [isCodeOfConductOpen, setIsCodeOfConductOpen] = useState(false);

  // Sync hash changes (e.g. #code-of-conduct)
  useEffect(() => {
    if (typeof window !== "undefined" && (window.location.hash === "#code-of-conduct" || window.location.hash === "#rules")) {
      setIsCodeOfConductOpen(true);
    }
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    for (const item of faqData) {
      allOpen[item.id] = true;
    }
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const faqData: FaqItem[] = useMemo(
    () => [
      // 1. Getting Started
      {
        id: "what-is-devfest",
        category: "getting-started",
        question: "What is DevFest?",
        answerText:
          "DevFest is a community-led developer event hosted by Google Developer Groups on Campus (GDGC) at UCSC. Over the weekend of November 14th-15th, you'll build a project with a team, learn new skills, and meet other people who love tech. Along the way, you'll hear from industry speakers, including software engineers from Google, who will share their experiences, career insights, and advice. Whether you're brand new to coding or just looking for a fun weekend project, DevFest is a welcoming place to learn by building.",
      },
      {
        id: "experience-needed",
        category: "getting-started",
        question: "Do I need any experience to participate?",
        answerText:
          "Nope! This hackathon is designed for beginners. If you've never written a line of code, you're welcome here. We'll have workshops, mentors, and starter resources to help you get going at our GDGC instruction meetings. The only requirement is curiosity and a willingness to learn.",
      },
      {
        id: "what-is-a-hackathon",
        category: "getting-started",
        question: "What is a hackathon, anyway?",
        answerText:
          "A hackathon is a time-limited event where participants team up to build a project, such as a website, app, game, or tool, from scratch. It's less about perfection and more about learning, experimenting, and having fun.",
      },
      {
        id: "ucsc-student-requirement",
        category: "getting-started",
        question: "Do I need to be a UCSC student?",
        answerText:
          "Nope! This hackathon is open to everyone, whether you're a UCSC student, a student from another school, or not a student at all. All skill levels and backgrounds are welcome.",
      },
      {
        id: "is-it-free",
        category: "getting-started",
        question: "Is it free?",
        answerText: "Yes, completely free! Food is provided, and you don't need to pay anything to participate.",
      },

      // 2. Teams
      {
        id: "need-a-team",
        category: "teams",
        question: "Do I need a team?",
        answerText: "Teams are encouraged but not required. Max members per team is 4 people.",
      },
      {
        id: "find-a-team",
        category: "teams",
        question: "I don't have a team. How do I find one?",
        answerText:
          "No worries, this is very common! Once you're accepted, we'll give you access to a team-finding interface where you can form a team or connect with other participants who are looking for teammates.",
      },
      {
        id: "work-solo",
        category: "teams",
        question: "Can I work solo?",
        answerText: "Yes! That said, we recommend teaming up, since it's more fun and you'll learn more.",
      },
      {
        id: "switch-teams",
        category: "teams",
        question: "Can I switch teams during the event?",
        answerText:
          "Once teams are finalized, switching teams isn't allowed. We recommend taking time to connect with your teammates early on, so you're confident in your team before hacking begins.",
      },

      // 3. Location
      {
        id: "hackathon-location",
        category: "location",
        question: "Where is the hackathon being held?",
        answerText:
          "The hackathon will be held at the Merrill Cultural Center, 641 Merrill Rd, Santa Cruz, CA 95064, on the UC Santa Cruz campus.",
        renderCustomContent: () => (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://maps.google.com/?q=Merrill+Cultural+Center+641+Merrill+Rd+Santa+Cruz+CA+95064"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#4285F4]/30 bg-[#4285F4]/10 px-3 py-1.5 font-medium text-[#1A73E8] text-xs transition-colors hover:bg-[#4285F4]/20"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
      },
      {
        id: "where-to-park",
        category: "location",
        question: "Where do I park?",
        answerText:
          "Once you're accepted, we'll email you instructions on where and how to park. If you'd rather skip parking altogether, UCSC's campus shuttles (Metro/Loop buses) are a convenient way to get around campus.",
      },
      {
        id: "venue-accessibility",
        category: "location",
        question: "Is the venue accessible?",
        answerText:
          "Yes, the venue is accessible. If you have specific accessibility needs or questions, please email us at ucsc.dsc@gmail.com and we'll do our best to accommodate you.",
        renderCustomContent: () => (
          <div className="mt-3">
            <a
              href="mailto:ucsc.dsc@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <Mail className="h-3.5 w-3.5 text-[#EA4335]" />
              <span>Contact ucsc.dsc@gmail.com</span>
            </a>
          </div>
        ),
      },
      {
        id: "in-person-or-virtual",
        category: "location",
        question: "Is this event in-person or virtual?",
        answerText:
          "This event is fully in person at the Merrill Cultural Center on the UCSC campus. There's no virtual option, so plan to join us on-site!",
      },

      // 4. Time & Schedule
      {
        id: "when-is-the-hackathon",
        category: "time-schedule",
        question: "When is the hackathon?",
        answerText:
          "The hackathon runs November 14th-15th at the Merrill Cultural Center:\n• Saturday, November 14th: 9:00 AM to 7:00 PM\n• Sunday, November 15th: 9:00 AM to 4:00 PM",
        renderCustomContent: () => (
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-gray-200/80 bg-gray-50/70 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4285F4]/10 text-[#4285F4]">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs">Saturday, Nov 14</p>
                <p className="text-gray-600 text-xs">9:00 AM – 7:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-gray-200/80 bg-gray-50/70 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#34A853]/10 text-[#34A853]">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-xs">Sunday, Nov 15</p>
                <p className="text-gray-600 text-xs">9:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "stay-whole-time",
        category: "time-schedule",
        question: "Do I have to stay the whole time?",
        answerText:
          "Nope, you don't have to stay the whole time! That said, we'll have speakers and free food throughout the event, so we'd love for you to stick around. Just make sure you're back in time for submissions and demos.",
      },
      {
        id: "is-it-overnight",
        category: "time-schedule",
        question: "Is it overnight?",
        answerText:
          "No, this is not an overnight event. The venue is only open during these hours:\nSaturday, November 14th: 9:00 AM to 7:00 PM\nSunday, November 15th: 9:00 AM to 4:00 PM",
      },

      // 5. Building Your Project
      {
        id: "what-can-i-build",
        category: "building",
        question: "What can I build?",
        answerText: "Anything you like! Websites, mobile apps, games, data projects, or tools that solve a problem you care about.",
      },
      {
        id: "workshops-mentors",
        category: "building",
        question: "Will there be workshops or mentors?",
        answerText:
          "Yes! We'll host beginner-friendly workshops at our GDGC club meetings leading up to the hackathon, so you can pick up the basics before the event. Check our Instagram (@gdgc_ucsc) and mailing list for workshop dates and times. During the hackathon itself, mentors will be around throughout to help when you're stuck.",
        renderCustomContent: () => (
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.instagram.com/gdgc_ucsc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-pink-200 bg-pink-50/80 px-3 py-1.5 font-medium text-pink-700 text-xs transition-colors hover:bg-pink-100"
            >
              <span>Follow @gdgc_ucsc on Instagram</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
      },
      {
        id: "is-there-a-theme",
        category: "building",
        question: "Is there a theme?",
        answerText:
          "We don't have a theme — prize tracks will be revealed at the hackathon, so come ready for a surprise! You don't need to prepare anything ahead of time. Just bring your curiosity and your laptop.",
      },
      {
        id: "tools-and-tech",
        category: "building",
        question: "What tools or technologies can I use?",
        answerText:
          "Anything you like! We'll provide resources for popular beginner tools, but you're free to use any language, framework, or platform.",
      },

      // 6. Food, Swag & Prizes
      {
        id: "food-provided",
        category: "food-prizes",
        question: "Will food be provided?",
        answerText:
          "Yes! Free food will be available throughout the event. Let us know about any dietary restrictions or allergies in your application when you register so we can accommodate you.",
      },
      {
        id: "are-there-prizes",
        category: "food-prizes",
        question: "Are there prizes?",
        answerText:
          "Yes! We have a $2,000 prize pool to be awarded at the end of the event. Details on how the prizes are split, and which tracks they go with, will be announced soon, so keep an eye on our Instagram and mailing list.",
        renderCustomContent: () => (
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#34A853]/25 bg-[#34A853]/10 px-3.5 py-2 font-medium text-[#1E8E3E] text-xs">
            <Gift className="h-4 w-4" />
            <span>$2,000 Total Prize Pool across Tracks</span>
          </div>
        ),
      },
      {
        id: "will-there-be-swag",
        category: "food-prizes",
        question: "Will there be swag?",
        answerText: "Yes! Expect free swag from GDGC and our sponsors, including shirts/clothing, stickers, and pins.",
      },

      // 7. Registration & Logistics
      {
        id: "registration-rounds-deadlines",
        category: "registration",
        question: "How do I apply and when are applications due?",
        answerText:
          "Apply at ucsc-devfest.com. Spots are limited, and applications are reviewed in two rounds:\n• Priority applications: Open October 1st and close October 10th. Decisions go out October 11th.\n• Regular applications: Open October 11th and close October 28th. Decisions go out November 2nd.\nApplying in the priority round gets you an answer sooner, which helps with planning your weekend.",
        renderCustomContent: () => (
          <div className="mt-3.5 space-y-2.5">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-xl border border-[#4285F4]/30 bg-[#4285F4]/5 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#1A73E8] text-xs">Priority Round</span>
                  <span className="rounded-full bg-[#4285F4]/15 px-2 py-0.5 font-mono text-[#1A73E8] text-[10px]">Fast Track</span>
                </div>
                <p className="mt-1 text-gray-700 text-xs">Oct 1 – Oct 10</p>
                <p className="mt-0.5 text-[11px] text-gray-500">Decisions released Oct 11</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 text-xs">Regular Round</span>
                  <span className="rounded-full bg-gray-200/80 px-2 py-0.5 font-mono text-[10px] text-gray-600">Standard</span>
                </div>
                <p className="mt-1 text-gray-700 text-xs">Oct 11 – Oct 28</p>
                <p className="mt-0.5 text-[11px] text-gray-500">Decisions released Nov 2</p>
              </div>
            </div>
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#4285F4] px-3.5 py-1.5 font-medium text-white text-xs shadow-xs transition-colors hover:bg-[#1A73E8]"
              >
                <span>Go to Application Form</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ),
      },
      {
        id: "day-of-registration",
        category: "registration",
        question: "Can I register on the day of the event?",
        answerText:
          "No, we can't accept day-of registrations. You'll need to apply and be accepted ahead of time. Regular applications close October 28th at ucsc-devfest.com, so apply before then to secure your spot.",
      },
      {
        id: "code-of-conduct",
        category: "registration",
        question: "What's the code of conduct?",
        answerText:
          "We're committed to a welcoming, inclusive, and harassment-free environment for everyone. All participants, organizers, mentors, judges, and sponsors are expected to follow our Code of Conduct. If you experience or witness a violation, tell any organizer or mentor at the event, or email us at ucsc.dsc@gmail.com.",
        renderCustomContent: (openCodeOfConduct: () => void) => (
          <div className="mt-3.5 space-y-3">
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 text-amber-950 text-xs leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                <ShieldAlert className="h-4 w-4 text-[#FBBC05]" />
                <span>Zero Tolerance Policy</span>
              </div>
              <p className="mt-1">
                We take harassment, intimidation, and disruptive behavior seriously to ensure everyone has a safe and inspiring hackathon
                experience.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={openCodeOfConduct}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#4285F4] bg-[#4285F4]/10 px-3.5 py-1.5 font-semibold text-[#1A73E8] text-xs transition-colors hover:bg-[#4285F4] hover:text-white"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Read Full Code of Conduct</span>
              </button>
              <a
                href="mailto:ucsc.dsc@gmail.com"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <Mail className="h-3.5 w-3.5 text-[#EA4335]" />
                <span>Report violation to ucsc.dsc@gmail.com</span>
              </a>
            </div>
          </div>
        ),
      },
      {
        id: "more-questions-contact",
        category: "registration",
        question: "Who do I contact if I have more questions?",
        answerText: "Email us at ucsc.dsc@gmail.com, or ask in our Discord community.",
        renderCustomContent: () => (
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <a
              href="mailto:ucsc.dsc@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-100"
            >
              <Mail className="h-3.5 w-3.5 text-[#EA4335]" />
              <span>Email: ucsc.dsc@gmail.com</span>
            </a>
            <a
              href="https://discord.gg/sJUmrEHs7B"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#5865F2]/30 bg-[#5865F2]/10 px-3 py-1.5 font-medium text-[#5865F2] text-xs transition-colors hover:bg-[#5865F2]/20"
            >
              <DiscordSvg className="h-3.5 w-3.5" />
              <span>Join our Discord</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        ),
      },
      {
        id: "who-is-gdgc",
        category: "registration",
        question: "Who is GDGC?",
        answerText:
          "Google Developer Groups on Campus (GDGC) at UCSC is a student-run community that helps students learn about technology through workshops, events, and projects. Everyone is welcome, regardless of major or experience level!",
      },
    ],
    []
  );

  // Filter items dynamically by category and search query
  const filteredFaq = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return faqData.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return item.question.toLowerCase().includes(query) || item.answerText.toLowerCase().includes(query);
    });
  }, [faqData, selectedCategory, searchQuery]);

  // Group filtered items by category for cleaner reading when "All" is active
  const groupedFaqs = useMemo(() => {
    const groups: { categoryId: string; label: string; items: FaqItem[] }[] = [];
    const categoryOrder = ["getting-started", "teams", "location", "time-schedule", "building", "food-prizes", "registration"];

    for (const catId of categoryOrder) {
      const itemsInCat = filteredFaq.filter((i) => i.category === catId);
      if (itemsInCat.length > 0) {
        const catMeta = CATEGORIES.find((c) => c.id === catId);
        groups.push({
          categoryId: catId,
          label: catMeta?.label ?? catId,
          items: itemsInCat,
        });
      }
    }
    return groups;
  }, [filteredFaq]);

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] text-gray-900 antialiased selection:bg-[#4285F4]/20 selection:text-[#4285F4]">
      {/* Top Header Navigation - Fully responsive */}
      <header className="sticky top-0 z-30 border-gray-200/80 border-b bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
              title="Return to Registration"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200/90 bg-gray-50 shadow-2xs">
                <GdgLogoSvg className="h-3.5 w-auto" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold font-google text-gray-900 text-xs sm:text-sm">GDGC @ UCSC</span>
                <span className="font-medium text-[11px] text-gray-500 sm:text-xs">DevFest Hackathon</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* <a
              href="https://discord.gg/sJUmrEHs7B"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-gray-700 text-xs transition-colors hover:bg-gray-50 sm:inline-flex"
            >
              <DiscordSvg className="h-3.5 w-3.5 text-[#5865F2]" />
              <span>Discord</span>
            </a> */}

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4285F4] px-3.5 py-1.5 font-semibold text-white text-xs shadow-xs transition-colors hover:bg-[#1A73E8]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Application</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-4 pt-8 pb-20 sm:px-6 sm:pt-12 md:px-8">
        {/* Hero Section */}
        <div className="text-center">
          {/* Google 4-Color Accent Dot Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 shadow-2xs">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC05]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
            </span>
            <span className="font-medium text-gray-600 text-xs">November 14–15, 2026 • UC Santa Cruz</span>
          </div>

          <h1 className="mt-4 font-extrabold font-google text-3xl text-gray-900 tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-sm leading-relaxed sm:text-base">
            Everything you need to know about participating in GDGC @ UCSC DevFest. Can&apos;t find what you&apos;re looking for? Reach out on
            our{" "}
            <a
              href="https://discord.gg/sJUmrEHs7B"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#4285F4] underline underline-offset-2 hover:text-[#1A73E8]"
            >
              Discord
            </a>{" "}
            or email{" "}
            <a href="mailto:ucsc.dsc@gmail.com" className="font-medium text-[#4285F4] underline underline-offset-2 hover:text-[#1A73E8]">
              ucsc.dsc@gmail.com
            </a>
            .
          </p>
        </div>

        {/* Dynamic Search Box */}
        <div className="mt-8 sm:mt-10">
          <div className="relative mx-auto max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., parking, beginners, prizes, schedule)..."
              className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pr-11 pl-11 text-gray-900 text-sm shadow-xs outline-none transition-all placeholder:text-gray-400 focus:border-[#4285F4] focus:ring-4 focus:ring-[#4285F4]/10 sm:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 hover:text-gray-600"
                aria-label="Clear search query"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick status bar when searching */}
          {searchQuery && (
            <div className="mx-auto mt-2.5 flex max-w-2xl items-center justify-between px-2 text-xs">
              <span className="text-gray-500">
                Found <span className="font-semibold text-gray-900">{filteredFaq.length}</span> matching{" "}
                {filteredFaq.length === 1 ? "question" : "questions"}
              </span>
              <button type="button" onClick={() => setSearchQuery("")} className="font-medium text-[#4285F4] hover:underline">
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* Responsive Horizontal Category Pills */}
        <div className="mt-6 sm:mt-8">
          <div className="scrollbar-none -mx-4 flex items-center gap-1.5 overflow-x-auto px-4 py-1.5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === "all" ? faqData.length : faqData.filter((item) => item.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2 font-medium text-xs transition-all sm:text-sm ${
                    isSelected
                      ? "bg-gray-900 text-white shadow-xs"
                      : "border border-gray-200/90 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: isSelected ? "#FFFFFF" : cat.color }} />
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 font-mono text-[10px] ${
                      isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Row: Results count & Expand/Collapse All */}
        <div className="mt-8 flex items-center justify-between border-gray-200/80 border-b pb-3">
          <div className="font-google font-semibold text-gray-700 text-xs sm:text-sm">
            {selectedCategory === "all" ? "All Questions" : CATEGORIES.find((c) => c.id === selectedCategory)?.label}{" "}
            <span className="font-normal text-gray-400">({filteredFaq.length})</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="cursor-pointer font-medium text-[#4285F4] transition-colors hover:text-[#1A73E8] hover:underline"
            >
              Expand All
            </button>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={collapseAll}
              className="cursor-pointer font-medium text-gray-500 transition-colors hover:text-gray-800 hover:underline"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Accordion Questions List */}
        <div className="mt-6 space-y-8">
          {filteredFaq.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 border-dashed bg-white p-8 text-center sm:p-12">
              <HelpCircle className="mx-auto h-10 w-10 text-gray-300" />
              <h3 className="mt-3 font-bold font-google text-base text-gray-900">No matching questions found</h3>
              <p className="mx-auto mt-1 max-w-sm text-gray-500 text-xs">
                We couldn&apos;t find any answers matching &ldquo;{searchQuery}&rdquo;. Try another search term or ask us on Discord.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 font-medium text-gray-700 text-xs hover:bg-gray-100"
                >
                  Clear Search
                </button>
                <a
                  href="https://discord.gg/sJUmrEHs7B"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#5865F2] px-3.5 py-1.5 font-medium text-white text-xs hover:bg-[#4752C4]"
                >
                  <DiscordSvg className="h-3.5 w-3.5" />
                  <span>Ask on Discord</span>
                </a>
              </div>
            </div>
          ) : (
            groupedFaqs.map((group) => {
              const catMeta = CATEGORIES.find((c) => c.id === group.categoryId);
              const CatIcon = catMeta?.icon ?? HelpCircle;

              return (
                <section key={group.categoryId} className="space-y-3">
                  {/* Category Header (when viewing 'All', display section headers) */}
                  {selectedCategory === "all" && (
                    <div className="flex items-center gap-2 pt-2">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-md"
                        style={{ backgroundColor: `${catMeta?.color ?? "#4285F4"}15` }}
                      >
                        <CatIcon className="h-3.5 w-3.5" style={{ color: catMeta?.color ?? "#4285F4" }} />
                      </div>
                      <h2 className="font-bold font-google text-gray-900 text-sm tracking-tight sm:text-base">{group.label}</h2>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {group.items.map((item) => {
                      const isOpen = Boolean(openItems[item.id]);

                      return (
                        <div
                          key={item.id}
                          id={item.id}
                          className={`group overflow-hidden rounded-2xl border transition-all duration-200 ${
                            isOpen
                              ? "border-[#4285F4]/40 bg-white shadow-xs"
                              : "border-gray-200/80 bg-white hover:border-gray-300 hover:shadow-2xs"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            className="flex w-full cursor-pointer items-start justify-between gap-4 p-4 text-left sm:p-5"
                            aria-expanded={isOpen}
                          >
                            <span
                              className={`font-google font-semibold text-sm leading-snug sm:text-base ${
                                isOpen ? "text-[#1A73E8]" : "text-gray-900 group-hover:text-[#4285F4]"
                              }`}
                            >
                              {item.question}
                            </span>
                            <div
                              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                                isOpen
                                  ? "rotate-180 bg-[#4285F4]/10 text-[#4285F4]"
                                  : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
                              }`}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeInOut" }}
                              >
                                <div className="border-gray-100 border-t px-4 pt-3.5 pb-5 sm:px-5">
                                  <div className="text-gray-600 text-sm leading-relaxed sm:text-[15px]">
                                    {item.answerText.split("\n").map((line, idx) => (
                                      <p key={`${item.id}-${line}`} className={idx > 0 ? "mt-2" : ""}>
                                        {line}
                                      </p>
                                    ))}
                                  </div>

                                  {item.renderCustomContent?.(() => setIsCodeOfConductOpen(true))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-14 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs sm:p-8 md:p-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#4285F4]/10 px-3 py-1 font-semibold text-[#1A73E8] text-xs">
                <span>We&apos;re here to help</span>
              </div>
              <h3 className="mt-2.5 font-bold font-google text-gray-900 text-xl tracking-tight sm:text-2xl">
                Still have questions about DevFest?
              </h3>
              <p className="mt-2 text-gray-600 text-xs leading-relaxed sm:text-sm">
                Our organizers and mentors are active on Discord and via email. Ask anything about project rules, teams, or travel logistics!
              </p>
            </div>

            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a
                href="https://discord.gg/sJUmrEHs7B"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#5865F2] px-5 py-3 font-semibold text-white text-xs shadow-xs transition-colors hover:bg-[#4752C4] sm:text-sm"
              >
                <DiscordSvg className="h-4 w-4" />
                <span>Join Discord Community</span>
              </a>
              <a
                href="mailto:ucsc.dsc@gmail.com"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 text-xs shadow-2xs transition-colors hover:bg-gray-50 hover:text-gray-900 sm:text-sm"
              >
                <Mail className="h-4 w-4 text-[#EA4335]" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick link to Code of Conduct Modal in the page */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-gray-500 text-xs sm:flex-row">
          <span>Need to review our event safety guidelines?</span>
          <button
            type="button"
            onClick={() => setIsCodeOfConductOpen(true)}
            className="cursor-pointer font-medium text-[#4285F4] underline underline-offset-2 hover:text-[#1A73E8]"
          >
            View Code of Conduct
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-gray-200/80 border-t bg-white py-8 text-center text-gray-500 text-xs">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <GdgLogoSvg className="h-4 w-auto" />
            <span className="font-semibold text-gray-800">Google Developer Groups on Campus @ UCSC</span>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <Link href="/" className="transition-colors hover:text-[#4285F4]">
              Register
            </Link>
            <span>•</span>
            <button type="button" onClick={() => setIsCodeOfConductOpen(true)} className="cursor-pointer transition-colors hover:text-[#4285F4]">
              Code of Conduct
            </button>
            <span>•</span>
            <a
              href="https://www.instagram.com/gdgc_ucsc/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#4285F4]"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* Code of Conduct Modal / Dialog - Highly mobile friendly with internal scrolling & lock */}
      <AnimatePresence>
        {isCodeOfConductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCodeOfConductOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="code-of-conduct-title"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between border-gray-100 border-b px-5 py-4 sm:px-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#4285F4]/10 text-[#4285F4]">
                      <ShieldAlert className="h-4 w-4" />
                    </span>
                    <h2 id="code-of-conduct-title" className="font-bold font-google text-gray-900 text-lg sm:text-xl">
                      Code of Conduct
                    </h2>
                  </div>
                  <p className="mt-1 text-gray-500 text-xs">DevFest @ UC Santa Cruz • Google Developer Groups on Campus</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCodeOfConductOpen(false)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Close dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="flex-1 overflow-y-auto px-5 py-5 text-gray-700 text-xs sm:px-6 sm:text-sm">
                <p className="leading-relaxed">
                  All participants, organizers, mentors, judges, and sponsors of this hackathon are expected to uphold the following Code of
                  Conduct. We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone.
                </p>

                {/* Expected Behavior */}
                <div className="mt-5 rounded-xl border border-green-200/80 bg-green-50/50 p-4">
                  <h3 className="font-bold font-google text-green-900 text-sm sm:text-base">Expected Behavior</h3>
                  <ul className="mt-2.5 space-y-1.5 pl-1 text-green-950">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#34A853]">•</span>
                      <span>Be respectful, considerate, and collaborative.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#34A853]">•</span>
                      <span>Treat all participants with dignity, regardless of background, identity, or experience level.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#34A853]">•</span>
                      <span>Communicate professionally and constructively.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#34A853]">•</span>
                      <span>Respect differing viewpoints and ideas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#34A853]">•</span>
                      <span>Follow all hackathon rules and Devpost guidelines.</span>
                    </li>
                  </ul>
                </div>

                {/* Unacceptable Behavior */}
                <div className="mt-4 rounded-xl border border-red-200/80 bg-red-50/50 p-4">
                  <h3 className="font-bold font-google text-red-900 text-sm sm:text-base">Unacceptable Behavior</h3>
                  <ul className="mt-2.5 space-y-1.5 pl-1 text-red-950">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#EA4335]">•</span>
                      <span>Harassment, discrimination, or exclusionary behavior of any kind.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#EA4335]">•</span>
                      <span>
                        Offensive comments related to gender, gender identity, sexual orientation, disability, physical appearance, race,
                        ethnicity, nationality, religion, or age.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#EA4335]">•</span>
                      <span>Intimidation, threats, or disruptive behavior.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#EA4335]">•</span>
                      <span>Plagiarism, cheating, or misrepresentation of work.</span>
                    </li>
                  </ul>
                </div>

                {/* Reporting & Enforcement */}
                <div className="mt-5 space-y-2.5">
                  <h4 className="font-bold font-google text-gray-900 text-xs sm:text-sm">Reporting &amp; Enforcement</h4>
                  <p className="text-gray-600 leading-relaxed">
                    If you experience or witness behavior that violates this Code of Conduct, please report it to the hackathon organizers. All
                    reports will be handled confidentially and taken seriously.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Organizers reserve the right to take any action deemed appropriate, including warnings, disqualification, or removal from the
                    event, to ensure a safe and positive environment.
                  </p>
                </div>

                {/* Contact Box */}
                <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-3.5">
                  <div>
                    <span className="block font-semibold text-gray-900 text-xs">Have an immediate concern?</span>
                    <span className="text-[11px] text-gray-500">Tell any mentor at the event, or email us.</span>
                  </div>
                  <a
                    href="mailto:ucsc.dsc@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-medium text-gray-700 text-xs shadow-2xs hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#EA4335]" />
                    <span>ucsc.dsc@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end border-gray-100 border-t bg-gray-50/50 px-5 py-3 sm:px-6">
                <button
                  type="button"
                  onClick={() => setIsCodeOfConductOpen(false)}
                  className="cursor-pointer rounded-xl bg-gray-900 px-4 py-2 font-medium text-white text-xs transition-colors hover:bg-gray-800"
                >
                  I Understand &amp; Agree
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
