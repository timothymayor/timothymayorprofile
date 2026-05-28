import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Terminal, 
  Download,
  Calendar
} from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['overview', 'projects-section', 'experience-section', 'skills-section', 'map-section', 'blog-section'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
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

  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects-section', label: 'Projects' },
    { id: 'experience-section', label: 'Experience' },
    { id: 'skills-section', label: 'Skills' },
    { id: 'map-section', label: 'Map' },
    { id: 'blog-section', label: 'Blog' }
  ];

  const triggerResumePrint = () => {
    window.print();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand/Signature */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display text-sm font-extrabold text-slate-900 tracking-tight block leading-none mb-0.5">
                {PERSONAL_INFO.name}
              </span>
              <span className="font-mono text-[9px] text-indigo-600 font-bold tracking-wider leading-none">
                12 Y_EXP.AI()
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 border border-slate-200/60 p-1 rounded-full">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`px-3.5 py-1 rounded-full font-sans text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeSection === item.id 
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/40' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right quick links */}
          <div className="hidden lg:flex items-center gap-3">
            <a 
              href={PERSONAL_INFO.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg transition-all"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4 text-slate-500 hover:text-indigo-600" />
            </a>
            <a 
              href={PERSONAL_INFO.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-indigo-650 hover:bg-slate-100 rounded-lg transition-all"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-slate-500 hover:text-indigo-600" />
            </a>
            <button
              onClick={triggerResumePrint}
              className="text-xs font-mono font-bold text-slate-500 hover:text-slate-800 p-2 hover:bg-slate-100 rounded-lg transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              PRINT_CV
            </button>
            <button
              onClick={onContactClick}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-sans text-xs font-bold transition-all shadow-sm"
            >
              Contact Me
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={triggerResumePrint}
              className="p-2 text-slate-500 hover:text-indigo-600"
              title="Print CV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-indigo-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 px-4 py-5 shadow-lg flex flex-col gap-4 animate-fadeIn">
          <div className="flex flex-col gap-1">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`py-2 text-left px-3 rounded-lg font-sans text-xs font-semibold ${
                  activeSection === item.id 
                    ? 'bg-indigo-50 text-indigo-600 font-bold border-l-2 border-indigo-600' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="h-px bg-slate-100 my-1"></div>
          
          <div className="flex items-center justify-between px-3">
            <div className="flex gap-2">
              <a 
                href={PERSONAL_INFO.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={PERSONAL_INFO.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <button
              onClick={onContactClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-sans text-xs font-bold"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
