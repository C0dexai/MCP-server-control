import React, { useState, useRef, useEffect } from 'react';
import { AI_FAMILY } from './constants';
import type { CliHistoryItem, AIAgent, FormattedDocumentData } from './types';
import { processCliCommand, getCommandSuggestions } from './services/geminiService';
import { getHistory, addHistoryItem, clearHistory } from './services/dbService';
import AgentDetailCard from './components/AgentDetailCard';
import CliSuggestions from './components/CliSuggestions';
import FormattedDocument from './components/FormattedDocument';
import ConfigurationCard from './components/ConfigurationCard';

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.65H8.228a3.375 3.375 0 00-3.285 2.65l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
  </svg>
);

const AgentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const StatusIndicator: React.FC<{ status: AIAgent['status'] }> = ({ status }) => {
  const color = {
    'Active': 'bg-green-500',
    'Idle': 'bg-yellow-500',
    'Error': 'bg-red-500',
    'Offline': 'bg-gray-500',
  }[status];
  return <span className={`w-2.5 h-2.5 ${color} rounded-full`} title={status}></span>;
};

const INITIAL_CLI_HISTORY_ITEMS: Omit<CliHistoryItem, 'id'>[] = [
    { type: 'system', content: 'MCP Server v1.0.0 initialised.' },
    { type: 'system', content: `System check... OK.\nConnected to Gemini core... OK.` },
    { type: 'system', content: 'Type "help" for a list of commands.' },
];

const systemStatusReport: FormattedDocumentData = {
  title: "System Status Report",
  author: "MCP Internal Diagnostics",
  date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  content: [
    {
      type: 'paragraph',
      text: "This report provides a real-time overview of the MCP Server and its associated AI agents. System performance remains within optimal parameters, with all core services running as expected. Network latency is minimal, and data integrity checks have passed without issue."
    },
    {
      type: 'paragraph',
      text: "Recent agent activity indicates a focus on data analysis and routine maintenance tasks. The following items summarize the key operational highlights from the last cycle:"
    },
    {
      type: 'list',
      ordered: false,
      items: [
        "Agent Lyra completed data validation on 3.2 TB of incoming telemetry.",
        "Agent Dan deployed a minor patch to the primary user interface.",
        "System security protocols were successfully updated by Agent Stan.",
        "Agent Cecilia reported an error state due to a misconfigured cloud resource."
      ]
    },
    {
      type: 'quote',
      text: "Immediate attention is required for Agent Cecilia's error state to prevent potential service disruptions. Please review the agent's detailed logs."
    }
  ]
};

