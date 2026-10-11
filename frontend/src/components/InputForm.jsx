import React, { useState } from "react";
import { hooksFunc } from "../hooks/hooks.js";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function InputForm() {
    const navigate = useNavigate();
    const [self_desc, setSelfDesc] = useState("");
    const [firm_name, setFirmName] = useState("");
    const [job_desc, setJobDesc] = useState("");
    const [resume, setResume] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const { handleGenerateReport } = hooksFunc();

    async function handleSubmit(e) {
        e.preventDefault();

        setIsGenerating(true);

        try {
            await handleGenerateReport({
                firm_name,
                resume,
                self_desc,
                job_desc
            });
            alert("Report generated successfully...");
            navigate('/dashboard');
        } finally {
            setIsGenerating(false);
        }
    }

    if (isGenerating) {
        return (
            <LoadingScreen
                title="Generating your report"
                message="We are reviewing your profile and preparing tailored interview guidance."
            />
        );
    }

    return (
        <div className="rp-chart flex h-dvh w-full items-center justify-center overflow-hidden bg-[#F2F5F7] p-3 pb-4 pr-4 text-[#0F2A43] sm:p-5 sm:pb-6 sm:pr-7">
            <div className="flex h-full max-h-195 w-full max-w-5xl flex-col overflow-hidden rounded-lg border-2 border-[#0F2A43] bg-white shadow-[6px_6px_0_#0F2A43]">

                {/* Header */}
                <div className="flex shrink-0 items-center justify-between gap-4 bg-[#0F2A43] px-5 py-4 text-white sm:px-8">
                    <div className="min-w-0">
                        <h2 className="font-display text-3xl font-bold leading-none tracking-tight sm:text-4xl">
                            Generate Interview Report
                        </h2>

                        <p className="mt-2 hidden text-sm leading-5 text-[#B8C9D6] sm:block">
                            Provide your profile, job description, and resume to
                            generate a personalized interview preparation report.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F5B800]"
                    >
                        <span aria-hidden="true">←</span>
                        <span className="hidden sm:inline">Back to dashboard</span>
                        <span className="sm:hidden">Back</span>
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5 sm:px-8 sm:py-6 lg:overflow-hidden"
                >
                    <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-2 lg:gap-6">

                        {/* Left column */}
                        <div className="flex min-h-0 flex-col gap-4">

                            {/* Firm */}
                            <div className="shrink-0">
                                <label
                                    htmlFor="firmName"
                                    className="mb-1.5 block text-sm font-semibold text-[#27415A]"
                                >
                                    Company Name:
                                </label>

                                <input id="firmName" type="text" name="companyName" placeholder="Where are you interviewing?" className="w-full rounded-md border border-[#B9C8D4] bg-white px-4 py-2.5 text-[15px] text-[#0F2A43] placeholder-[#7F93A3] outline-none transition focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50" onChange={function(e){setFirmName(e.target.value)}} />
                            </div>

                            {/* Self Description */}
                            <div className="flex min-h-0 flex-1 flex-col">
                                <label
                                    htmlFor="selfDesc"
                                    className="mb-1.5 block text-sm font-semibold text-[#27415A]"
                                >
                                    Self Description
                                </label>

                                <textarea
                                    id="selfDesc"
                                    name="selfDesc"
                                    rows="4"
                                    placeholder="Tell us about yourself, your experience, skills, projects, and career goals..."
                                    value={self_desc}
                                    onChange={(e) => setSelfDesc(e.target.value)}
                                    className="min-h-28 w-full flex-1 resize-none rounded-md border border-[#B9C8D4] bg-white px-4 py-2.5 text-[15px] leading-6 text-[#0F2A43] placeholder-[#7F93A3] outline-none transition focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50"
                                />
                            </div>

                            {/* Resume */}
                            <div className="shrink-0">
                                <label
                                    htmlFor="resume"
                                    className="mb-1.5 block text-sm font-semibold text-[#27415A]"
                                >
                                    Resume
                                </label>

                                <input
                                    id="resume"
                                    name="resume"
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    required
                                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                                    className="w-full rounded-md border-2 border-dashed border-[#9FB3C3] bg-[#F8FAFB] px-3 py-2.5 text-sm text-[#27415A] outline-none transition file:mr-4 file:cursor-pointer file:rounded-sm file:border-0 file:bg-[#0F2A43] file:px-4 file:py-1.5 file:font-semibold file:text-white hover:border-[#0F2A43] focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50"
                                />
                                <p className="mt-1.5 text-xs text-[#5B7083]">
                                    PDF only, maximum 10 MB. The PDF will be preserved with this report.
                                </p>
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="flex min-h-0 flex-col">
                            {/* Job Description */}
                            <label
                                htmlFor="jobDesc"
                                className="mb-1.5 block text-sm font-semibold text-[#27415A]"
                            >
                                Job Description
                            </label>

                            <textarea
                                id="jobDesc"
                                name="jobDesc"
                                rows="5"
                                placeholder="Paste the job description, required skills, responsibilities, and qualifications..."
                                value={job_desc}
                                onChange={(e) => setJobDesc(e.target.value)}
                                className="min-h-40 w-full flex-1 resize-none rounded-md border border-[#B9C8D4] bg-white px-4 py-2.5 text-[15px] leading-6 text-[#0F2A43] placeholder-[#7F93A3] outline-none transition focus:border-[#0F2A43] focus:ring-2 focus:ring-[#F5B800]/50"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full shrink-0 rounded-md bg-[#F5B800] px-6 py-3 text-base font-semibold text-[#0F2A43] transition hover:bg-[#FFCB2E] focus:outline-none focus:ring-2 focus:ring-[#0F2A43] focus:ring-offset-2 active:scale-[0.99]"
                    >
                        Generate Interview Report
                    </button>

                </form>
            </div>
        </div>
    );
}

export default InputForm;
