import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  Cpu, 
  Layers, 
  Play, 
  CheckCircle, 
  Search, 
  FileText, 
  Terminal, 
  Workflow, 
  Activity, 
  Sparkles, 
  CornerDownRight, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  Server,
  RefreshCw,
  Sliders,
  Check,
  Send
} from 'lucide-react';
import { PROJECTS } from '../data';

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<'inteldesk' | 'doculens' | 'worklinehq'>('inteldesk');
  
  // Terminal logs state
  const [logs, setLogs] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    // Scroll terminal to bottom when logs are updated
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // === INTELDESK SIMULATOR STATES ===
  const [inteldeskDoc, setInteldeskDoc] = useState('SOP-RefundPolicy');
  const [inteldeskQuery, setInteldeskQuery] = useState('How long is the product refund window?');
  const [inteldeskStep, setInteldeskStep] = useState<number>(0); 
  const [inteldeskOutput, setInteldeskOutput] = useState('');
  const [inteldeskIsIndexing, setInteldeskIsIndexing] = useState(false);
  const [inteldeskIsSearching, setInteldeskIsSearching] = useState(false);
  const [highlightedVectorIdx, setHighlightedVectorIdx] = useState<number | null>(null);

  const inteldeskDocsList = [
    { 
      id: 'SOP-RefundPolicy', 
      name: 'RefundPolicy_v2.1.pdf',
      size: '24 KB',
      content: 'Standard operating refund policy. Customers are entitled to a full cash refund on all SaaS plans within 30 days of initial subscription purchase. Enterprise contracts have a custom 15-day cancellation period.',
      chunks: [
        "SaaS refund policy: Full refund on all standard web plans within 30 days of original registration.",
        "Enterprise contracts: Standard terms dictate custom cancellation period subject to a 15-day prior notice.",
        "Disputes & Auditing: All transactions processed through Stripe merchant ledger are subject to standard audit trails."
      ]
    },
    { 
      id: 'SOP-ApiDeployment', 
      name: 'API_Deployment_Guidelines.pdf',
      size: '42 KB',
      content: 'Internal dev guidelines. Backend FastAPI instances must boot in isolated Docker containers behind Nginx reverse proxies. Redis cache-aside must be validated prior to active traffic injection.',
      chunks: [
        "Infrastructure requirements: FastAPI application containers running on AWS ECS must maintain active health endpoints.",
        "Reverse gateway: Nginx processes inbound HTTPS requests, passing local proxies on loopback port 3000.",
        "Caching policy: Cache invalidation key-patterns must be executed on Redis queues immediately after database updates."
      ]
    }
  ];

  const currentInteldeskDoc = inteldeskDocsList.find(d => d.id === inteldeskDoc) || inteldeskDocsList[0];

  const handleIntelDeskIndex = () => {
    if (inteldeskIsIndexing) return;
    setInteldeskIsIndexing(true);
    setInteldeskStep(1); 
    setLogs([]);
    addLog(`INITIATING DOCUMENT INGESTION PIPELINE FOR: ${currentInteldeskDoc.name}`);
    
    setTimeout(() => {
      addLog(`[STEP 1] Parsing PDF binary stream ... Character count: ${currentInteldeskDoc.content.length}`);
      setInteldeskStep(2);
      
      setTimeout(() => {
        addLog(`[STEP 2] Chunking logic triggered: RecursiveCharacterTextSplitter(chunkSize=100, overlap=20)`);
        addLog(`Created ${currentInteldeskDoc.chunks.length} discrete semantic chunks.`);
        setInteldeskStep(3);

        setTimeout(() => {
          addLog(`[STEP 3] LangChain Connection -> Calling embedding service for vector calculation...`);
          addLog(`Vector dimension: 1536 (Normalized values)`);
          setInteldeskStep(4);

          setTimeout(() => {
            addLog(`[DB PGVector] Preparing transaction query. Writing vector nodes to secure postgreSQL database schema...`);
            currentInteldeskDoc.chunks.forEach((_, idx) => {
              addLog(`INSERT INTO workspace_knowledge_base (embedding, meta) VALUES (vector_data_chunk_${idx}, '{"chunk_id": ${idx}}');`);
            });
            setInteldeskStep(5);
            setInteldeskIsIndexing(false);
            addLog(`SUCCESS: ${currentInteldeskDoc.name} successfully indexed. Metadata cached inside Redis indices.`);
          }, 8000 * 0.15); // scaled for rapid yet engaging interaction
        }, 8000 * 0.15);
      }, 8000 * 0.12);
    }, 8000 * 0.1);
  };

  const handleIntelDeskQuery = () => {
    if (inteldeskStep < 5) {
      alert("Please index the knowledge document first to populate the vector matrix!");
      return;
    }
    if (inteldeskIsSearching) return;
    setInteldeskIsSearching(true);
    setInteldeskStep(6);
    addLog(`USER INQUIRY DETECTED: "${inteldeskQuery}"`);
    addLog(`[STEP 1] Generating dense vector embeddings for input question...`);

    setTimeout(() => {
      addLog(`[STEP 2] Querying Postgres with Cosine Distance query ... select * from active_knowledge order by embedding <=> query_embedding limit 3;`);
      setInteldeskStep(7);
      
      // Determine match index
      let matchIdx = 0; // standard refund answer
      if (inteldeskDoc === 'SOP-RefundPolicy') {
        matchIdx = inteldeskQuery.toLowerCase().includes('enterprise') ? 1 : 0;
      } else {
        matchIdx = inteldeskQuery.toLowerCase().includes('nginx') || inteldeskQuery.toLowerCase().includes('port') ? 1 : 0;
      }
      setHighlightedVectorIdx(matchIdx);

      setTimeout(() => {
        addLog(`[SIMILARITY MATCH] Found top candidate! Doc chunk ID: ${matchIdx} (Confidence metric: ${matchIdx === 0 ? '0.941' : '0.887'})`);
        addLog(`[STEP 3] Packing prompt payload context and transmitting securely to LLM model context window...`);
        setInteldeskStep(8);

        setTimeout(() => {
          addLog(`[LLM SERVICE] Executing content retrieval generation stream...`);
          setInteldeskStep(9);
          
          let responseText = "";
          if (inteldeskDoc === 'SOP-RefundPolicy') {
            responseText = matchIdx === 0 
              ? "Based on RefundPolicy_v2.1.pdf: Customers can receive a full cash refund on all standard web software SaaS subscriptions within 30 days of their initial purchase. (Verified via Section 1.a of document indices)"
              : "According to customized terms in RefundPolicy_v2.1.pdf: Enterprise levels fall under custom cancelling parameters which mandate a 15-day prior notice. (Verified via Section 1.b)";
          } else {
            responseText = matchIdx === 1
              ? "Based on API_Deployment_Guidelines.pdf: The reverse caching gateway utilizes Nginx to route outbound endpoints, proxying local ports specifically on loopback address port 3000."
              : "According to API_Deployment_Guidelines.pdf: All backend engineering servers powered by FastAPI are designed to spin up in Docker isolates running health check logs directly under AWS ECS instances.";
          }

          setInteldeskOutput(responseText);
          addLog(`[LLM STREAM END] Payload rendering complete.`);
          setInteldeskIsSearching(false);
        }, 8000 * 0.2);
      }, 8000 * 0.15);
    }, 8000 * 0.12);
  };


  // === DOCULENS STATES ===
  const [doculensType, setDoculensType] = useState<'invoice' | 'contract' | 'payslip'>('invoice');
  const [doculensStatus, setDoculensStatus] = useState<'idle' | 'scanning' | 'extracting' | 'completed'>('idle');
  const [doculensData, setDoculensData] = useState<any>(null);

  const docTemplates = {
    invoice: {
      fileName: "INV_2026_9011.png",
      aiClass: "TAX_INVOICE_SUBMISSION",
      confidence: "99.2%",
      extracted: {
        vendorName: "Acme Cloud Infrastructure Ltd",
        invoiceDate: "2026-05-18",
        taxAmount: "$432.50",
        invoiceTotal: "$4,757.50",
        detectedFields: ["VAT_88a", "IBAN_Routing", "PurchaseOrder_Ref_410"]
      }
    },
    contract: {
      fileName: "CLIENT_AGREEMENT_TSM_FINAL.pdf",
      aiClass: "LEGAL_VENDOR_CONTRACT",
      confidence: "97.8%",
      extracted: {
        vendorName: "Lighthouse Global Consulting",
        invoiceDate: "2026-04-01",
        taxAmount: "N/A - Direct",
        invoiceTotal: "$75,000.00",
        detectedFields: ["NDA_Clause_3", "Exclusivity_Sec_11", "LiabilityCap_1.5M"]
      }
    },
    payslip: {
      fileName: "EMP_PAYSLIP_MAY_2026.pdf",
      aiClass: "INTERNAL_PAYSLIP_RECORDS",
      confidence: "98.5%",
      extracted: {
        vendorName: "Timothy S. Mayor (Staff Index 024)",
        invoiceDate: "2026-05-25",
        taxAmount: "$1,210.00 (PAYE)",
        invoiceTotal: "$12,400.00 (Net)",
        detectedFields: ["BasicSalary_Node", "PensionDeduction", "BonusPayout_Sec_A"]
      }
    }
  };

  const handleDocuLensProcess = () => {
    setDoculensStatus('scanning');
    setLogs([]);
    addLog(`UPLOADING STREAM: ${docTemplates[doculensType].fileName} TO ACCELERATED AI PROCESSING RUNTIME`);
    
    setTimeout(() => {
      addLog(`[TensorFlow Classifier] Analyzing pixel map and grid structural layout anchors ...`);
      addLog(`[TF-MODEL] Run feed-forward inference on LayoutLM network pipeline...`);
      setDoculensStatus('extracting');

      setTimeout(() => {
        addLog(`[CLASSIFIER RETRIEVED] Match: ${docTemplates[doculensType].aiClass} (Confidence: ${docTemplates[doculensType].confidence})`);
        addLog(`[NLP Pipeline] Deploying regex structures & LLM-based zero-shot extractor keys...`);
        addLog(`Extracting key-value pairs based on document schema index...`);

        setTimeout(() => {
          setDoculensStatus('completed');
          setDoculensData(docTemplates[doculensType].extracted);
          addLog(`METADATA EXTRACTION COMPLETED! Document safely routed to audit reviewer queue.`);
          addLog(`Calculated validation hashes correctly.`);
        }, 8000 * 0.15);
      }, 8000 * 0.15);
    }, 8000 * 0.12);
  };


  // === WORKLINEHQ STATES ===
  const [worklineQueue, setWorklineQueue] = useState<Array<{id: string, name: string, status: string, age: number}>>([]);
  const [workerState, setWorkerState] = useState<'idle' | 'working' | 'cooldown'>('idle');
  const [activeWorkItem, setActiveWorkItem] = useState<string | null>(null);
  const [orchestratorStep, setOrchestratorStep] = useState<string>('Standby');

  const triggerWorklineJob = (jobType: string) => {
    const jobNames: Record<string, string> = {
      'signup': 'TASK: Welcome_Email_Dispatcher',
      'pdf': 'COMP: Generate_Report_PDF',
      'webhook': 'WEBHOOK: Dispatch_Partner_Triage'
    };
    
    const newJob = {
      id: Math.random().toString(36).substring(4, 9).toUpperCase(),
      name: jobNames[jobType] || 'TASK: General_Work_Queue',
      status: 'Enqueued (Redis MEM)',
      age: 0
    };

    setWorklineQueue(prev => [...prev, newJob]);
    setLogs([]);
    addLog(`[REDIS HOST] ENQUEUED NEW TRANSACTION: ${newJob.id} under queue 'tasks:background_processing'`);
    addLog(`Redis queue length increased to: ${worklineQueue.length + 1}`);
  };

  // Simulated worker processing queue loop
  useEffect(() => {
    if (worklineQueue.length > 0 && workerState === 'idle') {
      const activeJob = worklineQueue[0];
      setWorkerState('working');
      setActiveWorkItem(activeJob.id);
      setOrchestratorStep('Processing');
      addLog(`[BACKEND WORKER 01] Received job command! Popping job ${activeJob.id} off Redis memory cache table using BRPOP...`);

      // Update status of the active item
      setWorklineQueue(prev => prev.map((j, idx) => idx === 0 ? { ...j, status: 'Active (FastAPI VM)' } : j));

      setTimeout(() => {
        addLog(`[JOB PROCESS] Parsing tasks and reading payload values securely from state memory ledger...`);
        addLog(`[EXEC] Initializing subprocess logic. CPU cycles dedicated ... SUCCESS.`);
        
        setTimeout(() => {
          addLog(`[DB PG] Modifying workflow item status to COMPLETED inside primary transaction db...`);
          addLog(`[REDIS] Acknowledged! Clearing thread allocation block. Removing ${activeJob.id} locks.`);
          
          setWorklineQueue(prev => prev.slice(1));
          setWorkerState('cooldown');
          setActiveWorkItem(null);
          setOrchestratorStep('Acknowledging');

          setTimeout(() => {
            setWorkerState('idle');
            setOrchestratorStep('Standby');
          }, 300);
        }, 8000 * 0.15);
      }, 8000 * 0.1);
    }
  }, [worklineQueue, workerState]);


  // Quick resets when switching playground tabs
  const handleTabChange = (tab: 'inteldesk' | 'doculens' | 'worklinehq') => {
    setActiveTab(tab);
    setLogs([]);
    addLog(`INITIALIZED INTERACTIVE PLAYGROUND: ${PROJECTS.find(p => p.id === tab)?.name}`);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm" id="live-sandbox">
      {/* Sandbox Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="font-mono text-xs tracking-widest text-slate-500 font-bold uppercase">Architecture Playground</span>
          </div>
          <h3 className="font-display text-lg md:text-xl font-extrabold text-slate-800 flex items-center gap-2">
            Interactive Production Sandboxes
          </h3>
          <p className="text-xs text-slate-500 font-semibold font-sans mt-1">
            Timothy's core micro-systems are simulated below. Select a project card to query APIs, classify datasets, or push background events in real-time.
          </p>
        </div>

        {/* Project Selector tabs */}
        <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0">
          <button 
            id="tab-inteldesk"
            onClick={() => handleTabChange('inteldesk')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'inteldesk' 
                ? 'bg-white text-indigo-600 border border-slate-250 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            IntelDesk
          </button>
          <button 
            id="tab-doculens"
            onClick={() => handleTabChange('doculens')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'doculens' 
                ? 'bg-white text-indigo-600 border border-slate-250 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            DocuLens
          </button>
          <button
            id="tab-worklinehq" 
            onClick={() => handleTabChange('worklinehq')}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
              activeTab === 'worklinehq' 
                ? 'bg-white text-indigo-600 border border-slate-250 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            WorklineHQ
          </button>
        </div>
      </div>

      {// Split Screen: Controls & Schematic Visualizer vs. Live Stream logs
      }
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[460px]">
        {/* Controls Layout */}
        <div className="col-span-1 lg:col-span-3 p-6 border-r border-slate-200 flex flex-col justify-between bg-white">
          
          {/* Active Tab Area 1: INTELDESK */}
          {activeTab === 'inteldesk' && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-600 uppercase tracking-wider font-mono">
                    Semantic RAG Indexer & Q&A
                  </span>
                  <p className="text-sm text-slate-600 mt-2 font-medium">
                    Simulate how IntelDesk parses massive PDF streams, shards them into small chunks, formats embeddings, and retrieves source-checked solutions.
                  </p>
                </div>

                {/* Stepper Input 1: Document Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-600" /> SELECT KNOWLEDGE SOURCE DOCUMENT
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {inteldeskDocsList.map(doc => (
                        <button
                          key={doc.id}
                          id={`inteldesk-picker-${doc.id}`}
                          onClick={() => {
                            setInteldeskDoc(doc.id);
                            setInteldeskStep(0);
                            setInteldeskOutput('');
                            setHighlightedVectorIdx(null);
                          }}
                          className={`p-3 text-left rounded-lg border text-xs transition-all duration-300 ${
                            inteldeskDoc === doc.id
                              ? 'bg-indigo-50/50 border-indigo-300 text-indigo-850 font-extrabold'
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-705 font-medium'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono truncate max-w-[130px] font-bold">{doc.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold">{doc.size}</span>
                          </div>
                          <span className="text-[10px] text-slate-450 block truncate leading-relaxed">
                            {doc.content}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step Indicators and triggers */}
                  <div className="flex flex-col md:flex-row gap-3 items-stretch">
                    <button
                      id="btn-inteldesk-index"
                      onClick={handleIntelDeskIndex}
                      disabled={inteldeskIsIndexing}
                      className={`flex-1 py-2.5 px-4 rounded-lg font-mono text-xs font-bold text-center flex items-center justify-center gap-2 border transition-all duration-300 shadow duration-300 ${
                        inteldeskIsIndexing
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : inteldeskStep >= 5
                            ? 'bg-slate-50 border-indigo-200 text-indigo-600 font-extrabold'
                            : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-700 hover:shadow-sm cursor-pointer'
                      }`}
                    >
                      {inteldeskIsIndexing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Indexing Chunks...
                        </>
                      ) : inteldeskStep >= 5 ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          Document Fully Indexed
                        </>
                      ) : (
                        <>
                          <Layers className="w-4 h-4" />
                          Parse & Index Vector DB
                        </>
                      )}
                    </button>
                  </div>

                  {/* Input Form Question */}
                  <div className={`transition-all duration-300 ${inteldeskStep >= 5 ? 'opacity-100' : 'opacity-40 cursor-not-allowed pointer-events-none'}`}>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1 flex items-center gap-1">
                      <Search className="w-3 h-3 text-indigo-500" /> FORMULATE SEMANTIC SEARCH QUERY
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="input-inteldesk-query"
                        type="text"
                        value={inteldeskQuery}
                        onChange={(e) => setInteldeskQuery(e.target.value)}
                        placeholder="Search your document indices..."
                        className="flex-1 bg-slate-50 border border-slate-200 text-xs text-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500/50 font-sans font-semibold placeholder-slate-400"
                      />
                      <button
                        id="btn-inteldesk-query"
                        onClick={handleIntelDeskQuery}
                        disabled={inteldeskIsSearching || inteldeskStep < 5}
                        className="px-4 bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500 rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center shadow-sm"
                      >
                        {inteldeskIsSearching ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                        ) : (
                          <Send className="w-3.5 h-3.5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vector & LLM Visualizer Box */}
              <div className="mt-4 pt-4 border-t border-slate-150 space-y-3">
                <div className="text-[10px] font-mono text-slate-450 tracking-wider font-bold">INDEX VECTOR SPACE RETRIEVAL</div>
                
                {/* Vectors display */}
                <div className="grid grid-cols-3 gap-2">
                  {currentInteldeskDoc.chunks.map((ch, idx) => (
                    <div 
                      key={idx}
                      className={`p-2 rounded border text-[10px] font-mono transition-all duration-300 ${
                        highlightedVectorIdx === idx 
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-800 font-bold shadow-sm' 
                          : 'bg-slate-50 border-slate-150 text-slate-450'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-450 font-bold">NODE_{idx}</span>
                        {highlightedVectorIdx === idx && (
                          <span className="text-[9px] text-indigo-600 uppercase font-bold px-1 bg-indigo-50 border border-indigo-150 rounded flex items-center gap-0.5">
                            <Sparkles className="w-2 h-2" /> Match
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 leading-relaxed text-[9px] font-semibold">{ch}</p>
                    </div>
                  ))}
                </div>

                {/* LLM Output Result Display */}
                {inteldeskOutput && (
                  <div className="p-3.5 bg-white border border-slate-200 border-l-4 border-l-indigo-500 rounded-lg text-xs leading-relaxed text-slate-700 font-sans shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-mono text-[10px] uppercase font-bold text-indigo-600 tracking-wider">IntelDesk Synthesized Response:</span>
                    </div>
                    {inteldeskOutput}
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Active Tab Area 2: DOCULENS */}
          {activeTab === 'doculens' && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-600 uppercase tracking-wider font-mono">
                    TensorFlow Classification & NLP Extract
                  </span>
                  <p className="text-sm text-slate-600 mt-2 font-medium">
                    Simulate loading complex legal and accounting documents. See how neural network vision classifications detect structural grids, classify documents, and map text fields securely.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Select Template Type */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-indigo-600" /> CHOOSE DOCUMENT IMAGE/PDF FOR TRIAGE
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['invoice', 'contract', 'payslip'] as const).map(type => (
                        <button
                          key={type}
                          id={`doculens-picker-${type}`}
                          onClick={() => {
                            setDoculensType(type);
                            setDoculensStatus('idle');
                            setDoculensData(null);
                          }}
                          className={`p-2.5 rounded-lg border text-xs font-mono capitalize text-center transition-all duration-300 ${
                            doculensType === type 
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-805 font-bold' 
                              : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-705 font-medium'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Trigger */}
                  <button
                    id="btn-doculens-trigger"
                    onClick={handleDocuLensProcess}
                    disabled={doculensStatus === 'scanning' || doculensStatus === 'extracting'}
                    className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all duration-300 cursor-pointer ${
                      doculensStatus === 'scanning' || doculensStatus === 'extracting'
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-700 shadow-sm'
                    }`}
                  >
                    {doculensStatus === 'idle' ? (
                      <>
                        <Play className="w-4 h-4 text-white" /> Run NLP & Vision Pipeline
                      </>
                    ) : doculensStatus === 'scanning' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" /> TensorFlow Scanning Structure...
                      </>
                    ) : doculensStatus === 'extracting' ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" /> NLP Extraction Loop...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 text-white" /> Reset & Re-run Document
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Simulated Scanner Board Visualizer */}
              <div className="mt-4 pt-4 border-t border-slate-150">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Doc Preview mock */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4 relative min-h-[143px] flex flex-col justify-between overflow-hidden shadow-sm">
                    {/* Vision Scan line animation */}
                    {(doculensStatus === 'scanning' || doculensStatus === 'extracting') && (
                      <div className="absolute left-0 right-0 h-0.5 bg-indigo-500 shadow animate-bounce top-2 bottom-2 z-10" />
                    )}
                    
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <FileText className="w-8 h-8 text-indigo-600 shrink-0" />
                        <div>
                          <p className="text-xs font-mono font-bold text-slate-800">{docTemplates[doculensType].fileName}</p>
                          <p className="text-[9px] text-slate-450 font-mono font-bold">Format: API Binary Ingestion</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border leading-none font-bold ${
                        doculensStatus === 'completed' 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-450 animate-pulse'
                      }`}>
                        {doculensStatus === 'completed' ? 'LEDGER_READY' : 'TRIAGE_WAIT'}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-150 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
                        <span>Classification Type:</span>
                        <span className="text-indigo-600 font-extrabold">
                          {doculensStatus === 'completed' || doculensStatus === 'extracting' ? docTemplates[doculensType].aiClass : 'MAPPING...'}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
                        <span>Scanner Confidence:</span>
                        <span className="text-indigo-600 font-extrabold">
                          {doculensStatus === 'completed' || doculensStatus === 'extracting' ? docTemplates[doculensType].confidence : 'WAIT...'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Extracted Fields Metadata display */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between shadow-sm">
                    <div className="text-[10px] font-mono text-slate-450 tracking-wider mb-2 font-bold">EXTRACTED SCHEMA PROPERTIES</div>
                    
                    {doculensData ? (
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono font-bold">
                          <span className="text-slate-450">Primary Party:</span>
                          <span className="text-slate-750 font-extrabold truncate max-w-[130px]">{doculensData.vendorName}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono font-bold">
                          <span className="text-slate-450">Invoice Date:</span>
                          <span className="text-slate-750">{doculensData.invoiceDate}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono font-bold">
                          <span className="text-slate-450">Tax / Deductions:</span>
                          <span className="text-slate-755">{doculensData.taxAmount}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono border-t border-slate-200 pt-1.5 font-bold">
                          <span className="text-slate-450">Total Ledger Sum:</span>
                          <span className="text-indigo-600 font-extrabold">{doculensData.invoiceTotal}</span>
                        </div>
                        
                        {/* Token Pills */}
                        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-slate-150">
                          {doculensData.detectedFields.map((fd: string) => (
                            <span key={fd} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-150 font-bold">
                              {fd}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center p-3">
                        <p className="text-[11px] font-mono text-slate-450 font-semibold leading-relaxed">
                          Run layout neural analysis pipeline to stream extracted entity keys directly to database structure.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Active Tab Area 3: WORKLINEHQ */}
          {activeTab === 'worklinehq' && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-600 uppercase tracking-wider font-mono">
                    Redis Queue Broker & Background Worker
                  </span>
                  <p className="text-sm text-slate-600 mt-2 font-medium">
                    Simulate loading highly scalable business tasks. See how Webhook triggers push operations onto low-latency memory tables (Redis) processed by scalable background instances.
                  </p>
                </div>

                {/* Job Injection Buttons */}
                <div className="space-y-3">
                  <span className="block text-xs font-mono font-bold text-slate-400 mb-1 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-indigo-600" /> INJECT QUEUED SYSTEM JOBS (PRODUCER)
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <button
                      id="btn-job-signup"
                      onClick={() => triggerWorklineJob('signup')}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all duration-300 text-left text-xs text-slate-700 flex items-center gap-2 cursor-pointer shadow-sm font-medium"
                    >
                      <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-800">Inbound Webhook</p>
                        <p className="text-[9px] text-slate-450 font-mono font-semibold">triggers sign_email</p>
                      </div>
                    </button>
                    <button
                      id="btn-job-pdf"
                      onClick={() => triggerWorklineJob('pdf')}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all duration-300 text-left text-xs text-slate-700 flex items-center gap-2 cursor-pointer shadow-sm font-medium"
                    >
                      <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-800">Heavy Subprocess</p>
                        <p className="text-[9px] text-slate-450 font-mono font-semibold">compiles PDF doc</p>
                      </div>
                    </button>
                    <button
                      id="btn-job-webhook"
                      onClick={() => triggerWorklineJob('webhook')}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all duration-300 text-left text-xs text-slate-700 flex items-center gap-2 cursor-pointer shadow-sm font-medium"
                    >
                      <Workflow className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <p className="font-mono text-[10px] font-bold text-slate-800">Partner Webhook</p>
                        <p className="text-[9px] text-slate-450 font-mono font-semibold">rest dispatch event</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Memory Queue and Active Thread display */}
              <div className="mt-4 pt-4 border-t border-slate-150 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Redis Memory Table (Queue) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1">
                          <Database className="w-3.5 h-3.5 text-indigo-600" /> REDIS SYSTEM MEMORY
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-150 text-indigo-600 font-mono font-bold">
                          LEN: {worklineQueue.length}
                        </span>
                      </div>
                      
                      {worklineQueue.length > 0 ? (
                        <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
                          {worklineQueue.map((job) => (
                            <div key={job.id} className="p-1.5 rounded bg-white border border-slate-200 text-[9px] font-mono text-slate-600 flex justify-between items-center font-bold shadow-sm">
                              <span className="truncate max-w-[110px]">{job.name}</span>
                              <span className="text-[8px] px-1 py-0.2 rounded bg-slate-50 text-slate-450 border border-slate-100">{job.id}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-[90px] flex items-center justify-center text-center">
                          <p className="text-[10px] font-mono text-slate-400 font-semibold">
                            Queue Empty. Click any action above to inject jobs into the Redis broker.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Worker Instance Threads */}
                  <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-indigo-600" /> BACKGROUND-THREAD-01
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border leading-none font-bold ${
                        workerState === 'working' 
                          ? 'bg-amber-50 border-amber-200 text-amber-700 animate-pulse' 
                          : 'bg-slate-50 border-slate-200 text-slate-450'
                      }`}>
                        {workerState === 'working' ? 'BUSY' : 'IDLE'}
                      </span>
                    </div>

                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-[10px] font-mono font-bold">
                        <span className="text-slate-550">FastAPI Orchestrator:</span>
                        <span className="text-slate-700">{orchestratorStep}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-mono font-bold">
                        <span className="text-slate-555">Processing Job:</span>
                        <span className="text-indigo-600 font-extrabold font-mono">
                          {activeWorkItem ? activeWorkItem : 'NONE'}
                        </span>
                      </div>

                      {/* Visual Progress bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                        <div className={`h-full bg-indigo-600 duration-1000 transition-all ${
                          workerState === 'working' ? 'w-full' : 'w-0'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Live Terminal outputs */}
        <div className="col-span-1 lg:col-span-2 p-4 bg-slate-900 font-mono text-xs flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200/60">
          <div className="flex items-center justify-between pb-3 border-b border-slate-850">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-300 tracking-wider font-bold">SYSTEM PIPELINE LOGS</span>
            </div>
            <button
              id="btn-clear-terminal"
              onClick={() => {
                setLogs([]);
                addLog("Logs cleared. Awaiting triggers...");
              }}
              className="px-2 py-1 bg-slate-800 border border-slate-700 rounded hover:text-white hover:bg-slate-750 text-[10px] text-slate-400 font-bold transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>

          {/* Terminal outputs panel */}
          <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 py-4 pr-1 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {logs.length === 0 ? (
              <p className="text-slate-500 italic font-semibold">
                Awaiting connection ... Trigger workspace pipeline simulations above to stream local server metrics.
              </p>
            ) : (
              logs.map((log, index) => {
                let colorClass = "text-slate-300";
                if (log.includes('SUCCESS') || log.includes('COMPLETED') || log.includes('COMP:')) colorClass = "text-emerald-450 font-bold";
                else if (log.includes('INIT') || log.includes('UPLOADING')) colorClass = "text-indigo-300 font-bold";
                else if (log.includes('[STEP') || log.includes('[TensorFlow')) colorClass = "text-indigo-450 font-bold";
                else if (log.includes('INSERT') || log.includes('select *')) colorClass = "text-blue-300 font-bold opacity-90";
                else if (log.includes('[DB') || log.includes('Redis')) colorClass = "text-amber-400 font-bold";
                
                return (
                  <div key={index} className={`font-mono border-l-2 pl-2 ${colorClass} border-transparent`}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Prompt quick facts footer */}
          <div className="pt-3 border-t border-slate-850 flex justify-between text-[10px] text-slate-500 font-sans font-bold">
            <span className="flex items-center gap-1">
              <Server className="w-3 h-3 text-slate-500" />
              Node: API_Microservice_01
            </span>
            <span className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              Latency: 12ms Max
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
