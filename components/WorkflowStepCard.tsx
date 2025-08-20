
import React from 'react';
import type { WorkflowStep, HotTake } from '../types';

interface WorkflowStepCardProps {
  step: WorkflowStep;
  hotTake: HotTake;
  onGetHotTake: (stepId: number, title: string, description: string) => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
  </div>
);

const HotTakeDisplay: React.FC<{ hotTake: HotTake }> = ({ hotTake }) => {
    if (hotTake.isLoading) {
        return <LoadingSpinner />;
    }

    if (hotTake.error) {
        return <p className="text-red-400 text-sm italic">{hotTake.error}</p>;
    }

    if (hotTake.text) {
        return (
             <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-300">
                <p>"{hotTake.text}"</p>
                <cite className="text-sm text-cyan-400 block mt-2 not-italic">- Gemini's Hot Take</cite>
            </blockquote>
        );
    }

    return null;
}

const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({ step, hotTake, onGetHotTake }) => {
  const { id, title, description, icon } = step;

  const handleButtonClick = () => {
    onGetHotTake(id, title, description);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-4">
        {icon}
        <h3 className="text-2xl font-bold text-gray-100">
          <span className="text-gray-500 mr-2">{id}.</span>{title}
        </h3>
      </div>
      <p className="text-gray-300 flex-grow mb-6">{description}</p>
      
      <div className="mt-auto pt-4 border-t border-gray-700/50 min-h-[120px] flex flex-col justify-center">
        {hotTake.text || hotTake.isLoading || hotTake.error ? (
          <HotTakeDisplay hotTake={hotTake} />
        ) : (
          <button
            onClick={handleButtonClick}
            disabled={hotTake.isLoading}
            className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Get Gemini's Hot Take
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkflowStepCard;
