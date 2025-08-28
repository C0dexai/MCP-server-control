import React, { useState } from 'react';
import type { AIAgent } from '../types';

const PersonaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const SuperpowerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
    </svg>
);

const ConfigIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CloseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface AgentDetailCardProps {
    agent: AIAgent;
    onClose: () => void;
}

const AgentDetailCard: React.FC<AgentDetailCardProps> = ({ agent, onClose }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'config'>('overview');

    return (
        <div className="row-span-1 glass neon p-4 flex flex-col animate-fade-in font-sans">
            <header className="flex justify-between items-start pb-2 mb-2">
                <div>
                    <h2 className="text-xl font-bold text-cyan-400 font-mono" style={{fontFamily: 'Orbitron, system-ui, sans-serif'}}>{agent.name}</h2>
                    <p className="text-sm text-gray-400">{agent.role}</p>
                </div>
                 <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors" aria-label="Close details">
                    <CloseIcon />
                </button>
            </header>

            <div className="flex border-b border-gray-700/80 mb-4">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`font-semibold text-sm py-2 px-4 transition-colors ${
                        activeTab === 'overview'
                        ? 'text-cyan-300 border-b-2 border-cyan-400'
                        : 'text-gray-400 hover:text-white border-b-2 border-transparent'
                    }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('config')}
                    className={`font-semibold text-sm py-2 px-4 transition-colors ${
                        activeTab === 'config'
                        ? 'text-cyan-300 border-b-2 border-cyan-400'
                        : 'text-gray-400 hover:text-white border-b-2 border-transparent'
                    }`}
                >
                    Configuration
                </button>
            </div>
            
            <div className="overflow-y-auto space-y-4 pr-2 flex-grow min-h-0">
                {activeTab === 'overview' && (
                    <div className="space-y-4 animate-fade-in">
                        <section>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-200">
                                <PersonaIcon /> Persona
                            </h3>
                            <blockquote className="border-l-2 border-cyan-500 pl-3 italic text-gray-300 text-sm">
                                <p>"{agent.persona.description}"</p>
                                <cite className="text-xs text-cyan-400 block mt-2 not-italic">- Tone: {agent.persona.tone}</cite>
                            </blockquote>
                        </section>

                        <section>
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                                <SuperpowerIcon /> Superpowers
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {agent.superpowers.map((power, index) => (
                                    <span key={index} className="bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
                                        {power}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
                 {activeTab === 'config' && (
                    <section className="animate-fade-in">
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-200">
                            <ConfigIcon /> Configuration Parameters
                        </h3>
                        <div className="bg-gray-900/40 rounded-lg p-3 text-sm font-mono space-y-2 border border-gray-700/50">
                            {Object.entries(agent.configuration).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center border-b border-gray-700/30 pb-1.5 last:border-b-0">
                                    <span className="text-gray-400">{key}:</span>
                                    <span className="text-green-400 font-semibold">{String(value)}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AgentDetailCard;