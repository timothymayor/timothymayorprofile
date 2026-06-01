import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Github,
  Linkedin,
  Cpu, 
  Workflow, 
  ChevronRight, 
  Briefcase, 
  Calendar, 
  Star, 
  Send, 
  CheckCircle2, 
  Terminal, 
  Server,
  Code2,
  Clock,
  ChevronDown,
  Building,
  FileText,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  PROJECTS, 
  WORK_EXPERIENCE, 
  SKILL_CATEGORIES 
} from './data';
import Navbar from './components/Navbar';
import MapSection from './components/MapSection';
import BlogSection from './components/BlogSection';

export default function App() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<string>('inteldesk');
  
  // Experience Accordion state
  const [expandedWorkIdx, setExpandedWorkIdx] = useState<number>(0);

  // Form simulated API connection
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactService, setContactService] = useState('Consulting Proposal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLogs, setSubmitLogs] = useState<string[]>([]);
  const [formSuccess, setFormSuccess] = useState(false);

  // Filter skills
  const skillsToDisplay = activeSkillCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter(cat => cat.category === activeSkillCategory);

  const handleContactSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      alert("Please fill in all standard validation fields.");
      return;
    }
    setIsSubmitting(true);
    setSubmitLogs([]);
    setFormSuccess(false);

    const logsArray = [
      `POST /api/v1/triage/handshake - Handshake initiated`,
      `[SECURE TLS] Connection encrypted. Parsing input parameters for form validation...`,
      `[INFO] Data package successfully verified: Name={${contactName}} Email={${contactEmail}}`,
      `[REDIS] Enqueuing task "notification:contact_submission" to Celery queue...`,
      `[QUEUE STATE] Job ID: TX_${Math.random().toString(36).substring(3, 8).toUpperCase()} - Pri: high`,
      `[BACKEND WORKER] Thread-04 popping task off pipeline queue...`,
      `[WORKER INGEST] Dispatching SMTP gateway callback thread to: ${contactEmail}`,
      `[AUDIT LOG] Message written securely to postgres database store system.`,
      `[SUCCESS] Dispatch loop complete. HTTP Status: 201 Created`
    ];

    // Staggered log display
    logsArray.forEach((logLine, idx) => {
      setTimeout(() => {
        setSubmitLogs(prev => [...prev, logLine]);
        if (idx === logsArray.length - 1) {
          setIsSubmitting(false);
          setFormSuccess(true);
          // clear fields
          setContactName('');
          setContactEmail('');
          setContactMessage('');
        }
      }, (idx + 1) * 350);
    });
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-zinc-100 antialiased font-sans selection:bg-indigo-500/20 selection:text-white relative overflow-x-hidden">
      
      {/* Structural Nav Overlay */}
      <Navbar onContactClick={() => handleScrollToSection('contact-section')} />

      {/* Decorative Cosmic Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-2/4 left-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Hero Section */}
      <header id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline Intro */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Location Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 shadow-xl backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-mono font-semibold">{PERSONAL_INFO.location}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-2" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold">Available for Consults</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <span className="font-mono text-xs md:text-sm tracking-widest text-indigo-400 uppercase font-bold block">
                  {PERSONAL_INFO.tagline}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 pt-1">
                  {PERSONAL_INFO.title}
                </p>
              </div>

              {/* Overview paragraph */}
              <div className="space-y-4 max-w-2xl text-zinc-400 text-sm sm:text-base leading-relaxed font-sans font-medium">
                <p>{PERSONAL_INFO.overview[0]}</p>
                <p>{PERSONAL_INFO.overview[1]}</p>
              </div>

              {/* Contact Quick Meta Icons / Mobile layout */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-zinc-500 font-mono font-semibold">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-all">{PERSONAL_INFO.email}</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  <a href={PERSONAL_INFO.portfolioUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all">{PERSONAL_INFO.portfolioUrl.replace('http://', '')}</a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => handleScrollToSection('projects-section')}
                  className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.55)]"
                >
                  <Cpu className="w-4 h-4 text-white" strokeWidth={2.5} />
                  Explore Projects
                </button>
                <button
                  onClick={() => handleScrollToSection('contact-section')}
                  className="px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 font-bold text-xs tracking-wide uppercase transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  Hire Me
                </button>
              </div>
            </div>

            {/* Right: Quick Stats & AI Architecture Representation */}
            <div className="lg:col-span-5 relative">
              <div className="relative p-6 bg-zinc-950/40 border border-white/5 backdrop-blur-xl rounded-2xl md:p-8 shadow-2xl flex flex-col justify-between space-y-6">
                
                {/* Stats Header design */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono text-xs tracking-wider text-zinc-400 font-bold uppercase">System Telemetry</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20">
                    SYSTEM: ACTIVE
                  </span>
                </div>

                {/* Grid stats */}
                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="p-4 bg-white/5 border border-white/5 rounded-lg hover:border-indigo-500/20 hover:bg-[#090916]/40 transition-all duration-300">
                    <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider font-bold block">EXPERIENCE PROFILE</span>
                    <span className="font-display text-2xl font-extrabold text-white mt-1 block tracking-tight">12+ Years</span>
                    <span className="text-[10px] text-zinc-400 font-sans block mt-1">Backend & AI Integration</span>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/5 rounded-lg hover:border-indigo-500/20 hover:bg-[#090916]/40 transition-all duration-300">
                    <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider font-bold block">ENTERPRISE BUILDS</span>
                    <span className="font-display text-2xl font-extrabold text-white mt-1 block tracking-tight">3 Core</span>
                    <span className="text-[10px] text-zinc-400 font-sans block mt-1">SaaS & Agent Platforms</span>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/5 rounded-lg hover:border-indigo-500/20 hover:bg-[#090916]/40 transition-all duration-300">
                    <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider font-bold block">DEPLOYMENT UPTIME</span>
                    <span className="font-display text-2xl font-extrabold text-white mt-1 block tracking-tight">99.99%</span>
                    <span className="text-[10px] text-zinc-400 font-sans block mt-1">AWS & Docker Isolated</span>
                  </div>

                  <div className="p-4 bg-white/5 border border-white/5 rounded-lg hover:border-indigo-500/20 hover:bg-[#090916]/40 transition-all duration-300">
                    <span className="text-zinc-500 text-[9px] uppercase font-mono tracking-wider font-bold block">MODELS INTEGRATED</span>
                    <span className="font-display text-2xl font-extrabold text-white mt-1 block tracking-tight">15+ Served</span>
                    <span className="text-[10px] text-zinc-400 font-sans block mt-1">LangChain/RAG Agents</span>
                  </div>

                </div>

                {/* Small live schematic visual representation */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>FastAPI + Python Core v3.11</span>
                  </div>
                  <span>Docker Containers</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Core competencies brief summary block */}
      <section className="py-12 border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="font-mono text-xs tracking-widest text-zinc-500 font-bold uppercase block mb-1">Deep Architectural Domain Expertise</span>
            <div className="h-px w-20 bg-indigo-500/30 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {PERSONAL_INFO.coreCompetencies.map((comp, idx) => (
              <div 
                key={idx}
                className="p-3 bg-white/5 border border-white/5 rounded-lg text-center flex flex-col items-center justify-center min-h-[75px] group hover:border-indigo-500/30 hover:bg-indigo-650/10 hover:shadow-indigo-500/5 hover:shadow-2xl transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mb-2 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all"></span>
                <span className="font-mono text-[10px] font-bold text-zinc-400 group-hover:text-indigo-400 transition-colors leading-normal tracking-tight">
                  {comp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase section */}
      <section id="projects-section" className="py-20 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-bold">Selected Project Portfolio</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Production-Grade Enterprise Systems
            </h2>
            <p className="text-sm text-zinc-400">
              Timothy has architected and built proprietary enterprise solutions for internal knowledge discovery, high-precision OCR extraction, and event-driven pipeline scheduling.
            </p>
          </div>

          {/* Metric Selector Projects Slider buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {PROJECTS.map((proj) => {
              const isActive = selectedProject === proj.id;
              
              const colors = {
                activeBorder: 'border-indigo-500/50 ring-1 ring-indigo-500/20 bg-indigo-950/25',
                text: 'text-indigo-400',
                pills: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
              };

              return (
                <div
                  id={`project-card-${proj.id}`}
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj.id);
                  }}
                  className={`p-6 border rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-2xl backdrop-blur-md ${
                    isActive 
                      ? `${colors.activeBorder}` 
                      : 'border-white/5 bg-white/5 text-zinc-350 hover:border-indigo-500/30 hover:bg-white/10'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Brand header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-[#030014]/40 border border-white/5 ${colors.text}`}>
                          {proj.id === 'inteldesk' && <Cpu className="w-5 h-5 text-indigo-400" />}
                          {proj.id === 'doculens' && <FileText className="w-5 h-5 text-indigo-400" />}
                          {proj.id === 'worklinehq' && <Workflow className="w-5 h-5 text-indigo-400" />}
                        </div>
                        <div>
                          <h3 className="font-display font-extrabold text-white uppercase tracking-wide text-xs">{proj.name}</h3>
                          <span className="font-mono text-[9px] text-zinc-500 font-semibold">{proj.stack.join(' • ')}</span>
                        </div>
                      </div>
                      
                      {isActive && (
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${colors.pills} font-bold`}>
                          ACTIVE SIMULATOR
                        </span>
                      )}
                    </div>

                    {/* Tagline descriptor */}
                    <p className="font-sans text-xs text-zinc-200 font-bold leading-snug">
                      {proj.tagline}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-1.5 pt-2">
                      {proj.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="text-[11px] text-zinc-400 flex items-start gap-1 font-medium">
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold">CLICK TO INSPECT ARCHITECTURE</span>
                    <span className={`font-mono text-[11px] font-extrabold flex items-center gap-1 ${colors.text}`}>
                      Sandbox Details <ArrowRight className="w-3 h-3 text-indigo-400 animate-pulse" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Project View */}
          {PROJECTS.map((proj) => {
            if (proj.id !== selectedProject) return null;
            const themeClass = "text-indigo-400 border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20";

            return (
              <div 
                id={`project-detail-${proj.id}`}
                key={proj.id} 
                className="p-6 md:p-8 bg-[#090914]/40 border border-white/5 backdrop-blur-xl rounded-2xl animate-fadeIn shadow-2xl space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Features Box */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <span className="font-mono text-xs text-zinc-500 font-bold uppercase tracking-wider block mb-2">System Scope & Capability</span>
                      <h4 className="font-display text-xl md:text-2xl font-extrabold text-white">{proj.name} Detailed Feature Matrix</h4>
                    </div>

                    <ul className="grid grid-cols-1 gap-4 font-sans text-xs md:text-sm">
                      {proj.keyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-indigo-400" />
                          <div>
                            <p className="text-zinc-200 leading-relaxed font-bold">{feat.split(' with ')[0]}</p>
                            {feat.includes(' with ') && (
                              <p className="text-[11px] text-zinc-550 text-zinc-400 font-semibold mt-1">Implement with: {feat.split(' with ')[1]}</p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Highlights & Impact Summary */}
                  <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      
                      {/* Architecture highlights */}
                      <div className="p-5 bg-[#030014]/65 border border-white/5 rounded-xl">
                        <h5 className="font-mono text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest flex items-center gap-1.5 mb-3.5">
                          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                          Engineering Highlights
                        </h5>
                        <ul className="space-y-2 text-xs text-zinc-300 font-mono font-medium">
                          {proj.architectureHighlights.map((high, hIdx) => (
                            <li key={hIdx} className="flex gap-2 items-start text-[11px] leading-relaxed">
                              <span className="text-indigo-400 font-bold mt-0.5 shrink-0">::</span>
                              <span>{high}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Business outcome & metrics */}
                      <div className="p-5 bg-[#030014]/65 border border-white/5 rounded-xl">
                        <h5 className="font-mono text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest flex items-center gap-1.5 mb-3">
                          <Star className="w-3.5 h-3.5 text-indigo-400" />
                          Impact & Outcomes
                        </h5>
                        <ul className="space-y-2 text-xs text-zinc-300 font-sans">
                          {proj.outcomeImpact.map((metric, mIdx) => (
                            <li key={mIdx} className="flex gap-2 items-start text-xs leading-relaxed font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                              <span className="text-zinc-300">{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>

                    {/* CTA button to consult on project */}
                    <button
                      onClick={() => handleScrollToSection('contact-section')}
                      className={`w-full py-3 px-4 rounded-lg font-mono text-xs font-bold text-center border flex items-center justify-center gap-2 cursor-pointer transition-all ${themeClass} shadow-[0_0_15px_rgba(99,102,241,0.25)]`}
                    >
                      <span>Inquire About Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* Professional Timeline / Work Experience section */}
      <section id="experience-section" className="py-20 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-bold">12 Years of Engineering Rigor</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Chronological Work Journey
            </h2>
            <p className="text-sm text-zinc-400 font-medium">
              Timothy has partnered with digital agencies, LMS clients, supermarkets, and ecommerce companies to deploy production servers, recommendation systems, and secure user portals.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {WORK_EXPERIENCE.map((work, idx) => {
              const isExpanded = expandedWorkIdx === idx;
              
              return (
                <div 
                  id={`work-item-${idx}`}
                  key={idx}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? 'bg-zinc-950/50 border-indigo-500/30 shadow-2xl' 
                      : 'bg-white/5 border-white/5 hover:border-indigo-500/20'
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setExpandedWorkIdx(isExpanded ? -1 : idx)}
                    className="w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-[#030014]/50 border border-white/5 rounded-xl text-indigo-400 shrink-0">
                        <Building className="w-5 h-5 text-indigo-455 text-indigo-400" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display text-base font-extrabold text-white">{work.role}</h4>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 font-mono font-bold">
                            {work.company}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-mono flex items-center gap-1 mt-1 font-semibold">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          {work.period}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5 justify-between sm:justify-end text-xs font-mono">
                      {/* Stack overview pill list on desktop */}
                      <div className="hidden md:flex flex-wrap gap-1.5 max-w-[300px] justify-end">
                        {work.stack.slice(0, 3).map((stk) => (
                          <span key={stk} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5 font-bold">
                            {stk}
                          </span>
                        ))}
                        {work.stack.length > 3 && (
                          <span className="text-[9px] text-zinc-550 text-zinc-500 px-1 font-extrabold">+{work.stack.length - 3}</span>
                        )}
                      </div>

                      <div className={`p-1.5 rounded-lg border border-white/5 text-zinc-500 duration-300 transition-all ${isExpanded ? 'rotate-180 bg-white/5 text-indigo-400 border-indigo-500/20' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Drawer Content */}
                  <div className={`transition-all duration-300 border-t border-white/5 bg-[#030014]/35 overflow-hidden ${
                    isExpanded ? 'max-h-[850px] p-5 sm:p-6' : 'max-h-0'
                  }`}>
                    <div className="space-y-5">
                      {/* Project achievements */}
                      <div className="space-y-3.5">
                        <h5 className="font-mono text-[10px] text-zinc-550 text-zinc-500 font-bold uppercase tracking-wider">PROJECT IMPACT & CORE TASKS</h5>
                        <ul className="space-y-3 font-sans text-xs sm:text-sm font-semibold">
                          {work.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2.5 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" />
                              <span className="text-zinc-300 leading-relaxed font-semibold">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technical Stack Complete Node Grid */}
                      <div className="pt-4 border-t border-white/5">
                        <h5 className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-2.5">ENVIRONMENT ENVIRONMENT STACK</h5>
                        <div className="flex flex-wrap gap-1.5">
                          {work.stack.map((stk) => (
                            <span 
                              key={stk} 
                              className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-white/5 text-zinc-200 border border-white/10"
                            >
                              {stk}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Structured Interactive Skills Filtering matrix */}
      <section id="skills-section" className="py-20 bg-[#030014] border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-bold text-center block">Skills Catalog Matrix</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Comprehensive Technology Stacks
            </h2>
            <p className="text-sm text-zinc-400 font-semibold">
              Timothy is fully proficient in compiling microservices using FastAPI, executing asynchronous loops, structuring database schemas, and loading deep model classifiers.
            </p>
          </div>

          {/* Filtering buttons row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-10">
            {['All', 'Languages', 'Backend Frameworks & Runtimes', 'Frontend UI', 'Databases & Caching', 'AI, Machine Learning & LLMs', 'DevOps & Cloud Infrastructure'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`py-2 px-4 rounded-lg font-sans text-xs font-bold transition-all duration-350 cursor-pointer border ${
                  activeSkillCategory === cat 
                    ? 'bg-indigo-650 bg-indigo-600 border-indigo-500 text-white shadow-xl' 
                    : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white h-10 hover:border-white/10'
                }`}
              >
                {cat === 'All' ? 'All Skills' : cat.replace(' Frameworks & Runtimes', '').replace(' Machine Learning & LLMs', ' & ML')}
              </button>
            ))}
          </div>

          {/* Active grid cards representation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skillsToDisplay.map((cat, idx) => (
              <div 
                key={idx} 
                className="p-5 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:shadow-2xl transition-all duration-300 shadow-xl"
              >
                <div>
                  <h4 className="font-display font-extrabold text-xs text-zinc-500 tracking-wider uppercase mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    {cat.category}
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {cat.skills.map((sk) => (
                      <div key={sk} className="p-2.5 rounded-lg bg-zinc-950/45 border border-white/5 font-mono text-zinc-300 truncate flex items-center gap-1.5">
                        <span className="text-[10px] text-indigo-400 font-bold font-extrabold">✓</span>
                        {sk}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 text-[9px] font-mono text-zinc-500 font-bold text-right">
                  EXPERT LEVEL STACK
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Map / Operational Reach Section */}
      <MapSection />

      {/* Blog & Thought Leadership Insights Section */}
      <BlogSection />

      {/* Consult API simulated contact form centerpiece */}
      <section id="contact-section" className="py-20 bg-[#030014] relative grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-bold block mb-2">Connect Directly</span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  AI Solutions Consultant
                </h3>
                <p className="text-xs text-zinc-400 font-semibold mt-3 leading-relaxed">
                  Have an AI integration challenge, data pipeline bottleneck, or consulting proposal? Use Timothy's live-connected contact simulator to trigger asynchronous ingestion workflows. Whether you need highly optimized semantic search (RAG) models, secure agentic state-machine workflows, or custom LLM API pipelines, reach out to secure a reliable operational launch.
                </p>
              </div>

              {/* Direct addresses List */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl relative overflow-hidden group hover:border-indigo-500/35 transition-all shadow-xl">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">INBOX ADDR</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-mono font-extrabold text-zinc-200 hover:text-indigo-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl relative overflow-hidden group hover:border-indigo-500/35 transition-all shadow-xl">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-indigo-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">LINKEDIN INDEX</span>
                    <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-extrabold text-zinc-200 hover:text-indigo-400 transition-colors">
                      /in/timothymayor
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl relative overflow-hidden group hover:border-indigo-500/35 transition-all shadow-xl">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-indigo-400 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">GITHUB CODEBASE</span>
                    <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-extrabold text-zinc-200 hover:text-indigo-400 transition-colors">
                      /timothymayor
                    </a>
                  </div>
                </div>
              </div>

              {/* Legal disclaimer */}
              <span className="text-[10px] font-mono text-zinc-500 tracking-tight block font-bold">
                © {new Date().getFullYear()} Timothy Stephen Mayor. Built securely using modular React & Tailwind CSS design.
              </span>
            </div>

            {/* Simulated pipeline workflow Contact Form */}
            <div className="lg:col-span-7 bg-zinc-950/45 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl hover:border-indigo-500/20 transition-all duration-300">
              
              {/* Form trigger layout */}
              <form onSubmit={handleContactSimulatedSubmit} className="space-y-4">
                
                <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-3">
                  <Terminal className="w-4 h-4 text-indigo-400" /> Secure Message Handshake Route
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 font-bold uppercase mb-1.5">Your Name</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 text-xs text-zinc-200 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-[#07070f] focus:ring-1 focus:ring-indigo-500/35 font-sans font-medium placeholder-zinc-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-500 font-bold uppercase mb-1.5">Secure Email</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. client@enterprise.com"
                      className="w-full bg-white/5 border border-white/10 text-xs text-zinc-200 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-[#07070f] focus:ring-1 focus:ring-indigo-500/35 font-sans font-medium placeholder-zinc-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 font-bold uppercase mb-1.5">Request Channel Option</label>
                  <select
                    id="form-service"
                    value={contactService}
                    onChange={(e) => setContactService(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-xs text-zinc-300 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-[#07070f] focus:ring-1 focus:ring-indigo-500/35 font-mono font-bold"
                  >
                    <option value="Consulting Proposal">SaaS Consulting Proposal (FastAPI/AI)</option>
                    <option value="Job Opportunity">Backend/AI Software Engineer Vacancy</option>
                    <option value="General Conversation">Systems Systems Architecture Brainstorming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-zinc-500 font-bold uppercase mb-1.5">Payload Description (Message)</label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Provide deep details of your environment workspace and requirements..."
                    className="w-full bg-white/5 border border-white/10 text-xs text-zinc-200 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-[#07070f] focus:ring-1 focus:ring-indigo-500/35 font-sans font-medium resize-none placeholder-zinc-500"
                  />
                </div>

                <button
                  id="btn-form-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-indigo-650 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin text-white" strokeWidth={3} /> Triaging Inbound Packet...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" /> Send Secure Request
                    </>
                  )}
                </button>
              </form>

              {/* Logs visual output container below the form */}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-col justify-between">
                
                {submitLogs.length > 0 && (
                  <div className="p-3 bg-zinc-950 border border-white/5 rounded-lg text-[10px] leading-relaxed font-mono font-medium text-zinc-350 space-y-1">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-indigo-400 font-bold mb-1.5 block">API Webhook Handler Logs</span>
                    {submitLogs.map((logLine, lIdx) => (
                      <div 
                        key={lIdx} 
                        className={`pl-2 border-l border-white/5 ${
                          logLine.includes('SUCCESS') ? 'text-green-400 font-bold' : logLine.includes('POST') ? 'text-indigo-400 font-bold' : 'text-zinc-500'
                        }`}
                      >
                        {logLine}
                      </div>
                    ))}
                  </div>
                )}

                {formSuccess && (
                  <div className="mt-2.5 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5 animate-fadeIn font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={2.5} />
                    <p>Message successfully triaged onto Celery/Redis memory thread! Timothy's SMTP triggers have saved your inquiry safely. Talk soon!</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
