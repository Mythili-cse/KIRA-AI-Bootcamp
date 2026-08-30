import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Terminal, 
  Cpu, 
  Sparkles, 
  Rocket, 
  ArrowRight,
  Clock,
  Award
} from 'lucide-react';

interface JourneyRoadmapProps {
  onOpenEnrollment: () => void;
}

export const JourneyRoadmap: React.FC<JourneyRoadmapProps> = ({ onOpenEnrollment }) => {
  const [activeWeek, setActiveWeek] = useState(0);

  const timelineWeeks = [
    {
      week: 'Week 1',
      title: 'Foundations & AI Tooling Setup',
      icon: Terminal,
      subtitle: 'From zero knowledge to executing neural scripts in Python',
      goals: [
        'Understand the AI landscape: ML, Deep Learning & Generative AI',
        'Set up Python 3.11, Google Colab & VS Code environment',
        'Master Prompt Engineering basics for code generation',
        'Explore NumPy arrays, Pandas DataFrames & visualization'
      ],
      milestoneProject: 'Built an automated Python dataset cleaner & prompt pipeline',
      badge: 'Level 1: AI Novice'
    },
    {
      week: 'Week 2',
      title: 'Model Building & Fine-Tuning',
      icon: Cpu,
      subtitle: 'Train, evaluate, and fine-tune machine learning models',
      goals: [
        'Supervised Learning: Regressors, Classifiers & Random Forests',
        'PyTorch fundamentals: Tensors, autograd, and neural network layers',
        'Model Evaluation: Precision, Recall, Confusion Matrix & Loss functions',
        'Transfer Learning: Fine-tuning pre-trained vision models'
      ],
      milestoneProject: 'Trained & fine-tuned an image classifier on custom dataset',
      badge: 'Level 2: Model Builder'
    },
    {
      week: 'Week 3',
      title: 'GenAI, LLMs & Vector DB RAG Apps',
      icon: Sparkles,
      subtitle: 'Unlock LLMs, OpenAI API, LangChain, and RAG search',
      goals: [
        'Understand Transformer architecture & attention mechanisms',
        'API Integration: OpenAI GPT-4o, Claude & Llama 3',
        'Embeddings & Vector Databases (ChromaDB / Pinecone)',
        'Build Retrieval-Augmented Generation (RAG) pipelines for private PDFs'
      ],
      milestoneProject: 'Built an enterprise Document Question-Answering RAG Bot',
      badge: 'Level 3: GenAI Architect'
    },
    {
      week: 'Week 4',
      title: 'Full-Stack App Building & Cloud Deploy',
      icon: Rocket,
      subtitle: 'Launch your live production AI application & earn certificate',
      goals: [
        'Design responsive Web UI with React / Streamlit',
        'FastAPI backend microservice for async AI model streaming',
        'Deploy application live to Vercel & HuggingFace Spaces',
        'Final Capstone presentation & Certificate of Completion award'
      ],
      milestoneProject: 'Full-Stack AI Agent deployed with live public web URL',
      badge: 'Level 4: Certified AI Builder'
    }
  ];

  return (
    <section id="journey" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>LEARNING JOURNEY & ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            From Curiosity to Creation <br />
            <span className="gold-text">4-Week Step-by-Step Pathway</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Follow a structured roadmap engineered to build real technical confidence and portfolio deliverables.
          </p>
        </div>

        {/* Timeline Navigation Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {timelineWeeks.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveWeek(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                activeWeek === idx
                  ? 'bg-slate-950 border-amber-400 shadow-xl shadow-amber-500/20 ring-1 ring-amber-400'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  activeWeek === idx ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-amber-400'
                }`}>
                  {item.week}
                </span>
                {activeWeek === idx && <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />}
              </div>
              <div className={`font-display font-bold text-sm line-clamp-1 ${
                activeWeek === idx ? 'text-white' : 'text-slate-300'
              }`}>
                {item.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Week Focused Timeline Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border-2 border-amber-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-amber-500/30">
                  {activeWeek + 1}
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                    {timelineWeeks[activeWeek].week} • {timelineWeeks[activeWeek].badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {timelineWeeks[activeWeek].title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base italic">
                "{timelineWeeks[activeWeek].subtitle}"
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Weekly Learning Goals & Tasks:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timelineWeeks[activeWeek].goals.map((g, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Box */}
              <div className="p-4 rounded-2xl bg-indigo-950/70 border border-indigo-500/40 text-xs flex items-center gap-3">
                <Award className="w-6 h-6 text-indigo-400 shrink-0" />
                <div>
                  <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] block">
                    WEEK {activeWeek + 1} MILESTONE DELIVERABLE:
                  </span>
                  <span className="text-white font-semibold text-sm">
                    {timelineWeeks[activeWeek].milestoneProject}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual Box */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                  <span>Bootcamp Progress</span>
                  <span className="font-mono text-amber-400 font-bold">{(activeWeek + 1) * 25}% Complete</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${(activeWeek + 1) * 25}%` }}
                  />
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  Every week is backed by live mentor office hours, step-by-step notebook code templates, and automated project feedback.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Estimated effort: 3-4 hours / week</span>
                </div>

                <button
                  onClick={onOpenEnrollment}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <span>START WEEK 1 FOR ONLY ₹399</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
