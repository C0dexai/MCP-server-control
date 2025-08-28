import type { ReactNode } from 'react';

export type AgentStatus = 'Active' | 'Idle' | 'Error' | 'Offline';

export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  description: string;
}

export interface Persona {
  description: string;
  tone: string;
}

export interface AIAgent {
  name:string;
  role: string;
  persona: Persona;
  superpowers: string[];
  status: AgentStatus;
  configuration: Record<string, string | number>;
}

export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface HotTake {
  isLoading: boolean;
  text: string | null;
  error: string | null;
}

export interface CliHistoryItem {
  id?: number;
  type: 'command' | 'response' | 'system';
  content: string;
}

// Types for FormattedDocument component
export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface ListBlock {
  type: 'list';
  items: string[];
  ordered: boolean;
}

export interface QuoteBlock {
  type: 'quote';
  text: string;
}

export type DocumentContent = ParagraphBlock | ListBlock | QuoteBlock;

export interface FormattedDocumentData {
  title: string;
  author: string;
  date: string;
  content: DocumentContent[];
}