const App: React.FC = () => {
  const [cliHistory, setCliHistory] = useState<CliHistoryItem[]>([]);
  const [cliInput, setCliInput] = useState('');
  const [isCliLoading, setIsCliLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<'status' | 'config'>('status');
  const cliEndRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        let history = await getHistory();
        if (history.length === 0) {
          const newHistoryItems = await Promise.all(
            INITIAL_CLI_HISTORY_ITEMS.map(item => addHistoryItem(item))
          );
          history = newHistoryItems;
        }
        setCliHistory(history);
      } catch (error) {
        console.error("Failed to load CLI history:", error);
        setCliHistory([{ type: 'system', content: 'Error: Could not load command history from IndexedDB.' }]);
      } finally {
        setIsHistoryLoading(false);
        setTimeout(() => cliInputRef.current?.focus(), 0);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    cliEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [cliHistory]);

  const handleSuggestionClick = (suggestion: string) => {
    setCliInput(suggestion);
    cliInputRef.current?.focus();
  };
  
  const handleCliSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const command = cliInput.trim();
    if (!command || isCliLoading || isHistoryLoading) return;

    setCliInput('');
    setSuggestions([]);

    if (command.toLowerCase() === 'clear') {
      setIsCliLoading(true);
      try {
        await clearHistory();
        const newHistoryItems = await Promise.all(
            INITIAL_CLI_HISTORY_ITEMS.map(item => addHistoryItem(item))
          );
        setCliHistory(newHistoryItems);
      } catch (error) {
        console.error("Failed to clear history:", error);
        const errorItem = await addHistoryItem({ type: 'system', content: 'Error: Could not clear history.' });
        setCliHistory(prev => [...prev, errorItem]);
      } finally {
        setIsCliLoading(false);
        setTimeout(() => cliInputRef.current?.focus(), 0);
      }
      return;
    }

    setIsCliLoading(true);
    const commandItem = await addHistoryItem({ type: 'command', content: command });
    setCliHistory(prev => [...prev, commandItem]);
    
    setIsSuggestionsLoading(true);

    try {
      const promptHistory = [...cliHistory, commandItem]
        .map(item => `${item.type === 'command' ? '>' : ''} ${item.content}`)
        .slice(-10);

      const [result, newSuggestions] = await Promise.all([
        processCliCommand(command, promptHistory),
        getCommandSuggestions(promptHistory),
      ]);

      const responseItem = await addHistoryItem({ type: 'response', content: result });
      setCliHistory(prev => [...prev, responseItem]);
      setSuggestions(newSuggestions);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      const errorItem = await addHistoryItem({ type: 'response', content: `[CLIENT_ERROR] ${errorMessage}` });
      setCliHistory(prev => [...prev, errorItem]);
      setSuggestions([]);
    } finally {
      setIsCliLoading(false);
      setIsSuggestionsLoading(false);
      setTimeout(() => cliInputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="text-gray-300 font-mono min-h-screen flex flex-col antialiased">
      <header className="glass glass-subtle px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <ServerIcon />
          <h1 className="text-xl font-bold text-gray-100" style={{fontFamily: 'Orbitron, system-ui, sans-serif'}}>MCP Server Control</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>STATUS:</span>
            <span className="text-green-400 font-bold flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              CONNECTED
            </span>
          </div>
        </div>
      </header>
      
      <main className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
        <aside className="md:col-span-3 glass neon p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-400 border-b border-gray-700 pb-2">
            <AgentIcon /> AI Family
          </h2>
          <ul className="space-y-2 overflow-y-auto pr-2">
            {AI_FAMILY.map(agent => (
              <li key={agent.name} 
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3 rounded-md transition-all duration-200 cursor-pointer ${
                    selectedAgent?.name === agent.name 
                      ? 'bg-cyan-600/30 border border-cyan-500 scale-105 shadow-lg'
                      : 'bg-gray-700/40 hover:bg-gray-700/80 border border-transparent hover:border-gray-500'
                  }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-gray-200">{agent.name}</span>
                  <StatusIndicator status={agent.status} />
                </div>
                <p className="text-sm text-gray-400">{agent.role}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="md:col-span-9 grid grid-rows-3 gap-4">
          <div className="row-span-2 glass neon p-4 flex flex-col text-sm font-mono">
            <h2 className="font-semibold mb-2 flex items-center gap-2 text-cyan-400">
                <TerminalIcon /> Gemini CLI
            </h2>
            <div className="flex-grow bg-transparent rounded p-2 text-green-400 overflow-y-auto" onClick={() => cliInputRef.current?.focus()}>
              {isHistoryLoading ? (
                  <div className="text-gray-400">Loading history...</div>
              ) : (
                cliHistory.map((item) => (
                  <div key={item.id} className="whitespace-pre-wrap">
                    {item.type === 'command' ? (
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 flex-shrink-0">{'>'}</span>
                        <span className="text-white break-words">{item.content}</span>
                      </div>
                    ) : (
                      <div className="text-green-400 break-words">{item.content}</div>
                    )}
                  </div>
                ))
              )}
               {isCliLoading && !isHistoryLoading && (
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400 flex-shrink-0">{'>'}</span>
                    <span className="w-2 h-4 bg-green-400 animate-pulse mt-1"></span>
                  </div>
              )}
              <div ref={cliEndRef} />
            </div>
            <CliSuggestions 
              suggestions={suggestions}
              isLoading={isSuggestionsLoading}
              onSuggestionClick={handleSuggestionClick}
            />
            <form onSubmit={handleCliSubmit}>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 flex-shrink-0">{'>'}</span>
                <input
                  ref={cliInputRef}
                  id="cli-input"
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  disabled={isCliLoading || isHistoryLoading}
                  className="bg-transparent border-none text-white w-full focus:outline-none p-0 leading-tight"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </form>
          </div>
          
          <div className="row-span-1 flex flex-col min-h-0">
            {selectedAgent ? (
              <AgentDetailCard agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
            ) : (
              <>
                <div className="flex items-center">
                  <button
                      onClick={() => setActiveInfoTab('status')}
                      className={`font-sans font-semibold text-sm py-2 px-5 rounded-t-lg transition-colors border-b-2 ${
                        activeInfoTab === 'status'
                          ? 'text-cyan-300 border-cyan-400'
                          : 'text-gray-400 hover:text-white border-transparent'
                      }`}
                    >
                      System Status
                    </button>
                    <button
                      onClick={() => setActiveInfoTab('config')}
                      className={`font-sans font-semibold text-sm py-2 px-5 rounded-t-lg transition-colors border-b-2 ${
                        activeInfoTab === 'config'
                          ? 'text-cyan-300 border-cyan-400'
                          : 'text-gray-400 hover:text-white border-transparent'
                      }`}
                    >
                      Environment
                    </button>
                </div>
                <div className="flex-grow min-h-0">
                    {activeInfoTab === 'status' && <FormattedDocument data={systemStatusReport} />}
                    {activeInfoTab === 'config' && <ConfigurationCard />}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
