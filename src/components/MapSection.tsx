import React, { useEffect, useRef } from 'react';
import { MapPin, Globe, Compass, Clock, CheckCircle2 } from 'lucide-react';

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Add Leaflet CSS if not already present
    if (!document.getElementById('leaflet-css-cdn')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // 2. Define the map initialization helper
    const initializeMap = () => {
      if (!mapContainerRef.current) return;
      
      const L = (window as any).L;
      if (!L) return;

      // Clean up previous map instances if hot reloaded
      if ((window as any)._tsmPortfolioMap) {
        try {
          (window as any)._tsmPortfolioMap.remove();
        } catch (e) {
          console.error("Leaflet cleanup error:", e);
        }
      }

      // Coordinates for Lagos, Nigeria
      const lagosCoords = [6.5244, 3.3792];

      // Create map
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView(lagosCoords, 10);

      (window as any)._tsmPortfolioMap = map;

      // Add elegant grayscale dark map layer from CartoDB (Dark Matter Tiles)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      // Custom high-contrast Leaflet Zoom control
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);

      // Create a gorgeous pulsing marker icon styled using inline classes / custom html
      const pulsingIcon = L.divIcon({
        className: 'custom-marker-wrapper',
        html: `
          <div class="relative flex items-center justify-center w-10 h-10">
            <span class="absolute inline-flex h-10 w-10 rounded-full bg-indigo-500/30 animate-ping"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-indigo-550 bg-indigo-500 border-2 border-[#09090b] shadow-md"></span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      // Add coordinates marker
      L.marker(lagosCoords, { icon: pulsingIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: Space Grotesk, sans-serif; font-size: 11px; font-weight: 600; padding: 6px; color: #f4f4f5; background: #09090b; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
            <p style="margin: 0; font-weight: 800; color: #818cf8; text-transform: uppercase; font-size: 10px; margin-bottom: 2px;">Timothy S. Mayor</p>
            <p style="margin: 0; color: #a1a1aa;">Backend & AI Consultant Base</p>
          </div>
        `, { closeButton: false, offset: [0, -5] })
        .openPopup();
    };

    // 3. Load Leaflet Script dynamically if not available
    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        initializeMap();
      };
      document.body.appendChild(script);
    } else {
      initializeMap();
    }

    // Cleanup and remove map on component unmount
    return () => {
      if ((window as any)._tsmPortfolioMap) {
        try {
          (window as any)._tsmPortfolioMap.remove();
          (window as any)._tsmPortfolioMap = null;
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return (
    <section id="map-section" className="py-20 border-b border-white/5 bg-[#030014] relative overflow-hidden grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs tracking-widest text-indigo-400 uppercase font-bold flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            Base of Operations
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Operational Hub & Reach
          </h2>
          <p className="text-sm text-zinc-400 font-medium font-sans">
            Timothy is stationed in Lagos, Nigeria, delivering high-reliability backend pipelines, cloud microservices, and AI automations to global partners.
          </p>
        </div>

        {/* Dynamic Map and Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Detailed Metadata Pane */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Base info block */}
            <div className="p-6 glass-card rounded-2xl space-y-5 hover:border-indigo-500/20 transition-all duration-300">
              <h3 className="font-display text-base font-extrabold text-white flex items-center gap-2 border-b border-white/5 pb-3">
                <Compass className="w-5 h-5 text-indigo-400" />
                Network Coordinates
              </h3>
              
              <div className="space-y-4">
                {/* City Location */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-indigo-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">PHYSICAL BASE</span>
                    <span className="text-xs font-sans font-bold text-zinc-200">
                      Lagos, Nigeria (IP Hub)
                    </span>
                  </div>
                </div>

                {/* Latitude/Longitude */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-indigo-400 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">GEOLOCATION VECTOR</span>
                    <span className="text-xs font-mono font-bold text-zinc-200">
                      6.5244° N, 3.3792° E
                    </span>
                  </div>
                </div>

                {/* Local time zone */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-indigo-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider block">TIME CONTEXT</span>
                    <span className="text-xs font-sans font-bold text-zinc-200">
                      West Africa Time (WAT / UTC+1)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulting capabilities */}
            <div className="p-6 glass-card rounded-2xl space-y-4 hover:border-indigo-500/20 transition-all duration-300">
              <h4 className="font-mono text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest border-b border-white/5 pb-2">Global Reach Model</h4>
              
              <ul className="space-y-2.5 font-sans text-xs">
                <li className="flex gap-2 items-start font-semibold p-2.5 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-indigo-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 self-center" />
                  <span>Full Remote/Async Consulting Available</span>
                </li>
                <li className="flex gap-2 items-start font-semibold text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                  <span>Overlap schedules with EU & US zones</span>
                </li>
                <li className="flex gap-2 items-start font-semibold text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                  <span>Distributed deployment configurations</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Interactive Styled Map Component */}
          <div className="lg:col-span-8 glass-card rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[350px] hover:border-indigo-500/20 transition-all duration-300">
            
            {/* Map Canvas div */}
            <div 
              ref={mapContainerRef} 
              className="w-full h-full min-h-[300px] bg-zinc-950 rounded-xl relative overflow-hidden border border-white/5 shadow-2xl z-10"
              style={{ minHeight: '340px' }}
            />

          </div>

        </div>

      </div>
    </section>
  );
}
