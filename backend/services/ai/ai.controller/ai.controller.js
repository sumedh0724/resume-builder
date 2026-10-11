import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { generateInterviewReport } from "../ai.services.js";
import interviewReportModel from "../../../models/docModel.js";
import { appendReport } from "../../auth/auth.controller/auth.controller.js";
import { resumeDirectory } from "../../../middleware/resumeUpload.js";

export async function handleGenerateInterviewReport(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "A PDF resume is required.",
            report: null
        });
    }

    try {
        const { job_desc, self_desc, firm_name } = req.body;
        const pdfBuffer = await fs.readFile(req.file.path);
        const pdfParser = new PDFParse({ data: pdfBuffer });
        let resumeText;

        try {
            const parsedPdf = await pdfParser.getText();
            resumeText = parsedPdf.text;
        } finally {
            await pdfParser.destroy();
        }

        if (!resumeText.trim()) {
            throw new Error("The uploaded PDF does not contain readable text.");
        }

        const report = await generateInterviewReport({
            resume: resumeText,
            self_desc,
            job_desc
        });

        const interviewReport = await interviewReportModel.create({
            title: firm_name,
            job_desc,
            self_desc,
            resume: resumeText,
            ...report,
            user: req.user._id,
            resumeFile: {
                originalName: req.file.originalname,
                storedName: req.file.filename,
                mimeType: req.file.mimetype,
                size: req.file.size
            }
        });

        await appendReport({
            token: req.cookies.token,
            reportId: interviewReport._id
        });

        return res.status(201).json({
            message: "Report generated successfully",
            report: interviewReport
        });
    } catch (error) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(500).json({
            message: "Error occurred as " + error.message,
            report: null
        });
    }
}

export async function handleViewResume(req, res) {
    try {
        const report = await interviewReportModel
            .findOne({
                _id: req.params.reportId,
                user: req.user._id
            })
            .select("resumeFile");

        if (!report?.resumeFile?.storedName) {
            return res.status(404).json({
                message: "Resume file not found."
            });
        }

        const filePath = path.join(resumeDirectory, report.resumeFile.storedName);
        const displayName = report.resumeFile.originalName.replace(/["\\]/g, "_");

        return res.sendFile(filePath, {
            headers: {
                "Content-Type": report.resumeFile.mimeType || "application/pdf",
                "Content-Disposition": `inline; filename="${displayName}"`
            }
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                message: "Report not found."
            });
        }

        return res.status(500).json({
            message: error.message
        });
    }
}