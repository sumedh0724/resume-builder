# ResumePilot

ResumePilot is a full-stack resume and interview preparation application. Users can upload a PDF resume, provide a job description and self-description, and receive an AI-generated interview preparation report.

## Features

- User registration and JWT-based login
- Dashboard with saved interview reports
- PDF resume upload with a 10 MB size limit
- PDF text extraction before sending content to the AI service
- AI-generated suitability score, technical questions, behavioral questions, skill gaps, and preparation plan
- Search reports by company or report title
- Track completed skill gaps
- Open the original PDF resume used for a report
- Protected report and resume access

## Project Structure

```text
resume-builder/
├── backend/
│   ├── config/                 MongoDB connection
│   ├── middleware/             PDF upload middleware
│   ├── models/                 Mongoose models
│   └── services/               Auth and AI routes/controllers
├── frontend/
│   └── src/                    React application
├── package.json                Backend dependencies and scripts
└── README.md
```

## Requirements

- Node.js 20 or newer
- MongoDB database
- Google Gemini API key

## Configuration

Create a `.env` file in the repository root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/resume-builder
JWT_SECRET=replace-with-a-long-random-secret
GEMINI_API_KEY=your-gemini-api-key
```

Do not commit `.env` or API keys.

## Installation

Install backend dependencies from the repository root:

```powershell
npm install
```

Install frontend dependencies:

```powershell
Set-Location frontend
npm install
```

## Running Locally

Start the backend from the repository root:

```powershell
npm run dev
```

The backend runs on `http://localhost:3000` by default.

In a second terminal, start the frontend:

```powershell
Set-Location frontend
npm run dev
```

The frontend runs on the Vite development URL, normally `http://localhost:5173`.

## Main Routes

### Frontend

- `/` - Landing page
- `/login` - Login
- `/register` - Registration
- `/dashboard` - Protected report dashboard
- `/ai/generate-report` - Protected report generation form

### Backend

- `POST /auth/register` - Create an account
- `POST /auth/login` - Log in and receive the authentication cookie
- `GET /auth/logout` - Clear the authentication cookie
- `GET /auth/getMe` - Get the current user and populated reports
- `POST /ai/generate-report` - Upload a PDF and generate a report
- `GET /ai/reports/:reportId/resume` - Open the authenticated user's stored PDF resume
- `PATCH /auth/reports/:reportId/skills/:skillGapId` - Update skill completion status

## PDF Resume Flow

1. The frontend sends the form as `multipart/form-data`.
2. Multer accepts PDF files up to 10 MB and stores them in `backend/uploads/resumes`.
3. `pdf-parse` extracts the text from the PDF.
4. The extracted text is sent to the AI service.
5. The original PDF metadata and extracted text are stored with the generated report.
6. The dashboard provides an authenticated link to open the original PDF.

Uploaded resumes are local runtime files and should be backed up or moved to object storage for production deployments.

## Production Notes

- Use a strong `JWT_SECRET` and HTTPS in production.
- Replace local PDF storage with private object storage for multi-instance deployments.
- Keep uploaded files protected by authentication and ownership checks.
- Configure the frontend API base URL through environment-specific configuration before deployment.
- Review dependency audit findings before production release.

## Validation

Build the frontend with:

```powershell
Set-Location frontend
npm run build
```

Check backend syntax with:

```powershell
Set-Location ..
node --check backend/services/ai/ai.controller/ai.controller.js
node --check backend/services/ai/ai.routes.js
node --check backend/middleware/resumeUpload.js
```
