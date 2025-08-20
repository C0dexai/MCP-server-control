import React from 'react';

interface CliSuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionChip: React.FC<{ text: string; onClick: () => void }> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-700/50 text-cyan-300 text-xs font-mono px-3 py-1.5 rounded-full border border-gray-600/80 hover:bg-cyan-600/20 hover:border-cyan-500 transition-all duration-200"
    aria-label={`Use suggestion: ${text}`}
  >
    {text}
  </button>
);

const LoadingSkeleton: React.FC = () => (
    <div className="flex items-center gap-2 animate-pulse">
        <div className="bg-gray-700/50 h-7 w-28 rounded-full"></div>
        <div className="bg-gray-700/50 h-7 w-36 rounded-full"></div>
        <div className="bg-gray-700/50 h-7 w-24 rounded-full"></div>
    </div>
);


const CliSuggestions: React.FC<CliSuggestionsProps> = ({ suggestions, isLoading, onSuggestionClick }) => {
  if (isLoading) {
    return (
        <div className="mt-2 mb-1 px-2 h-[38px] flex items-center">
            <LoadingSkeleton />
        </div>
    );
  }

  if (suggestions.length === 0) {
    return <div className="h-[46px]"></div>; // Reserve space to prevent layout shift
  }

  return (
    <div className="my-2 px-2 h-[38px] flex items-center">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400 font-sans mr-2 flex-shrink-0">Suggestions:</span>
        {suggestions.map((suggestion, index) => (
          <SuggestionChip
            key={index}
            text={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
          />
        ))}
      </div>
    </div>
  );
};

export default CliSuggestions;
