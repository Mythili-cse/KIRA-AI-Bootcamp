import React, { useState } from 'react';
import { KiraLogo } from '../common/KiraLogo';
import { 
  Sparkles, 
  Bot, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Zap, 
  Shield, 
  Users, 
  Award,
  Layers,
  Code2
} from 'lucide-react';

interface HeroSectionProps {
  onOpenEnrollment: () => void;
  onSelectTab: (tab: string) => void;
  onToggleBrochureMode: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenEnrollment,
  onSelectTab,
  onToggleBrochureMode,
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(null);

  const samplePrompts = [
    {
      title: 'GenAI RAG Bot',
      prompt: 'Build a RAG chatbot using OpenAI API, Python & Pinecone vector search',
      codeSnippet: `from langchain.vectorstores import Pinecone\nfrom langchain.llms import OpenAI\n\n# Initialize RAG Pipeline\nrag_agent = Agent(llm=OpenAI(model="gpt-4o"), retriever=db.as_retriever())\nresponse = rag_agent.run("Analyze Q3 report summary")`,
      result: '✓ Deployed RAG Pipeline in 45ms with 99.4% factual accuracy.',
    },
    {
      title: 'ML Model Fine-Tuning',
      prompt: 'Train & fine-tune a PyTorch Neural Classifier on custom dataset',
      codeSnippet: `import torch\nimport torch.nn as nn\n\nclass KIRAClassifier(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.encoder = TransformerEncoder()\n    def forward(x): return self.encoder(x)`,
      result: '✓ Model Accuracy: 98.7% | Validation Loss: 0.014',
    },
    {
      title: 'AI Vision & LLM Agent',
      prompt: 'Create autonomous multi-modal agent for image & code synthesis',
      codeSnippet: `import { KiraAgent } from '@kira/ai-studio';\n\nconst agent = new KiraAgent({ tools: ['vision', 'code-exec'] });\nconst app = await agent.createApp('Image Sentiment Analyzer');`,
      result: '✓ Full-Stack AI App Deployed to Vercel Cloud.',
    },
  ];

  const handleRunDemo = () => {
    setIsGenerating(true);
    setOutputResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setOutputResult(samplePrompts[selectedPrompt].result);
    }, 1000);
  };

  return (
    <section className="relative pt-8 pb-20 overflow-hidden bg-slate-950 text-white">
      {/* Background Decorative Grid & Ambient AI Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-indigo-600/15 to-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Banner matching reference flyer */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>BUILD INTELLIGENCE. SOLVE REAL-WORLD PROBLEMS. CREATE THE FUTURE.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Logo Badge Header */}
            <div className="flex justify-center lg:justify-start">
              <KiraLogo variant="light" size="lg" />
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                Comprehensive Hands-On Masterclass
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-none">
                AI BUILDER <br />
                <span className="gold-text uppercase drop-shadow-[0_4px_25px_rgba(212,175,55,0.4)]">
                  BOOTCAMP
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-amber-300/90 tracking-wide">
                From Curiosity to Creation — Build AI that Makes an Impact.
              </p>
            </div>

            {/* Overview Core Value Statement */}
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center gap-3 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Learn. Experiment. Build.</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Unlock the power of AI tools, models, and frameworks to build intelligent applications & real-world solutions from ground zero. No prior experience needed!
              </p>

              {/* Quick Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span>Hands-on Code</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Verified Certificate</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-300 col-span-2 sm:col-span-1">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span>4 Real AI Projects</span>
                </div>
              </div>
            </div>

            {/* Pricing Card & CTA Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              
              {/* Highlight Price Tag Badge matching prompt requirement (₹399) */}
              <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border-2 border-amber-400/60 shadow-xl shadow-amber-500/15">
                <div className="flex flex-col">
                  <div className="text-[10px] uppercase tracking-widest font-black text-amber-400">
                    LIMITED TIME SPECIAL FEE
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">₹399</span>
                    <span className="text-sm line-through text-slate-500">₹999</span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded">
                      SAVE 69%
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">One-Time Payment • Lifetime Access</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenEnrollment}
                  className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span>ENROLL NOW FOR ₹399</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTab('curriculum')}
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-semibold text-sm bg-slate-900 text-slate-200 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-800 transition-all"
                >
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Curriculum</span>
                </button>
              </div>
            </div>

            {/* Social Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span><strong className="text-white">1,240+</strong> Students Enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Zero Prior Coding Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span>Instant Access After Enrollment</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive AI Studio Sandbox Simulator Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-slate-900/90 border-2 border-amber-500/30 shadow-2xl shadow-indigo-950/50 p-6 backdrop-blur-xl overflow-hidden">
              
              {/* Floating Decorative Robot & Neural Aura matching poster art */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/20">
                    <Bot className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base">KIRA AI Studio Lab</h3>
                    <p className="text-xs text-slate-400">Interactive Prompt & Code Simulator</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Sample Prompt Selector Tabs */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Select Bootcamp Topic Demo:</span>
                  <Code2 className="w-4 h-4 text-amber-400" />
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {samplePrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedPrompt(idx);
                        setOutputResult(null);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold transition-all text-center ${
                        selectedPrompt === idx
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-amber-500/30'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

                {/* Prompt Prompt Input Box */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                    Prompt Input:
                  </div>
                  <p className="text-slate-200 font-mono italic">
                    "{samplePrompts[selectedPrompt].prompt}"
                  </p>
                </div>

                {/* Simulated Code Window */}
                <div className="relative p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 font-mono text-[11px] leading-relaxed text-amber-200/90 overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      kira_app_pipeline.py
                    </span>
                    <span className="text-slate-500">Python 3.11 • PyTorch</span>
                  </div>
                  <pre className="whitespace-pre-wrap">{samplePrompts[selectedPrompt].codeSnippet}</pre>
                </div>

                {/* Run Interactive Simulator Button */}
                <button
                  onClick={handleRunDemo}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Executing AI Model Pipeline...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Run AI Builder Test Code</span>
                    </>
                  )}
                </button>

                {/* Output Result Container */}
                {outputResult && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs animate-fadeIn">
                    {outputResult}
                  </div>
                )}
              </div>

              {/* Bottom Quick Feature Banner */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>⚡ Practical Hands-on Projects</span>
                <span className="text-amber-400 font-bold">₹399 Special Fee</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
