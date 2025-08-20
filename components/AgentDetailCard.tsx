import React from 'react';
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

const CloseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
)

interface AgentDetailCardProps {
    agent: AIAgent;
    onClose: () => void;
}

const AgentDetailCard: React.FC<AgentDetailCardProps> = ({ agent, onClose }) => {
    return (
        <div className="row-span-1 glass neon p-4 flex flex-col animate-fade-in">
            <header className="flex justify-between items-start pb-2 mb-3 border-b border-gray-700">
                <div>
                    <h2 className="text-xl font-bold text-cyan-400">{agent.name}</h2>
                    <p className="text-sm text-gray-400">{agent.role}</p>
                </div>
                 <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors" aria-label="Close details">
                    <CloseIcon />
                </button>
            </header>
            
            <div className="overflow-y-auto space-y-4 pr-2">
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
        </div>
    );
};

export default AgentDetailCard;