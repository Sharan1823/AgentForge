import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Building2, ArrowRight } from 'lucide-react';
import { api, normalizeApiError } from '../lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Detection {
  department: string | null;
  intent: string | null;
  agentDescription: string | null;
  confidence: number;
  shouldRedirect: boolean;
  redirectMessage: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detection, setDetection] = useState<Detection | null>(null);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/api/chat/message', {
        messages: updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.detection?.shouldRedirect) {
        setDetection(data.detection);
        setShowRedirectModal(true);
      }
    } catch (error) {
      const err = normalizeApiError(error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, something went wrong: ${err.message}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const redirectToBuilder = () => {
    const params = new URLSearchParams();
    if (detection?.department) params.set('department', detection.department);
    if (detection?.agentDescription) params.set('description', detection.agentDescription);
    if (detection?.intent) params.set('intent', detection.intent);
    window.location.href = `/build?${params.toString()}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <Bot className="w-8 h-8 text-blue-400" />
          <h1 className="text-xl font-semibold text-white">AgentForge Assistant</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => window.location.href = '/agent-creator'} className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">Create Agent</button>
          <button onClick={() => window.location.href = '/agents'} className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">My Agents</button>
          <button onClick={() => window.location.href = '/marketplace'} className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">Marketplace</button>
          <button onClick={() => window.location.href = '/settings'} className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">Settings</button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome to AgentForge</h2>
            <p className="text-slate-300 max-w-md mx-auto">
              I'm your AI assistant powered by Mistral running locally. Tell me about what you do manually, and I'll help you build an AI agent to handle it automatically.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-3xl px-4 py-3 rounded-2xl ${message.role === 'user' ? 'bg-blue-600 text-white ml-12' : 'bg-slate-700 text-slate-100 mr-12'}`}>
              <div className="flex items-start space-x-2">
                {message.role === 'assistant'
                  ? <Bot className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  : <User className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" />
                }
                <div className="flex-1">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-60 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-2xl mr-12 max-w-3xl">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-400 animate-pulse" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about the repetitive tasks you want to automate..."
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                rows={1}
                style={{ minHeight: '52px', maxHeight: '120px', resize: 'none' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Mistral running locally via Ollama · your data never leaves your machine
          </p>
        </div>
      </div>

      {/* Redirect Modal */}
      {showRedirectModal && detection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-lg w-full mx-6 border border-slate-600">
            <div className="text-center mb-6">
              <Building2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready to Build Your AI Agent!</h3>
              <p className="text-slate-300 mb-4">
                {detection.redirectMessage || 'I have everything I need to create your AI agent.'}
              </p>
              <div className="bg-slate-700 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="text-white font-medium">{detection.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Task:</span>
                    <span className="text-white font-medium">{detection.intent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Confidence:</span>
                    <span className="text-white font-medium">{Math.round(detection.confidence * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRedirectModal(false)}
                className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Continue Chatting
              </button>
              <button
                onClick={redirectToBuilder}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Building2 className="w-4 h-4" />
                <span>Build Agent</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}