# MCP Server Control

A futuristic, Nuance Card-driven interface for managing a simulated Meta-Control Protocol (MCP) Server, its AI agents, and overall system health, powered by the Google Gemini API.

*(A sleek, dark-themed dashboard with neon accents, displaying AI agent statuses on the left and an interactive CLI on the right.)*

---

## About The Project

This application serves as a sophisticated frontend client that simulates a high-tech control panel for a fictional "Meta-Control Protocol" server. It's designed to showcase a powerful and aesthetically pleasing user interface for complex system management. The core of its interactive intelligence comes from the Google Gemini API, which powers the command-line interface, providing realistic responses and intelligent command suggestions.

This is a **client-side application**. The "server," "file system," and "agent statuses" are simulated for demonstration purposes. The file system is maintained within the Gemini model's memory for the duration of a session, guided by a system prompt, while agent data is hardcoded in the client.

## Key Features

-   **AI Family Dashboard:** View the status, roles, and unique "superpowers" of a diverse family of specialized AI agents in a visually appealing card layout.
-   **Gemini-Powered CLI:** An interactive terminal that uses the Gemini API to:
    -   Simulate a server file system and command execution (`ls`, `cat`, `mcp-status`, etc.).
    -   Maintain context from the command history.
    -   Provide intelligent, context-aware command suggestions.
-   **System Status Overview:** A dashboard tab that presents a formatted, real-time (simulated) report on system health and agent activities.
-   **Glassmorphism & Neon UI:** A sleek, futuristic aesthetic using glass-like panels and neon borders for an immersive, sci-fi experience.
-   **Persistent Command History:** The CLI history is saved locally in the browser using IndexedDB, allowing for persistence across sessions.
-   **Responsive Design:** The interface is built to be functional and look great on various screen sizes.

## Technology Stack

-   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **AI Engine:** [Google Gemini API (`@google/genai`)](https://ai.google.dev/)
-   **Client-Side Storage:** [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) for persistent CLI history.
-   **Styling:** Custom CSS for glassmorphism/neon effects & [Orbitron Font](https://fonts.google.com/specimen/Orbitron) for the sci-fi titles.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need a Google Gemini API key to run this application.
-   Get an API key at [Google AI Studio](https://makersuite.google.com/).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/mcp-server-control.git
    cd mcp-server-control
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    ```
3.  **Set up your environment variables:**
    The application is configured to use an API key from `process.env.API_KEY`. In a real development environment, you would create a `.env` file in the root of the project:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
    *Note: For this specific project environment, the `API_KEY` is assumed to be pre-configured and accessible.*

4.  **Run the application:**
    ```sh
    npm run dev
    ```

## How It Works

The application is a standalone frontend built with React. There is no traditional backend server.

-   **`geminiService.ts`**: This is the heart of the AI interaction. It sends the user's command and the recent history to the Gemini `gemini-2.5-flash` model. A detailed system prompt instructs the model to act as the MCP server's terminal, manage a temporary file system in its memory, and respond concisely.
-   **`dbService.ts`**: This service manages all interactions with the browser's IndexedDB to store, retrieve, and clear the CLI command history.
-   **Components:** The UI is broken down into reusable React components for the agent list, CLI, detail cards, and status reports.
-   **State Management:** React hooks (`useState`, `useEffect`) are used for managing the application's state, such as the selected agent, CLI history, and input.
