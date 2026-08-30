import React, { useState } from 'react';
import { 
  Brain, 
  Code, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Rocket, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  Terminal,
  Cpu,
  ArrowRight
} from 'lucide-react';

interface CurriculumSectionProps {
  onOpenEnrollment: () => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onOpenEnrollment }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(0);

  const modules = [
    {
      id: 1,
      title: 'AI Fundamentals',
      subtitle: 'Understand core concepts and how AI works',
      icon: Brain,
      color: 'from-amber-500 to-amber-600',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Master the foundation of modern Artificial Intelligence. Learn how neural networks process data, pattern recognition mechanics, mathematical intuition, and standard AI workflows.',
      topics: [
        'Introduction to Artificial Intelligence, Machine Learning & Deep Learning',
        'How Neural Networks learn: Weights, Biases, Activation Functions & Backpropagation',
        'Data Preprocessing & Feature Engineering essentials',
        'Supervised vs. Unsupervised vs. Reinforcement Learning frameworks',
        'Ethics, Bias, and Safety in Artificial Intelligence'
      ],
      practicalTask: 'Build a concept roadmap and test your first linear regression predictor in Python.',
      tools: ['Python', 'Numpy', 'Pandas', 'Matplotlib']
    },
    {
      id: 2,
      title: 'Tools & Frameworks',
      subtitle: 'Work with Python, TensorFlow, PyTorch & more',
      icon: Code,
      color: 'from-indigo-500 to-purple-600',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      description: 'Get hands-on experience with industry-standard developer libraries and open-source ecosystems used by top AI labs worldwide.',
      topics: [
        'Setting up Google Colab, Jupyter Notebooks & VS Code for AI development',
        'Python for AI: Vectorized computation with NumPy & Pandas DataFrames',
        'Deep Learning with PyTorch: Tensors, Datasets & DataLoader pipelines',
        'TensorFlow & Keras model construction mechanics',
        'Hugging Face Transformers library walkthrough'
      ],
      practicalTask: 'Construct a custom PyTorch Tensor pipeline and load pre-trained vision models.',
      tools: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'HuggingFace', 'Jupyter']
    },
    {
      id: 3,
      title: 'Model Building',
      subtitle: 'Train, fine-tune and evaluate machine learning models',
      icon: Layers,
      color: 'from-blue-500 to-cyan-600',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'Learn how to build, train, evaluate, and tune machine learning models on real-world datasets with high accuracy.',
      topics: [
        'Data Splitting: Train, Validation & Test set design',
        'Model Evaluation Metrics: Accuracy, Precision, Recall, F1-Score & Confusion Matrix',
        'Hyperparameter Tuning & Cross-Validation techniques',
        'Preventing Overfitting & Underfitting (Regularization & Dropout)',
        'Fine-tuning pre-trained models (Transfer Learning)'
      ],
      practicalTask: 'Train a classifier on real customer data and evaluate its accuracy matrix.',
      tools: ['Scikit-Learn', 'XGBoost', 'Optuna', 'Weights & Biases']
    },
    {
      id: 4,
      title: 'LLMs & Generative AI',
      subtitle: 'Explore Large Language Models & prompt engineering',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-600',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      description: 'Unlock the power of Generative AI! Master Prompt Engineering, Retrieval-Augmented Generation (RAG), vector databases, and LLM APIs.',
      topics: [
        'Large Language Model Architecture: Transformers, Attention Mechanisms & Tokenization',
        'Advanced Prompt Engineering: Few-shot, Chain-of-Thought & Persona Prompting',
        'API Integration: OpenAI (GPT-4o), Anthropic Claude & Google Gemini',
        'Retrieval-Augmented Generation (RAG) with Vector Databases (ChromaDB / Pinecone)',
        'Open-Source LLMs: Running Llama 3 & Mistral locally with Ollama'
      ],
      practicalTask: 'Build a functional RAG Search Engine that answers questions from private PDF documents.',
      tools: ['OpenAI API', 'LangChain', 'Llama 3', 'Pinecone', 'ChromaDB']
    },
    {
      id: 5,
      title: 'Build AI Applications',
      subtitle: 'Create intelligent apps that solve real-world problems',
      icon: Smartphone,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      description: 'Transform standalone AI models into complete, responsive user-facing web applications and autonomous AI agents.',
      topics: [
        'Designing Full-Stack AI Web Interfaces with React & Streamlit',
        'Building Autonomous AI Agents with Tool-Calling & Memory',
        'FastAPI & Node.js backend development for AI microservices',
        'Managing async streams and server-sent events (SSE) for AI text responses',
        'User Authentication & Rate Limiting for AI Apps'
      ],
      practicalTask: 'Construct a full-stack AI Web Assistant with interactive chat UI and document processing.',
      tools: ['React', 'FastAPI', 'Streamlit', 'Node.js', 'TailwindCSS']
    },
    {
      id: 6,
      title: 'Deploy & Showcase',
      subtitle: 'Deploy your models and showcase your AI projects',
      icon: Rocket,
      color: 'from-amber-600 to-red-600',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Take your AI applications live to the cloud! Deploy on production servers, build a standout developer portfolio, and present your work to employers or clients.',
      topics: [
        'Cloud Deployment: Vercel, Render, HuggingFace Spaces & AWS',
        'Containerizing AI apps with Docker',
        'Optimizing AI inference latency & memory footprint',
        'Creating a high-impact GitHub portfolio and project documentation',
        'How to pitch AI solutions to clients, startups, and hiring managers'
      ],
      practicalTask: 'Deploy your capstone AI application live with custom URL and shareable portfolio link.',
      tools: ['Docker', 'Vercel', 'HuggingFace Spaces', 'Git', 'AWS']
    }
  ];

  return (
    <section id="curriculum" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af3715_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>WHAT YOU’LL LEARN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Comprehensive 6-Module <br />
            <span className="gold-text">AI Builder Curriculum</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Structured step-by-step from zero background knowledge to deploying live production-grade AI applications.
          </p>
        </div>

        {/* 6 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((mod, index) => {
            const Icon = mod.icon;
            const isOpen = activeModuleIndex === index;

            return (
              <div
                key={mod.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isOpen
                    ? 'bg-slate-950 border-amber-400 shadow-xl shadow-amber-500/10 ring-1 ring-amber-400/50'
                    : 'bg-slate-950/70 border-slate-800 hover:border-amber-500/40 hover:bg-slate-950'
                }`}
              >
                {/* Module Header Header */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-400">
                      MODULE 0{mod.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      {mod.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-300/80 mt-1">
                      {mod.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {mod.description}
                  </p>

                  {/* Expand/Collapse Toggle */}
                  <button
                    onClick={() => setActiveModuleIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>{isOpen ? 'Hide Module Details' : 'Explore Curriculum Details'}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Expandable Module Content */}
                  {isOpen && (
                    <div className="pt-4 space-y-4 border-t border-slate-800 animate-fadeIn">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                          Key Learning Topics:
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {mod.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Practical Hands-on Task */}
                      <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs space-y-1">
                        <div className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] flex items-center gap-1">
                          <Terminal className="w-3 h-3 text-indigo-400" />
                          Hands-on Project Task:
                        </div>
                        <p className="text-slate-300 italic">{mod.practicalTask}</p>
                      </div>

                      {/* Framework Badges */}
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Tools & Frameworks Covered:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {mod.tools.map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-amber-300">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-400/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-display font-extrabold text-white">
              Ready to Master AI from Scratch?
            </h3>
            <p className="text-slate-300 text-sm">
              Get full lifetime access to all 6 modules, 4 hands-on capstone projects & certificate for only <strong className="text-amber-400">₹399</strong>.
            </p>
          </div>

          <button
            onClick={onOpenEnrollment}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 hover:scale-105 transition-transform flex items-center gap-2 shrink-0"
          >
            <span>ENROLL FOR ₹399</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
