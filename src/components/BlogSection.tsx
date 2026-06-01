import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Search, 
  X, 
  Copy, 
  Check, 
  Terminal, 
  Cpu, 
  Database, 
  Sparkles,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { BLOG_POSTS } from '../blogData';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Categories list
  const categories = ['All', 'AI Engineering', 'Backend & Systems'];

  // Filter posts
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Get dynamic icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Engineering':
        return <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />;
      case 'Backend & Systems':
        return <Database className="w-4 h-4 text-emerald-400" />;
      default:
        return <Terminal className="w-4 h-4 text-indigo-400" />;
    }
  };

  // Get dynamic theme matching colors
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'AI Engineering':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
      case 'Backend & Systems':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
    }
  };

  // Handle rich markdown rendering preview
  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Custom inline renderer for Timothy's articles
  const renderMarkdownContent = (content: string) => {
    const blocks = content.split('\n\n');
    return blocks.map((block, blockIdx) => {
      const trimmed = block.trim();
      
      // 1. Check for Code Block
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const firstLine = lines[0];
        const lang = firstLine.replace('```', '') || 'code';
        const codeText = lines.slice(1, lines.length - 1).join('\n');
        const codeBlockId = `code-block-${blockIdx}`;

        return (
          <div key={blockIdx} className="my-6 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            {/* Terminal Window Chrome bar */}
            <div className="bg-[#0b0c16] px-4 py-2 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 block"></span>
                <span className="text-[10px] font-mono text-zinc-400 font-extrabold ml-2 uppercase tracking-wider">
                  {lang}_pipeline_segment
                </span>
              </div>
              <button 
                onClick={() => handleCopyCode(codeText, codeBlockId)}
                className="p-1 px-2 rounded hover:bg-white/5 text-zinc-400 hover:text-white flex items-center gap-1 font-mono text-[10px] font-bold cursor-pointer transition-colors"
                title="Copy pipeline snippet"
              >
                {copiedId === codeBlockId ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
            {/* Real code output box */}
            <pre className="bg-[#05050b] p-4 overflow-x-auto text-[11px] font-mono text-indigo-200/90 leading-relaxed scrollbar-thin border-t border-white/5">
              <code>{codeText}</code>
            </pre>
          </div>
        );
      }

      // 2. Check for Heading 3 (###)
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={blockIdx} className="font-display text-base md:text-lg font-black text-white mt-8 mb-3 tracking-tight">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // 3. Check for Heading 4 (####)
      if (trimmed.startsWith('#### ')) {
        return (
          <h4 key={blockIdx} className="font-sans text-xs font-extrabold text-zinc-300 mt-5 mb-2 uppercase tracking-wide">
            {trimmed.replace('#### ', '')}
          </h4>
        );
      }

      // 4. Check for Bullet list items
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={blockIdx} className="space-y-2.5 my-4 pl-1">
            {items.map((item, itemIdx) => {
              const cleanText = item.replace(/^[*-\s]+/, '');
              return (
                <li key={itemIdx} className="flex gap-2.5 items-start text-xs text-zinc-350 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                  <span className="text-zinc-300">
                    {cleanText.includes('**') ? parseInlineFormatting(cleanText) : cleanText}
                  </span>
                </li>
              );
            })}
          </ul>
        );
      }

      // 5. Check for Numbered list items
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n');
        return (
          <ol key={blockIdx} className="space-y-2.5 my-4 pl-1">
            {items.map((item, itemIdx) => {
              const match = item.match(/^(\d+)\.\s(.*)/);
              if (!match) return null;
              const num = match[1];
              const cleanText = match[2];
              return (
                <li key={itemIdx} className="flex gap-2.5 items-start text-xs text-zinc-350 leading-relaxed">
                  <span className="font-mono text-xs text-indigo-400 font-extrabold w-4 shrink-0 text-right">{num}.</span>
                  <span className="text-zinc-300">
                    {cleanText.includes('**') ? parseInlineFormatting(cleanText) : cleanText}
                  </span>
                </li>
              );
            })}
          </ol>
        );
      }

      // 6. Generic Paragraph
      return (
        <p key={blockIdx} className="text-xs text-zinc-300 leading-relaxed my-4 text-justify">
          {trimmed.includes('**') || trimmed.includes('`') ? parseInlineFormatting(trimmed) : trimmed}
        </p>
      );
    });
  };

  // Helper to parse double asterisks and backticks inline
  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={idx} className="bg-white/5 border border-white/10 text-indigo-300 text-[10px] font-mono py-0.5 px-1.5 rounded font-semibold">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <section id="blog-section" className="py-20 border-b border-white/5 bg-[#030014] relative overflow-hidden grid-bg">
      {/* Implements soft cosmic glowing backgrounds */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Thought Leadership
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Consulting Blog & Systems Insights
          </h2>
          <p className="text-sm text-zinc-400 font-medium font-sans">
            Timothy's operational field notes on designing low-latency RAG architectures, robust async background worker pools, and state-machine loop back models.
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="max-w-5xl mx-auto mb-12 flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-white/5 p-1 rounded-xl self-start sm:self-auto border border-white/10 shadow-lg backdrop-blur-md">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-1.5 px-4 rounded-lg font-sans text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === category 
                    ? 'bg-indigo-600/20 text-indigo-400 shadow-sm border border-indigo-500/30' 
                    : 'text-zinc-450 text-zinc-400 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar inputs */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts or stack tags..."
              className="w-full bg-white/5 border border-white/10 text-xs text-zinc-200 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-[#07070f] focus:ring-1 focus:ring-indigo-500/35 font-sans font-medium placeholder-zinc-500 shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

        </div>

        {/* Blog Posts Grid layout */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredPosts.map(post => (
              <article 
                key={post.id}
                className="glass-card hover:border-indigo-500/30 hover:shadow-2xl rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group"
              >
                
                {/* Meta details & Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 border text-[10px] font-mono font-bold rounded-md flex items-center gap-1.5 leading-none ${getCategoryBadgeClass(post.category)}`}>
                      {getCategoryIcon(post.category)}
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500 font-bold">
                      <Clock className="w-3 h-3 text-zinc-650 text-zinc-500" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setActivePost(post)}
                    className="font-display text-base font-black text-white group-hover:text-indigo-400 cursor-pointer pt-1 transition-colors leading-snug tracking-tight"
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer and dynamic tags */}
                <div className="space-y-4 pt-6 mt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[9px] font-mono text-zinc-400 border border-white/5 rounded bg-white/5 px-1.5 py-0.5 font-bold">
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-[9px] font-mono text-zinc-500 border border-white/5 rounded px-1.5 py-0.5 font-bold">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action Link button */}
                  <button
                    onClick={() => setActivePost(post)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-bold font-sans flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Read Article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card border border-white/10 rounded-2xl max-w-lg mx-auto p-8 space-y-4">
            <BookOpen className="w-10 h-10 text-zinc-500 mx-auto opacity-70" />
            <h3 className="font-display font-black text-white text-sm">No operational articles match</h3>
            <p className="text-xs text-zinc-400 font-medium max-w-sm mx-auto leading-relaxed">
              We couldn't locate any consulting documents matches for search term: "{searchQuery}". Try modifying filters or search query bounds.
            </p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 bg-indigo-600 text-white font-sans text-xs font-bold rounded-lg cursor-pointer hover:bg-indigo-500 shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Interactive Modal Slider Overlay */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md p-4 cursor-default animate-fadeIn">
          {/* Modal content viewport */}
          <div 
            id="blog-modal"
            className="bg-[#09090f] border border-white/10 shadow-2xl rounded-2xl w-full max-w-3xl h-full max-h-[90vh] overflow-y-auto flex flex-col justify-between relative animate-slideLeft hover:border-indigo-500/20 transition-all duration-300"
          >
            {/* Modal Navigation header */}
            <div className="sticky top-0 bg-[#09090f]/95 backdrop-blur-md border-b border-white/5 p-4 px-6 md:px-8 mt-0.5 z-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 border text-[10px] font-mono font-bold rounded-md flex items-center gap-1.5 leading-none ${getCategoryBadgeClass(activePost.category)}`}>
                  {getCategoryIcon(activePost.category)}
                  {activePost.category}
                </span>
                <span className="text-[10px] font-mono text-zinc-450 text-zinc-400 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {activePost.date}
                </span>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="p-1 px-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-zinc-300 hover:text-white font-sans text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                title="Close article console"
              >
                <X className="w-3.5 h-3.5" />
                <span>ESC</span>
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-6 md:p-8 space-y-6 flex-grow max-w-none max-w-3xl">
              
              {/* Main Title display */}
              <h1 className="font-display text-2xl md:text-3xl font-black text-white leading-snug tracking-tight">
                {activePost.title}
              </h1>

              {/* Read Time info line */}
              <div className="flex items-center gap-4 py-2 border-y border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold font-sans">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{activePost.readTime} pipeline duration</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold font-sans">
                  <Bookmark className="w-4 h-4 text-emerald-400" />
                  <span>Consulting Insights</span>
                </div>
              </div>

              {/* Dynamic formatting article content */}
              <div className="pt-2">
                {renderMarkdownContent(activePost.content)}
              </div>

              {/* Detailed tech tags layout */}
              <div className="pt-8 border-t border-white/5 space-y-3">
                <h4 className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Index Technologies Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activePost.tags.map(tag => (
                    <span key={tag} className="text-xs font-sans font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Call Action footer */}
            <div className="border-t border-white/5 p-6 md:p-8 bg-white/5 rounded-b-2xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="space-y-1">
                <h5 className="text-xs font-extrabold text-white">Operational Inquiries?</h5>
                <p className="text-[11px] text-zinc-400 leading-normal max-w-sm">
                  Want to apply these paradigms (caches or agent nodes) to your enterprise workflows?
                </p>
              </div>
              <button
                onClick={() => {
                  setActivePost(null);
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-sans flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(99,102,241,0.35)]"
              >
                Inquire For Solutions
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
