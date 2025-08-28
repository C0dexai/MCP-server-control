import { GoogleGenAI, Type } from "@google/genai";
import type { AIAgent } from "../types";

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set. Gemini-powered features will be disabled.");
}

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const systemInstruction = `You are the command-line interface for the MCP (Meta-Control Protocol) Server.
Your responses must be concise and formatted as if in a real terminal.
Do not use markdown. Do not add conversational fluff.

Available commands:
- help: Show this help message.
- clear: Clear the terminal history.
- ls [path]: List files in the current directory.
- cat <file>: Display the content of a file.
- touch <file>: Create an empty file.
- mkdir <dir>: Create a new directory.
- rm <file/dir>: Remove a file or directory.
- mcp-status: Display the status of all connected agents.
- mcp-connect <agent_id>: Attempt to connect to an agent.
- mcp-disconnect <agent_id>: Disconnect an agent.
- mcp-rules [--list|--add|--remove]: Manage connectivity rules.
- echo <text>: Print text to the console.

Simulate a simple, in-memory file system. Start in the root directory '/'.
The file system should contain:
/
  - system.log (file)
  - config/
    - network.conf (file)
    - security.json (file)
  - agents/
    - agent-001.core (file)
    - agent-002.core (file)
    - agent-003.core (file)
    - agent-004.core (file)

You must process the user's command and return ONLY the terminal output.
If a command is invalid, respond with "mcp: command not found: [command]".
`;

export async function processCliCommand(command: string, history: string[]): Promise<string> {
  if (!ai) return "Gemini API not initialized. Check API_KEY.";
  
  const fullPrompt = `MCP CLI History Context:
${history.join('\n')}
---
Current User Command:
> ${command}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
        topK: 10,
        topP: 0.9,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error processing CLI command:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return `Error: Could not process command. Details: ${errorMessage}`;
  }
}

export async function getCommandSuggestions(history: string[], selectedAgent: AIAgent | null): Promise<string[]> {
  if (!ai) return [];

  let suggestionPrompt = `Based on the recent MCP CLI interaction history, suggest three concise, relevant follow-up commands the user might want to execute next. The suggestions should be diverse and useful (e.g., list files, check status, view a specific config).`;

  if (selectedAgent) {
    suggestionPrompt += `

The user has agent "${selectedAgent.name}" selected, whose role is "${selectedAgent.role}".
Please include contextually relevant suggestions related to this agent. For example, you could suggest commands like 'mcp-status --agent ${selectedAgent.name}', 'cat /agents/${selectedAgent.name}.log', or a command related to their role like 'net-traffic --analyze' for a "Network Analyst".`;
  }

  suggestionPrompt += `

Recent History:
${history.join('\n')}

---
Analyze the last command and its response, then provide three logical next steps based on the full context.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: suggestionPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'An array of three suggested command strings.'
            }
          }
        },
        temperature: 0.7,
      }
    });

    const jsonText = response.text.trim();
    const parsed = JSON.parse(jsonText);
    
    if (parsed && Array.isArray(parsed.suggestions)) {
      return parsed.suggestions.slice(0, 3);
    }
    return [];
  } catch (error) {
    console.error("Error generating command suggestions:", error);
    return []; // Return empty array on error to not break UI
  }
}
