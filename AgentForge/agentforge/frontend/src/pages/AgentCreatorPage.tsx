import React, { useState, useEffect } from 'react';
import { Search, Lightbulb, Wand2, FileText, Users, Clock, Settings, ChevronRight, Plus, TestTube } from 'lucide-react';
import { api, normalizeApiError } from '../lib/api';

interface AgentTemplate {
  name: string;
  description: string;
  category: "SALES" | "HR" | "MARKETING" | "FINANCE" | "SUPPORT";
  steps: any[];
  tools: string[];
  triggers: string[];
  relevance?: number;
}

interface ParsedAgentDefinition {
  agentName: string;
  department: "SALES" | "HR" | "MARKETING" | "FINANCE" | "SUPPORT";
  summary: string;
  description: string;
  tools: string[];
  steps: any[];
  trigger: {
    type: "MANUAL" | "SCHEDULED" | "WEBHOOK";
    cronSchedule: string | null;
    humanReadable: string;
  };
  guardrails: {
    requireApprovalBefore: string[];
    dataAccessScope: string[];
    maxActionsPerRun: number;
    confirmationMessage: string;
  };
  knowledgeBaseNeeded: boolean;
  clarifyingQuestions: string[];
  readyToDeploy: boolean;
}

export default function AgentCreatorPage() {
  const [activeTab, setActiveTab] = useState<'create' | 'templates' | 'test'>('create');
  const [description, setDescription] = useState('');
  const [context, setContext] = useState('');
  const [templates, setTemplates] = useState<AgentTemplate[]>([]);
  const [suggestions, setSuggestions] = useState<AgentTemplate[]>([]);
  const [parsedAgent, setParsedAgent] = useState<ParsedAgentDefinition | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data } = await api.get('/api/agent-creator/templates');
      setTemplates(data.templates || []);
    } catch (error) {
      const err = normalizeApiError(error);
      console.error('Failed to load templates:', err);
    }
  };

  const handleCreateAgent = async () => {
    if (!description.trim()) return;

    setIsLoading(true);
    try {
      const { data } = await api.post('/api/agent-creator/create', {
        description: description.trim(),
        context: context.trim() || undefined,
      });
      
      if (data.success) {
        setParsedAgent(data.agentDefinition);
        setActiveTab('test');
      } else {
        alert(data.error || 'Failed to create agent');
      }
    } catch (error) {
      const err = normalizeApiError(error);
      console.error('Failed to create agent:', err);
      alert(`Failed to create agent: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggest = async () => {
    if (!searchQuery.trim()) return;

    try {
      const { data } = await api.post('/api/agent-creator/suggest', {
        query: searchQuery.trim(),
      });
      setSuggestions(data.suggestions || []);
    } catch (error) {
      const err = normalizeApiError(error);
      console.error('Failed to get suggestions:', err);
    }
  };

  const selectTemplate = (template: AgentTemplate) => {
    setDescription(`Create a ${template.name.toLowerCase()} agent that ${template.description.toLowerCase()}`);
    setContext('');
    setSuggestions([]);
  };

  const deployAgent = () => {
    if (!parsedAgent) return;
    
    alert('Agent deployment coming soon! This will create the agent and make it available for execution.');
  };

  const testAgent = () => {
    if (!parsedAgent) return;
    
    alert('Agent testing coming soon! This will run the agent in a sandbox environment.');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      SALES: 'bg-blue-600',
      HR: 'bg-green-600',
      MARKETING: 'bg-purple-600',
      FINANCE: 'bg-yellow-600',
      SUPPORT: 'bg-red-600',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Wand2 className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">Agent Creator</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.href = '/agents'}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              My Agents
            </button>
            <button
              onClick={() => window.location.href = '/marketplace'}
              className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'create' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create Agent
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'templates' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('test')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'test' 
                  ? 'text-blue-400 border-blue-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              <TestTube className="w-4 h-4 inline mr-2" />
              Test & Deploy
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Input */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />
                  Describe Your Agent
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      What should this agent do?
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="E.g., 'Automatically follow up with new sales leads, send personalized emails, and update our CRM system. The agent should research each lead's company first, draft a personalized email mentioning their specific industry, and then log the interaction in HubSpot.'"
                      className="w-full h-32 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 resize-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Additional Context (optional)
                    </label>
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder="Any additional information about your company, tools, or specific requirements..."
                      className="w-full h-20 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 resize-none"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleCreateAgent}
                      disabled={!description.trim() || isLoading}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                          <span className="ml-2">Creating...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          <span>Create Agent</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setSearchQuery(description.trim())}
                      className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      <span>Find Similar</span>
                    </button>
                  </div>
                </div>

                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-4">Similar Agents</h3>
                    <div className="space-y-3">
                      {suggestions.slice(0, 3).map((suggestion, index) => (
                        <div
                          key={index}
                          className="bg-slate-700 p-4 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors cursor-pointer"
                          onClick={() => selectTemplate(suggestion)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-white">{suggestion.name}</h4>
                              <p className="text-sm text-slate-300 mt-1">{suggestion.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(suggestion.category)}`}>
                                  {suggestion.category}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {suggestion.tools.slice(0, 3).map((tool, i) => (
                                    <span key={i} className="px-2 py-1 text-xs bg-slate-600 rounded border border-slate-500">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-slate-400">
                                {Math.round((suggestion.relevance || 0) * 100)}% match
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Agent Preview */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-semibold text-white mb-4">Agent Preview</h2>
                
                {parsedAgent ? (
                  <div className="space-y-4">
                    <div className="bg-slate-700 p-4 rounded-lg">
                      <h3 className="font-medium text-white mb-2">{parsedAgent.agentName}</h3>
                      <p className="text-sm text-slate-300 mb-4">{parsedAgent.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Department:</span>
                          <span className="text-white ml-2">{parsedAgent.department}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Tools:</span>
                          <span className="text-white ml-2">{parsedAgent.tools.join(', ')}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Steps:</span>
                          <span className="text-white ml-2">{parsedAgent.steps.length} steps</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={testAgent}
                        className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center"
                      >
                        <TestTube className="w-4 h-4 mr-2" />
                        Test Agent
                      </button>
                      <button
                        onClick={deployAgent}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Deploy Agent
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Wand2 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Your Agent Preview</h3>
                    <p className="text-slate-300 max-w-md mx-auto">
                      Describe your agent using natural language, and I'll generate a structured definition here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                onClick={() => selectTemplate(template)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                    <p className="text-sm text-slate-300 mt-2">{template.description}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded ${getCategoryColor(template.category)}`}>
                    {template.category}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm text-slate-300">
                    <strong>Tools:</strong> {template.tools.join(', ')}
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Triggers:</strong> {template.triggers.join(', ')}
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Steps:</strong> {template.steps.length} automated steps
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => selectTemplate(template)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'test' && (
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Test & Deploy</h2>
            
            {parsedAgent ? (
              <div className="space-y-6">
                <div className="bg-slate-700 p-6 rounded-lg">
                  <h3 className="font-medium text-white mb-4">Agent Configuration</h3>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate-400">Name:</span>
                        <span className="text-white ml-2">{parsedAgent.agentName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Department:</span>
                        <span className="text-white ml-2">{parsedAgent.department}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-slate-400">Description:</span>
                      <p className="text-white mt-2">{parsedAgent.description}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Tools:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {parsedAgent.tools.map((tool, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-slate-600 rounded border border-slate-500">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700 p-6 rounded-lg">
                  <h3 className="font-medium text-white mb-4">Test Results</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-green-400" />
                      <span className="text-white">Configuration: Valid</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TestTube className="w-5 h-5 text-yellow-400" />
                      <span className="text-white">Test Environment: Ready</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Last Test: Never</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={testAgent}
                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <TestTube className="w-5 h-5 mr-2" />
                    Run Test
                  </button>
                  <button
                    onClick={deployAgent}
                    className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Deploy to Production
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">Test & Deploy</h3>
                <p className="text-slate-300 max-w-md mx-auto">
                  Create an agent first to see testing and deployment options.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
