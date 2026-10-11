function LoadingScreen({
    title = "Loading your workspace",
    message = "Please wait a moment while we prepare everything."
}) {
    return (
        <main className="rp-chart flex min-h-screen w-full items-center justify-center bg-[#F2F5F7] px-4 py-10 text-[#0F2A43]">
            <section
                role="status"
                aria-live="polite"
                className="w-full max-w-md overflow-hidden rounded-lg border-2 border-[#0F2A43] bg-white text-center shadow-[8px_8px_0_#0F2A43]"
            >
                <div className="bg-[#0F2A43] px-8 py-10">
                    <div className="relative mx-auto h-20 w-20">
                        <div className="absolute inset-0 rounded-full border-2 border-white/20" />
                        <div className="absolute inset-3 rounded-full border border-dashed border-white/20" />
                        <div className="absolute inset-0 animate-spin motion-reduce:animate-none">
                            <span className="absolute left-1/2 top-[-6px] h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-[#F5B800]" />
                        </div>
                    </div>
                </div>
                <div className="px-8 py-8">
                    <h1 className="font-display text-3xl font-semibold">{title}</h1>
                    <p className="mt-3 text-[15px] leading-6 text-[#4A6073]">{message}</p>
                </div>
            </section>
        </main>
    );
}

export default LoadingScreen;
