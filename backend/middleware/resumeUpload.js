import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
const resumeDirectory = path.resolve(backendDirectory, "../uploads/resumes");

fs.mkdirSync(resumeDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, resumeDirectory);
    },
    filename: (_req, file, callback) => {
        const extension = path.extname(file.originalname).toLowerCase();
        callback(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
    }
});

const fileFilter = (_req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
        return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "resume"));
    }

    callback(null, true);
};

export const resumeUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

export { resumeDirectory };
