import React from 'react'

function Mark({ className = "h-9 w-9" }) {
  return (
    <span className={`${className} inline-flex items-center justify-center rounded-md bg-[#0F2A43]`}>
      <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" aria-hidden="true">
        <path d="M3 11.5 21 3l-5.2 18-4.1-7.1z" fill="#F5B800" />
        <path d="m11.7 13.9 9.3-10.9" stroke="#0F2A43" strokeWidth="1.4" fill="none" />
      </svg>
    </span>
  );
}

function LandingPage() {
  return (
    <div className="rp-chart min-h-screen w-full min-w-full bg-[#F2F5F7] text-[#0F2A43]">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <h1 className="flex items-center gap-2.5 font-display text-3xl font-bold tracking-tight">
          <Mark />
          ResumePilot
        </h1>

        <div className="flex items-center gap-5 text-[15px] font-medium sm:gap-8">
          <a href="#features" className="hidden transition hover:text-[#5B7083] sm:inline">Features</a>
          <a href="#how-it-works" className="hidden transition hover:text-[#5B7083] sm:inline">How it works</a>
          <a href="/login" className="transition hover:text-[#5B7083]">Login</a>

          <a
            href="/register"
            className="rounded-md bg-[#0F2A43] px-5 py-2.5 font-semibold text-white
                       transition hover:bg-[#173F63]"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-28 pt-14 lg:grid-cols-[1.1fr_0.9fr]">

        <div>
          <p className="mb-5 text-base font-medium text-[#5B7083]">
            Interview preparation workspace
          </p>

          <h2 className="max-w-xl font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            Turn your experience into interview readiness.
          </h2>

          <p className="mt-7 max-w-lg text-lg leading-8 text-[#4A6073]">
            Create a professional resume, analyze your compatibility with
            job descriptions, identify skill gaps, and prepare for interviews
            with AI.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/register"
              className="rounded-md bg-[#0F2A43] px-7 py-3.5 font-semibold text-white
                         transition hover:bg-[#173F63]"
            >
              Build My Resume
            </a>

            <a
              href="#how-it-works"
              className="rounded-md border-2 border-[#0F2A43] px-7 py-3 font-semibold
                         transition hover:bg-[#0F2A43] hover:text-white"
            >
              See How It Works
            </a>
          </div>
        </div>

        {/* Sample boarding-pass report */}
        <div
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md rotate-[1.5deg] overflow-hidden rounded-lg border-2 border-[#0F2A43] bg-white shadow-[8px_8px_0_#0F2A43]"
        >
          <div className="flex items-center justify-between bg-[#0F2A43] px-6 py-4 text-white">
            <span className="font-display text-2xl font-semibold">Interview report</span>
            <span className="text-sm font-medium text-[#F5B800]">Sample</span>
          </div>

          <div className="px-6 pb-6 pt-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-[#5B7083]">Target role</p>
                <p className="font-display text-2xl font-semibold leading-tight">Product Engineer</p>
                <p className="text-sm text-[#4A6073]">Lumen Labs</p>
              </div>
              <div className="text-right">
                <p className="font-display text-7xl font-bold leading-none">82</p>
                <p className="text-sm text-[#5B7083]">out of 100</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-sm bg-[#DDE8F0]">
              <div className="h-full w-[82%] bg-[#0F2A43]" />
            </div>

            <p className="mb-3 mt-7 text-sm font-semibold text-[#5B7083]">Skill gaps to close</p>
            <ul className="space-y-2.5 text-[15px]">
              <li className="flex items-center gap-3 text-[#1F8A5B] line-through">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-[#1F8A5B] text-xs text-white no-underline">✓</span>
                React performance tuning
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-sm border-2 border-[#9FB3C3]" />
                SQL indexing basics
              </li>
              <li className="flex items-center gap-3">
                <span className="h-5 w-5 rounded-sm border-2 border-[#9FB3C3]" />
                Telling project stories clearly
              </li>
            </ul>
          </div>

          <div className="relative border-t-2 border-dashed border-[#B9C8D4] px-6 py-4">
            <span className="absolute -left-[11px] -top-[11px] h-5 w-5 rounded-full border-2 border-[#0F2A43] bg-[#F2F5F7]" />
            <span className="absolute -right-[11px] -top-[11px] h-5 w-5 rounded-full border-2 border-[#0F2A43] bg-[#F2F5F7]" />
            <div className="rp-barcode h-9 w-full opacity-90" />
            <p className="mt-2 text-xs text-[#5B7083]">7-day preparation plan included</p>
          </div>
        </div>

      </section>

      {/* Features */}
      <section id="features" className="border-y border-[#C9D6E0] bg-white px-6 py-24">

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr]">

          <h2 className="max-w-xs font-display text-5xl font-bold leading-[0.98] tracking-tight">
            Everything you need to prepare for your next job
          </h2>

          <div className="border-b border-[#C9D6E0]">

            <FeatureCard
              title="Resume Builder"
              description="Create a professional, structured resume tailored to your career goals."
            />

            <FeatureCard
              title="Job Match Analysis"
              description="Compare your resume against a job description and discover your compatibility score."
            />

            <FeatureCard
              title="AI Interview Prep"
              description="Get technical questions, behavioral questions, skill gaps, and a personalized preparation plan."
            />

          </div>
        </div>

      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">

        <h2 className="font-display text-5xl font-bold tracking-tight">
          How it works
        </h2>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">

          <div
            aria-hidden="true"
            className="absolute left-4 top-4 hidden border-t-2 border-dashed border-[#9FB3C3] md:right-[33.333%] md:block"
          />

          <Step
            number="1"
            title="Create your resume"
            description="Add your education, skills, projects and experience."
          />

          <Step
            number="2"
            title="Add the job description"
            description="Tell us about the role you're targeting."
          />

          <Step
            number="3"
            title="Get AI insights"
            description="Discover your match score, skill gaps and personalized interview preparation."
            last
          />

        </div>

      </section>

      {/* CTA */}
      <section className="rp-chart-dark bg-[#0F2A43] px-6 py-24 text-white">

        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl">
              Ready to land your next opportunity?
            </h2>

            <p className="mt-5 max-w-xl text-lg text-[#B8C9D6]">
              Build your resume and start preparing smarter today.
            </p>
          </div>

          <a
            href="/register"
            className="inline-block shrink-0 rounded-md bg-[#F5B800]
                       px-8 py-4 text-lg font-semibold text-[#0F2A43]
                       transition hover:bg-[#FFCB2E]"
          >
            Get Started — It's Free
          </a>
        </div>

      </section>

    </div>
  );
}


function FeatureCard({ title, description }) {
  return (
    <div className="grid gap-2 border-t border-[#C9D6E0] py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
      <h3 className="font-display text-3xl font-semibold leading-tight">{title}</h3>

      <p className="max-w-md text-lg leading-7 text-[#4A6073]">
        {description}
      </p>
    </div>
  );
}


function Step({ number, title, description, last = false }) {
  return (
    <div className="relative">
      <span
        className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full font-display text-lg font-bold ${
          last ? "bg-[#F5B800] text-[#0F2A43]" : "bg-[#0F2A43] text-white"
        }`}
      >
        {number}
      </span>

      <h3 className="mt-5 font-display text-3xl font-semibold leading-tight">
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-lg leading-7 text-[#4A6073]">
        {description}
      </p>
    </div>
  );
}

export default LandingPage;
