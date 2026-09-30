"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { type FC, type FormEvent, useState } from "react";

interface ApplicationFormViewProps {
  onSignOut: () => void;
  userEmail?: string;
}

export const ApplicationFormView: FC<ApplicationFormViewProps> = ({ userEmail = "student@ucsc.edu" }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Alex Rivera",
    university: "UC Santa Cruz",
    gradYear: "2027",
    track: "ai-gemini",
    teamStatus: "looking",
    githubUrl: "https://github.com/",
    linkedinUrl: "https://linkedin.com/in/",
    tshirtSize: "L",
    dietary: "none",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full max-w-lg"
    >
      {/* Authed Status Pill */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#34A853]/20 bg-[#E6F4EA] px-3 py-1 font-medium text-[#1E8E3E] text-xs">
        <span className="h-2 w-2 rounded-full bg-[#34A853]" />
        <span>Connected as {userEmail}</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-extrabold font-google text-2xl text-gray-900 tracking-tight sm:text-3xl">Hackathon Application</h2>
          <p className="mt-1 text-gray-500 text-sm">Complete your registration for Google DevFest 2026.</p>
        </div>
        <div className="hidden items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 font-mono text-gray-600 text-xs sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-[#FBBC05]" />
          <span>Priority Review</span>
        </div>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-3 rounded-2xl border border-[#4285F4]/30 bg-[#E8F0FE] p-6 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#4285F4] text-white shadow-md">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-bold font-google text-gray-900 text-lg">Application Submitted!</h3>
          <p className="mx-auto max-w-sm text-gray-600 text-xs">
            We’ve received your registration for Google DevFest 2026. Keep an eye on{" "}
            <span className="font-semibold text-gray-800">{userEmail}</span> for team matching and workshop access.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mx-auto block pt-2 font-semibold text-[#1A73E8] text-xs hover:underline"
          >
            Edit your application
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-h-[58vh] space-y-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="mb-1 block font-medium text-gray-700 text-xs">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              />
            </div>
            <div>
              <label htmlFor="university" className="mb-1 block font-medium text-gray-700 text-xs">
                University / College
              </label>
              <input
                id="university"
                type="text"
                required
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="track" className="mb-1 block font-medium text-gray-700 text-xs">
                Preferred Track
              </label>
              <select
                id="track"
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              >
                <option value="ai-gemini">AI & Gemini API</option>
                <option value="cloud-devops">Google Cloud & Infra</option>
                <option value="mobile-flutter">Mobile & Flutter</option>
                <option value="social-good">Open Source & Social Impact</option>
              </select>
            </div>
            <div>
              <label htmlFor="gradYear" className="mb-1 block font-medium text-gray-700 text-xs">
                Graduation Year
              </label>
              <select
                id="gradYear"
                value={formData.gradYear}
                onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028+</option>
                <option value="grad">Graduate / Master's</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="githubUrl" className="mb-1 block font-medium text-gray-700 text-xs">
                GitHub Profile
              </label>
              <input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 font-mono text-sm text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              />
            </div>
            <div>
              <label htmlFor="teamStatus" className="mb-1 block font-medium text-gray-700 text-xs">
                Team Status
              </label>
              <select
                id="teamStatus"
                value={formData.teamStatus}
                onChange={(e) => setFormData({ ...formData, teamStatus: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              >
                <option value="looking">Looking for teammates</option>
                <option value="formed">Have a team (code ready)</option>
                <option value="solo">Hacking solo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="tshirtSize" className="mb-1 block font-medium text-gray-700 text-xs">
                T-Shirt Size
              </label>
              <select
                id="tshirtSize"
                value={formData.tshirtSize}
                onChange={(e) => setFormData({ ...formData, tshirtSize: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              >
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div>
              <label htmlFor="dietary" className="mb-1 block font-medium text-gray-700 text-xs">
                Dietary Preference
              </label>
              <select
                id="dietary"
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4285F4]/40"
              >
                <option value="none">No Restrictions</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="halal">Halal</option>
                <option value="kosher">Kosher</option>
                <option value="gluten-free">Gluten-Free</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4285F4] px-4 py-3 font-semibold text-sm text-white shadow-md transition-all hover:bg-[#1a73e8]"
          >
            <span>Submit Hackathon Application</span>
            <Send className="h-4 w-4" />
          </motion.button>
        </form>
      )}
    </motion.div>
  );
};
