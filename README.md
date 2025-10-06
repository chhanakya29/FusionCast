# FusionCast

FusionCast is an AI-powered web application that transforms raw text or PDF documents into concise summaries, extracts key points, and generates podcast-style audio in multiple languages—all within a modern, glassmorphic interface.

![FusionCast Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

---

## ✨ Features

- **Text & PDF Input:** Paste text or upload a PDF to process.
- **AI Summarization:** Uses Google Gemini AI to generate summaries and extract key points.
- **Podcast Generation:** Converts summaries into spoken audio using the browser’s Web Speech API.
- **Multi-language Support:** Generate podcasts in English, Hindi, or Telugu.
- **Modern UI:** Futuristic, glassmorphic design with responsive layout.

---

## 🛠 Tech Stack

- **Frontend:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **AI Integration:** [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini API)
- **PDF Parsing:** [pdf.js](https://mozilla.github.io/pdf.js/) (via CDN)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **TypeScript:** For type safety and maintainability

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/chhanakya29/fusioncast.git
   cd fusioncast

2. Install dependencies:
   npm install
3.Set up environment variables:

  Create a .env.local file in the root directory.
  Add your Gemini API key: 
    GEMINI_API_KEY="your-gemini-api-key-here"
4. Run the development server:
   npm run dev
--------
⚠️ Notes
PDF Parsing: Only text-based PDFs are supported (not scanned images).
API Key Security: The Gemini API key is exposed to the frontend. Use with caution and consider backend proxying for production.
Browser Support: Podcast audio uses the Web Speech API, which may not be available in all browsers.
