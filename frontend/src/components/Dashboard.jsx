import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getMeFunc,
    updateSkillCompletion
} from "./Api/api";
import LoadingScreen from "./LoadingScreen";
import { hooksFunc } from "../hooks/hooks";

function Mark({ className = "h-10 w-10" }) {
    return (
        <span className={`${className} inline-flex items-center justify-center rounded-md bg-[#F5B800]`}>
            <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" aria-hidden="true">
                <path d="M3 11.5 21 3l-5.2 18-4.1-7.1z" fill="#0F2A43" />
                <path d="m11.7 13.9 9.3-10.9" stroke="#F5B800" strokeWidth="1.4" fill="none" />
            </svg>
        </span>
    );
}

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openReportId, setOpenReportId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { handleLogout } = hooksFunc();

    const [completedSkills, setCompletedSkills] = useState(() => {
    try {
        return JSON.parse(
            localStorage.getItem("completedSkills") || "{}"
        );
    } catch {
        return {};
    }
});

function toggleSkill(reportId, skillId) {
    const key = `${reportId}-${skillId}`;

    setCompletedSkills((prev) => {
        const updated = {
            ...prev,
            [key]: !prev[key],
        };

        localStorage.setItem(
            "completedSkills",
            JSON.stringify(updated)
        );

        return updated;
    });
}

    async function handleDashboardLogout() {
        setIsLoggingOut(true);
        await handleLogout();
        navigate("/login");
    }

    useEffect(() => {
        async function getDetails() {
            try {
                const response = await getMeFunc();
                const userData = response?.user ?? null;

                setUser(userData);
            } catch (err) {
                // console.error("Error fetching dashboard:", err);
                setError("Unable to load your dashboard. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        getDetails();
    }, []);

    if (loading) {
        return (
            <LoadingScreen
                title="Loading your dashboard"
                message="We are gathering your reports and preparation progress."
            />
        );
    }

    if (error) {
        return (
            <div className="rp-chart flex min-h-screen w-full items-center justify-center bg-[#F2F5F7] px-4 text-[#0F2A43]">
                <div className="w-full max-w-md overflow-hidden rounded-lg border-2 border-[#0F2A43] bg-white text-center shadow-[8px_8px_0_#0F2A43]">
                    <div className="bg-[#C8372D] px-6 py-3 font-display text-xl font-semibold text-white">
                        Something went wrong
                    </div>
                    <div className="p-8">
                        <p className="mb-6 text-[#A52A22]">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-md bg-[#0F2A43] px-6 py-3 font-semibold text-white transition hover:bg-[#173F63]"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="rp-chart flex min-h-screen w-full items-center justify-center bg-[#F2F5F7] px-4 py-10 text-[#0F2A43]">
                <div className="w-full max-w-md overflow-hidden rounded-lg border-2 border-[#0F2A43] bg-white text-center shadow-[8px_8px_0_#0F2A43]">
                    <div className="bg-[#0F2A43] px-6 py-8">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B800] font-display text-3xl font-bold text-[#0F2A43]">
                            !
                        </div>
                    </div>
                    <div className="p-8">
                        <p className="mb-1 text-sm font-medium text-[#5B7083]">
                            Access required
                        </p>
                        <h1 className="font-display text-4xl font-bold">Login Required</h1>
                        <p className="mt-3 text-[15px] leading-6 text-[#4A6073]">
                            Please log in to view your interview reports and preparation progress.
                        </p>
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="mt-7 w-full rounded-md bg-[#0F2A43] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#173F63] focus:outline-none focus:ring-2 focus:ring-[#F5B800]"
                        >
                            Go to login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const reports = [...(user.reports ?? [])].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const filteredReports = reports.filter((report) =>
        (report.title || "Interview Analysis")
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
    );

    const averageScore = reports.length
        ? Math.round(
              reports.reduce(
                  (total, report) => total + (Number(report.overall_score) || 0),
                  0
              ) / reports.length
          )
        : 0;

    const totalQuestions = reports.reduce(
        (total, report) =>
            total +
            (report.technical_questions?.length ?? 0) +
            (report.behavioral_questions?.length ?? 0),
        0
    );

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Date unavailable";
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const severityStyle = {
        low: "bg-[#EAF6EF] text-[#17694A] border-[#1F8A5B]/30",
        medium: "bg-[#FFF5D6] text-[#8A5A00] border-[#C27A00]/30",
        high: "bg-[#FCEAE8] text-[#A52A22] border-[#C8372D]/30",
    };

    const sectionStyle =
        "bg-white border border-[#D5E0E8] rounded-md p-4 sm:p-5";

    const detailsAnswerStyle =
        "px-4 pb-4 space-y-4 opacity-0 -translate-y-1 transition-all duration-300 ease-out group-open:opacity-100 group-open:translate-y-0";

    return (
        <div className="dashboard-shell rp-chart min-h-screen w-full bg-[#F2F5F7] text-[#0F2A43]">
            {/* Navbar */}
            <header className="bg-[#0F2A43] text-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Mark />
                        <div>
                            <h1 className="font-display text-2xl font-bold leading-none tracking-tight">
                                ResumePilot
                            </h1>
                            <p className="mt-1 hidden text-xs text-[#8CA3B5] sm:block">
                                Your career preparation workspace
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/ai/generate-report")}
                            className="inline-flex items-center gap-2 rounded-md bg-[#F5B800] px-4 py-2.5 text-sm font-semibold text-[#0F2A43] transition hover:bg-[#FFCB2E] focus:outline-none focus:ring-2 focus:ring-white/60"
                        >
                            <span aria-hidden="true" className="text-lg leading-none">+</span>
                            Create report
                        </button>
                        <button
                            type="button"
                            onClick={handleDashboardLogout}
                            disabled={isLoggingOut}
                            className="rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white disabled:cursor-wait disabled:opacity-60"
                        >
                            {isLoggingOut ? "Signing out..." : "Logout"}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
                {/* Welcome */}
                <section className="mb-10">
                    <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
                        Welcome back, {user.username || "Candidate"}!
                    </h2>
                    <p className="mt-5 max-w-2xl text-lg leading-7 text-[#4A6073]">
                        Track your interview preparation, review AI-generated
                        reports, and identify the skills you need to improve.
                    </p>
                </section>

                {/* Profile + Statistics */}
                <section className="mb-14 grid gap-px overflow-hidden rounded-lg bg-white/15 text-white sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
                    {/* Profile */}
                    <div className="flex items-center gap-4 bg-[#0F2A43] p-6">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-[#F5B800] font-display text-4xl font-bold text-[#0F2A43]">
                            {(user.username || "U").charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h3 className="font-display text-2xl font-semibold leading-tight">
                                {user.username || "User"}
                            </h3>
                            <p className="mt-1 break-all text-sm text-[#9DB3C4]">
                                {user.email || "Email unavailable"}
                            </p>
                            <p className="mt-2 text-xs text-[#9DB3C4]">
                                Total Reports: <span className="font-semibold text-white">{reports.length}</span>
                            </p>
                        </div>
                    </div>

                    {/* Reports generated */}
                    <div className="bg-[#0F2A43] p-6">
                        <p className="text-sm text-[#9DB3C4]">Reports Generated</p>
                        <p className="mt-2 font-display text-6xl font-bold leading-none">
                            {reports.length}
                        </p>
                        <p className="mt-3 text-xs text-[#9DB3C4]">
                            Your saved interview analyses
                        </p>
                    </div>

                    {/* Average score */}
                    <div className="bg-[#0F2A43] p-6">
                        <p className="text-sm text-[#9DB3C4]">Average Score</p>
                        <p className="mt-2 font-display text-6xl font-bold leading-none">
                            {averageScore}
                            <span className="ml-1 text-2xl font-medium text-[#9DB3C4]">/100</span>
                        </p>
                        <div className="mt-4 h-2 overflow-hidden rounded-sm bg-white/15">
                            <div
                                className="h-full bg-[#F5B800] transition-all"
                                style={{ width: `${averageScore}%` }}
                            />
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="bg-[#0F2A43] p-6 sm:col-span-2 lg:col-span-1">
                        <p className="text-sm text-[#9DB3C4]">Interview Questions</p>
                        <p className="mt-2 font-display text-6xl font-bold leading-none">
                            {totalQuestions}
                        </p>
                        <p className="mt-3 text-xs text-[#9DB3C4]">
                            Technical and behavioral questions
                        </p>
                    </div>
                </section>

                {/* Report History */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
                        <div>
                            <h2 className="font-display text-4xl font-bold tracking-tight">
                                Your Interview Reports
                            </h2>
                            <p className="mt-2 text-[#4A6073]">
                                Review your previous analyses and preparation plans.
                            </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                            <label htmlFor="report-search" className="text-xs font-medium text-[#5B7083]">
                                Search by title
                            </label>
                            <input
                                id="report-search"
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search reports..."
                                className="w-full rounded-md border border-[#B9C8D4] bg-white px-3 py-2.5 text-sm text-[#0F2A43] outline-none transition placeholder:text-[#7F93A3] focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50 sm:w-72"
                            />
                        </div>
                    </div>

                    {reports.length === 0 ? (
                        <div className="rounded-lg border-2 border-dashed border-[#9FB3C3] bg-white/70 px-6 py-16 text-center">
                            <div className="mb-5 flex justify-center">
                                <Mark className="h-14 w-14" />
                            </div>
                            <h3 className="font-display text-3xl font-semibold">
                                No reports yet
                            </h3>
                            <p className="mx-auto mt-2 max-w-md text-[#4A6073]">
                                Your generated interview analyses will appear here
                                once you create your first report.
                            </p>
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className="rounded-lg border-2 border-dashed border-[#9FB3C3] bg-white/70 px-6 py-12 text-center">
                            <h3 className="font-display text-3xl font-semibold">
                                No matching reports
                            </h3>
                            <p className="mt-2 text-[#4A6073]">
                                Try a different title search.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredReports.map((report, index) => (
                                <article
                                    key={report._id || index}
                                    className="relative overflow-hidden rounded-lg border border-[#B9C8D4] bg-white transition-colors hover:border-[#0F2A43]"
                                >
                                    {/* Ticket: main + stub */}
                                    <div className="flex flex-col md:flex-row">
                                        {/* Report header */}
                                        <div className="min-w-0 flex-1 p-5 sm:p-7">
                                            <p className="mb-1 text-sm font-medium text-[#5B7083]">
                                                Report {filteredReports.length - index}
                                            </p>
                                            <h3 className="break-words font-display text-3xl font-semibold leading-tight">
                                                {report.title || "Interview Analysis"}
                                            </h3>
                                            <p className="mt-2 text-[15px] text-[#4A6073]">
                                                Created on{" "}
                                                {formatDate(report.createdAt)}
                                            </p>
                                            {report.resumeFile?.storedName && (
                                                <a
                                                    href={`http://localhost:3000/ai/reports/${report._id}/resume`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A43] underline decoration-[#F5B800] decoration-2 underline-offset-4 transition hover:text-[#173F63]"
                                                >
                                                    View submitted resume
                                                    <span aria-hidden="true">↗</span>
                                                </a>
                                            )}

                                            <div className="mt-6 flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-2 rounded-sm border border-[#C9D6E0] bg-[#F8FAFB] px-3 py-1.5 text-xs font-medium text-[#27415A]">
                                                    <span className="h-2 w-2 rounded-full bg-[#2F6F9F]" />
                                                    {report.technical_questions?.length ?? 0} Technical
                                                </span>
                                                <span className="inline-flex items-center gap-2 rounded-sm border border-[#C9D6E0] bg-[#F8FAFB] px-3 py-1.5 text-xs font-medium text-[#27415A]">
                                                    <span className="h-2 w-2 rounded-full bg-[#0E8A8A]" />
                                                    {report.behavioral_questions?.length ?? 0} Behavioral
                                                </span>
                                                <span className="inline-flex items-center gap-2 rounded-sm border border-[#C9D6E0] bg-[#F8FAFB] px-3 py-1.5 text-xs font-medium text-[#27415A]">
                                                    <span className="h-2 w-2 rounded-full bg-[#C27A00]" />
                                                    {report.skill_gaps?.length ?? 0} Skill Gaps
                                                </span>
                                            </div>
                                        </div>

                                        {/* Score stub */}
                                        <div className="relative flex flex-col justify-center border-t-2 border-dashed border-[#B9C8D4] bg-[#F8FAFB] p-5 sm:p-7 md:w-60 md:shrink-0 md:border-l-2 md:border-t-0">
                                            <span aria-hidden="true" className="absolute -left-[11px] -top-[11px] h-5 w-5 rounded-full border border-[#B9C8D4] bg-[#F2F5F7] md:-left-[11px] md:-top-[11px]" />
                                            <span aria-hidden="true" className="absolute -right-[11px] -top-[11px] h-5 w-5 rounded-full border border-[#B9C8D4] bg-[#F2F5F7] md:-bottom-[11px] md:-left-[11px] md:right-auto md:top-auto" />

                                            <p className="text-sm font-medium text-[#5B7083]">
                                                Overall score
                                            </p>
                                            <p className="mt-1 font-display text-6xl font-bold leading-none">
                                                {Number(report.overall_score) || 0}
                                                <span className="ml-1 text-xl font-medium text-[#5B7083]">
                                                    /100
                                                </span>
                                            </p>

                                            <div className="mt-4 h-2 w-full overflow-hidden rounded-sm bg-[#DDE8F0]">
                                                <div
                                                    className="h-full bg-[#0F2A43]"
                                                    style={{
                                                        width: `${Math.min(
                                                            100,
                                                            Math.max(
                                                                0,
                                                                Number(report.overall_score) || 0
                                                            )
                                                        )}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expandable report details */}
                                    <div className="group border-t border-[#C9D6E0]">
                                        <button
                                            type="button"
                                            aria-expanded={openReportId === (report._id || index)}
                                            onClick={() => {
                                                const reportId = report._id || index;
                                                setOpenReportId(
                                                    openReportId === reportId ? null : reportId
                                                );
                                            }}
                                            className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#F2F5F7] sm:px-7"
                                        >
                                            <span className="text-sm font-semibold text-[#0F2A43]">
                                                View full report
                                            </span>
                                            <span className={`text-[#0F2A43] transition-transform duration-300 ${openReportId === (report._id || index) ? "rotate-180" : ""}`}>
                                                ↓
                                            </span>
                                        </button>

                                        <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openReportId === (report._id || index) ? "max-h-[20000px]" : "max-h-0"}`}>
                                            <div className="space-y-5 border-t border-[#C9D6E0] bg-[#F2F5F7] px-5 pb-7 pt-6 sm:px-7">
                                            {/* Job Description */}
                                            <details className={`${sectionStyle} group`}>
                                                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
                                                    Job Description
                                                    <span aria-hidden="true" className="text-base text-[#5B7083] transition-transform group-open:rotate-180">↓</span>
                                                </summary>
                                                <p className="mt-3 whitespace-pre-wrap border-l-2 border-[#D5E0E8] pl-4 text-[15px] leading-7 text-[#4A6073] opacity-0 -translate-y-1 transition-all duration-300 ease-out group-open:opacity-100 group-open:translate-y-0">
                                                    {report.job_desc || "No job description available."}
                                                </p>
                                            </details>

                                            {/* Technical Questions */}
                                            <div className={sectionStyle}>
                                                <h4 className="mb-4 flex items-center gap-2.5 font-display text-xl font-semibold">
                                                    <span className="h-5 w-1.5 rounded-sm bg-[#2F6F9F]" />
                                                    Technical Questions
                                                </h4>

                                                {report.technical_questions?.length ? (
                                                    <div className="space-y-3">
                                                        {report.technical_questions.map((item, i) => (
                                                            <details
                                                                key={item._id || i}
                                                                className="group rounded-md border border-[#D5E0E8] bg-[#F8FAFB] open:bg-white"
                                                            >
                                                                <summary className="flex cursor-pointer list-none gap-3 p-4 text-[15px] font-medium leading-6 [&::-webkit-details-marker]:hidden">
                                                                    <span className="shrink-0 font-display text-lg font-semibold text-[#2F6F9F]">
                                                                        Q{i + 1}.
                                                                    </span>
                                                                    {item.question}
                                                                </summary>
                                                                <div className={detailsAnswerStyle}>
                                                                    <div>
                                                                        <p className="mb-1 text-sm font-semibold text-[#5B7083]">
                                                                            Intention
                                                                        </p>
                                                                        <p className="border-l-2 border-[#D5E0E8] pl-4 text-[15px] leading-7 text-[#27415A]">
                                                                            {item.intention || "Not specified"}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-1 text-sm font-semibold text-[#5B7083]">
                                                                            Suggested Answer
                                                                        </p>
                                                                        <p className="whitespace-pre-wrap border-l-2 border-[#D5E0E8] pl-4 text-[15px] leading-7 text-[#27415A]">
                                                                            {item.answer || "No answer available"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </details>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-[#5B7083]">
                                                        No technical questions available.
                                                    </p>
                                                )}
                                            </div>

                                            {/* Behavioral Questions */}
                                            <div className={sectionStyle}>
                                                <h4 className="mb-4 flex items-center gap-2.5 font-display text-xl font-semibold">
                                                    <span className="h-5 w-1.5 rounded-sm bg-[#0E8A8A]" />
                                                    Behavioral Questions
                                                </h4>

                                                {report.behavioral_questions?.length ? (
                                                    <div className="space-y-3">
                                                        {report.behavioral_questions.map((item, i) => (
                                                            <details
                                                                key={item._id || i}
                                                                className="group rounded-md border border-[#D5E0E8] bg-[#F8FAFB] open:bg-white"
                                                            >
                                                                <summary className="flex cursor-pointer list-none gap-3 p-4 text-[15px] font-medium leading-6 [&::-webkit-details-marker]:hidden">
                                                                    <span className="shrink-0 font-display text-lg font-semibold text-[#0E8A8A]">
                                                                        Q{i + 1}.
                                                                    </span>
                                                                    {item.question}
                                                                </summary>
                                                                <div className={detailsAnswerStyle}>
                                                                    <div>
                                                                        <p className="mb-1 text-sm font-semibold text-[#5B7083]">
                                                                            Intention
                                                                        </p>
                                                                        <p className="border-l-2 border-[#D5E0E8] pl-4 text-[15px] leading-7 text-[#27415A]">
                                                                            {item.intention || "Not specified"}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="mb-1 text-sm font-semibold text-[#5B7083]">
                                                                            Suggested Answer
                                                                        </p>
                                                                        <p className="whitespace-pre-wrap border-l-2 border-[#D5E0E8] pl-4 text-[15px] leading-7 text-[#27415A]">
                                                                            {item.answer || "No answer available"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </details>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-[#5B7083]">
                                                        No behavioral questions available.
                                                    </p>
                                                )}
                                            </div>

{/* Skill Gaps */}
<div className={sectionStyle}>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
            <h4 className="flex items-center gap-2.5 font-display text-xl font-semibold">
                <span className="h-5 w-1.5 rounded-sm bg-[#C27A00]" />
                Skill Gaps
            </h4>
            <p className="mt-1 text-sm text-[#5B7083]">
                Check off the skills you have mastered.
            </p>
        </div>

        <span className="text-sm font-medium text-[#27415A]">
            {report.skill_gaps?.filter(
                (skill) => skill.isCompleted
            ).length || 0}{" "}
            / {report.skill_gaps?.length || 0} completed
        </span>
    </div>

    {report.skill_gaps?.length ? (
        <div className="space-y-3">
            {report.skill_gaps.map((skill, i) => (
                <label
                    key={skill._id || i}
                    className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-all ${
                        skill.isCompleted
                            ? "bg-[#EAF6EF] border-[#1F8A5B]/40"
                            : "bg-white border-[#D5E0E8] hover:border-[#0F2A43]/50"
                    }`}
                >
                    <input
                        type="checkbox"
                        checked={Boolean(skill.isCompleted)}
                        onChange={async (e) => {
                            const isCompleted = e.target.checked;

                            try {
                                await updateSkillCompletion(
                                    report._id,
                                    skill._id,
                                    isCompleted
                                );

                                setUser((prev) => ({
                                    ...prev,
                                    reports: prev.reports.map((r) =>
                                        r._id === report._id
                                            ? {
                                                  ...r,
                                                  skill_gaps: r.skill_gaps.map(
                                                      (s) =>
                                                          s._id === skill._id
                                                              ? {
                                                                    ...s,
                                                                    isCompleted,
                                                                }
                                                              : s
                                                  ),
                                              }
                                            : r
                                    ),
                                }));
                            } catch (error) {
                                // console.error(
                                //     "Failed to update skill completion:",
                                //     error
                                // );
                            }
                        }}
                        className="mt-1 h-4 w-4 accent-[#1F8A5B] cursor-pointer shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h5
                                className={`font-semibold ${
                                    skill.isCompleted
                                        ? "text-[#1F8A5B] line-through"
                                        : "text-[#0F2A43]"
                                }`}
                            >
                                {skill.skill_name}
                            </h5>

                            <span
                                className={`text-xs px-2 py-0.5 rounded-sm border font-medium capitalize ${
                                    severityStyle[skill.severity] ||
                                    severityStyle.low
                                }`}
                            >
                                {skill.severity || "low"} priority
                            </span>
                        </div>

                        <p className="mt-2 text-[15px] leading-6 text-[#4A6073]">
                            {skill.skill_desc ||
                                "No description provided."}
                        </p>

                        {skill.isCompleted && (
                            <p className="mt-2 text-xs font-medium text-[#1F8A5B]">
                                ✓ Skill completed
                            </p>
                        )}
                    </div>
                </label>
            ))}
        </div>
    ) : (
        <p className="text-sm text-[#5B7083]">
            No skill gaps available.
        </p>
    )}

    {/* Progress bar */}
    {report.skill_gaps?.length > 0 && (
        <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm font-medium text-[#5B7083]">
                <span>Preparation progress</span>
                <span>
                    {Math.round(
                        (report.skill_gaps.filter(
                            (skill) => skill.isCompleted
                        ).length /
                            report.skill_gaps.length) *
                            100
                    )}
                    %
                </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-sm bg-[#DDE8F0]">
                <div
                    className="h-full bg-[#1F8A5B] transition-all duration-300"
                    style={{
                        width: `${
                            (report.skill_gaps.filter(
                                (skill) => skill.isCompleted
                            ).length /
                                report.skill_gaps.length) *
                            100
                        }%`,
                    }}
                />
            </div>
        </div>
    )}
</div>
                                            {/* Preparation Plan */}
                                            <div className={sectionStyle}>
                                                <h4 className="mb-5 flex items-center gap-2.5 font-display text-xl font-semibold">
                                                    <span className="h-5 w-1.5 rounded-sm bg-[#1F8A5B]" />
                                                    Preparation Plan
                                                </h4>

                                                {report.preparation_plan?.length ? (
                                                    <div className="relative space-y-4 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-px before:bg-[#C9D6E0] before:content-['']">
                                                        {report.preparation_plan.map((plan, i) => (
                                                            <div
                                                                key={plan._id || i}
                                                                className="relative flex gap-4"
                                                            >
                                                                <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F2A43] font-display text-lg font-bold text-white">
                                                                    {i + 1}
                                                                </div>
                                                                <div className="flex-1 rounded-md border border-[#D5E0E8] bg-[#F8FAFB] p-4">
                                                                    <p className="mb-1 text-sm font-semibold text-[#1F8A5B]">
                                                                        {plan.day}
                                                                    </p>
                                                                    <h5 className="text-base font-semibold">
                                                                        {plan.focus}
                                                                    </h5>
                                                                    {plan.tasks?.length ? (
                                                                        <ul className="mt-3 list-inside list-disc space-y-2 text-[15px] leading-6 text-[#4A6073]">
                                                                            {plan.tasks.map((task, j) => (
                                                                                <li key={j}>{task}</li>
                                                                            ))}
                                                                        </ul>
                                                                    ) : (
                                                                        <p className="mt-2 text-sm text-[#5B7083]">
                                                                            No tasks listed.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-[#5B7083]">
                                                        No preparation plan available.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <footer className="mt-16 border-t border-[#C9D6E0] pb-4 pt-6 text-center text-sm text-[#5B7083]">
                    InterviewPilot · Keep learning. Keep improving.
                </footer>
            </main>
        </div>
    );
}

export default Dashboard;
