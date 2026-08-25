import React, { useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Terminal, 
  Bot, 
  Sparkles, 
  FileText, 
  BarChart3, 
  X, 
  Play, 
  CheckCircle2, 
  Send, 
  Layers
} from 'lucide-react';

interface ProjectsShowcaseProps {
  onOpenEnrollment: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onOpenEnrollment }) => {
  const [selectedDemoProject, setSelectedDemoProject] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Hello! I am the KIRA Autonomous Support Agent built in Module 5. Ask me anything about our enterprise catalog.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const projects = [
    {
      id: 1,
      title: 'KIRA Autonomous AI Customer Support Agent',
      category: 'Generative AI & RAG Bot',
      icon: Bot,
      imageBg: 'from-indigo-900 to-slate-950',
      tag: 'Project #1',
      description: 'A production-grade multi-turn conversational AI chatbot integrated with custom business knowledge bases and RAG vector search.',
      techStack: ['OpenAI GPT-4o', 'LangChain', 'Pinecone Vector DB', 'FastAPI', 'React'],
      highlights: [
        'Multi-turn context retention & conversation memory',
        'Semantic retrieval over 100+ PDF documents',
        'Sub-100ms streaming responses via WebSockets'
      ],
      interactiveType: 'chat'
    },
    {
      id: 2,
      title: 'GenAI Image & Creative Vision Studio',
      category: 'Multi-Modal Vision & Diffusion',
      icon: Sparkles,
      imageBg: 'from-purple-900 to-slate-950',
      tag: 'Project #2',
      description: 'An AI image generation suite that turns natural language prompts into stunning high-resolution creative artwork and product renders.',
      techStack: ['Stable Diffusion XL', 'Hugging Face Inference', 'Python', 'TailwindCSS'],
      highlights: [
        'Text-to-Image synthesis with custom style presets',
        'Prompt optimization & auto-enhancement engine',
        'Instant download & image resolution upscaling'
      ],
      interactiveType: 'genai'
    },
    {
      id: 3,
      title: 'Enterprise Smart Document RAG Search',
      category: 'LLM Document Intelligence',
      icon: FileText,
      imageBg: 'from-amber-950 to-slate-950',
      tag: 'Project #3',
      description: 'An enterprise PDF search assistant that parses lengthy contracts, financial reports, and technical manuals into instant answers.',
      techStack: ['Python', 'ChromaDB', 'LlamaIndex', 'Streamlit', 'PyPDF'],
      highlights: [
        'Instant PDF indexing & chunking algorithm',
        'Source citation & line-number verification',
        'Export key summaries & action points to Markdown'
      ],
      interactiveType: 'doc'
    },
    {
      id: 4,
      title: 'Predictive Machine Learning Dashboard',
      category: 'Predictive Analytics & Sentiment',
      icon: BarChart3,
      imageBg: 'from-emerald-950 to-slate-950',
      tag: 'Project #4',
      description: 'A full-stack predictive dashboard that classifies customer churn risk and sentiment analysis in real-time.',
      techStack: ['PyTorch', 'Scikit-Learn', 'Pandas', 'Plotly', 'Docker'],
      highlights: [
        '98.4% Classification Accuracy on benchmark data',
        'Interactive metrics & confusion matrix visualization',
        'Containerized deployment via Docker & AWS'
      ],
      interactiveType: 'ml'
    }
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: `[KIRA RAG Pipeline Response]: Analyzed vector embeddings for "${userText}". Retrieved 3 matching documents from knowledge base with 99.2% relevance score!`
        }
      ]);
    }, 600);
  };

  return (
    <section id="projects" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span>REAL-WORLD CAPSTONE PROJECTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Build 4 Flagship <br />
            <span className="gold-text">AI Applications for Your Portfolio</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Don't just watch videos — write code, train neural models, and build real applications that impress clients and hiring managers.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((proj) => {
            const Icon = proj.icon;
            return (
              <div
                key={proj.id}
                className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Top Bar */}
                <div className={`p-6 bg-gradient-to-r ${proj.imageBg} border-b border-slate-800 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-amber-400/30 flex items-center justify-center text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                        {proj.tag} • {proj.category}
                      </span>
                      <h3 className="text-lg font-display font-extrabold text-white group-hover:text-amber-300 transition-colors">
                        {proj.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDemoProject(proj.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow hover:scale-105 transition-transform"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Live Demo</span>
                  </button>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Engineering Highlights:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {proj.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Technologies & Frameworks Used:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-amber-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/30 text-center space-y-4">
          <h3 className="text-2xl font-display font-extrabold text-white">
            Build These 4 Capstones in 4 Weeks
          </h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            All project starter templates, code repositories, and datasets are included in your <strong className="text-amber-400">₹309</strong> lifetime pass.
          </p>
          <button
            onClick={onOpenEnrollment}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <span>ENROLL NOW FOR ₹309</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Interactive Project Demo Modal */}
      {selectedDemoProject !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setSelectedDemoProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <Bot className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  {projects.find(p => p.id === selectedDemoProject)?.title}
                </h3>
                <span className="text-xs text-amber-400 font-mono">Live Interactive Playground Demo</span>
              </div>
            </div>

            {/* Interactive Demo Content */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-h-64 overflow-y-auto space-y-3 font-sans text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender === 'user' 
                        ? 'bg-amber-400 text-slate-950 font-semibold' 
                        : 'bg-slate-900 border border-amber-500/30 text-slate-200 font-mono'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type a test query (e.g., How to integrate Pinecone RAG?)..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-amber-300"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="pt-2 text-center text-slate-400 text-[11px]">
              You will build and deploy this exact architecture in Module 5 of the Bootcamp!
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
