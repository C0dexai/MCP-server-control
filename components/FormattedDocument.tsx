import React from 'react';
import type { FormattedDocumentData, DocumentContent } from '../types';

const FormattedDocument: React.FC<{ data: FormattedDocumentData }> = ({ data }) => {
  const { title, author, date, content } = data;

  const renderContent = (block: DocumentContent, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={index} className="mb-4">{block.text}</p>;
      
      case 'list':
        const ListTag = block.ordered ? 'ol' : 'ul';
        const listStyle = block.ordered ? 'list-decimal list-inside' : 'list-disc list-inside';
        return (
          <blockquote key={index} className="my-4 pl-4 border-l-4 border-cyan-500">
            <ListTag className={listStyle}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-1">{item}</li>
              ))}
            </ListTag>
          </blockquote>
        );

      case 'quote':
        return (
          <blockquote key={index} className="my-4 pl-4 border-l-4 border-cyan-500 italic">
            <p>{block.text}</p>
          </blockquote>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="row-span-1 glass neon p-6 flex flex-col animate-fade-in text-gray-300 font-sans">
      <header className="pb-3 mb-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-cyan-400" style={{fontFamily: 'Orbitron, system-ui, sans-serif'}}>{title}</h2>
        <div className="text-sm text-gray-400 mt-1">
          <span>By: {author}</span> | <span>Date: {date}</span>
        </div>
      </header>
      <div className="overflow-y-auto pr-2 text-base leading-relaxed">
        {content.map(renderContent)}
      </div>
    </div>
  );
};

export default FormattedDocument;
