import React, { useState } from 'react';

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
);


const ConfigurationCard: React.FC = () => {
    const [apiName, setApiName] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiName || !apiKey) return;
        setSaveStatus('saving');
        console.log("Saving configuration:", { apiName, apiKey: '********' });
        // Simulate an API call
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1000);
    }

    const getButtonText = () => {
        switch (saveStatus) {
            case 'saving': return 'Saving...';
            case 'saved': return 'Saved!';
            default: return 'Save Configuration';
        }
    }

    return (
        <div className="glass neon p-6 flex flex-col animate-fade-in h-full">
            <header className="flex items-center gap-3 pb-3 mb-4 border-b border-gray-700">
                <SettingsIcon />
                <h2 className="text-xl font-bold text-cyan-400" style={{fontFamily: 'Orbitron, system-ui, sans-serif'}}>
                    Container Environment
                </h2>
            </header>
            <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-between font-sans">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="api-name" className="block text-sm font-medium text-gray-300 mb-1.5">API_NAME</label>
                        <input
                            type="text"
                            id="api-name"
                            value={apiName}
                            onChange={(e) => setApiName(e.target.value)}
                            className="bg-gray-900/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 placeholder-gray-500"
                            placeholder="e.g. GEMINI_API"
                            required
                        />
                    </div>
                    <div>
                         <label htmlFor="api-key" className="block text-sm font-medium text-gray-300 mb-1.5">API_KEY</label>
                        <input
                            type="password"
                            id="api-key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="bg-gray-900/50 border border-gray-600 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 placeholder-gray-500"
                            placeholder="Enter your secret key"
                            required
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={saveStatus === 'saving' || saveStatus === 'saved'}
                        className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {getButtonText()}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ConfigurationCard;
