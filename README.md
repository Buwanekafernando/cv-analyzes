<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI CV Analyzer

**AI CV Analyzer** is a powerful intelligent tool designed to help job seekers and recruiters instantly evaluate how well a generic Curriculum Vitae (CV) matches a specific Job Description (JD).

Powered by Google's **Gemini 2.5 Flash** model, this application acts as an expert career coach, providing detailed, unbiased feedback on your resume's strengths, weaknesses, and overall fit for a role.

## 🚀 Key Features

*   **Smart Analysis**: Instant AI-driven scoring (0-100%) of your CV against any job description.
*   **File Support**: Upload your CV directly in **PDF** or **DOCX** formats.
*   **Visual Insights**: View a visual breakdown of your skills match using interactive radar charts.
*   **Actionable Feedback**: Get specific lists of strengths and improvements to help you land the interview.
*   **Professional UI**: Designed with a clean, ATS-friendly Blue-Grey professional theme.

## 🛠️ Technology Stack

*   **Frontend**: React 19, Vite, TypeScript
*   **Styling**: Tailwind CSS (Custom Professional Theme)
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash`)
*   **Visualization**: Recharts
*   **File Parsing**: PDF.js, Mammoth

## 💻 Run Locally

Follow these steps to get the project running on your local machine.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  **Clone the repository** (if you haven't already) and navigate to the project folder.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    *   Create a file named `.env.local` in the root directory.
    *   Add your Gemini API key:
        ```env
        GEMINI_API_KEY=your_actual_api_key_here
        ```
    *   *Note: You can get an API key from [Google AI Studio](https://aistudiogoogle.com/).*

4.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

5.  **Open the App**:
    Detailed instructions will appear in your terminal (usually `http://localhost:5173`).

---
Powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
