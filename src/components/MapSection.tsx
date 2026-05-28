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

      // Add elegant grayscale light map layer from CartoDB (Positron Tiles)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
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
            <span class="absolute inline-flex h-10 w-10 rounded-full bg-indigo-400/30 animate-ping"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-indigo-650 bg-indigo-600 border-2 border-white shadow-md"></span>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      // Add coordinates marker
      L.marker(lagosCoords, { icon: pulsingIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: sans-serif; font-size: 11px; font-weight: 600; padding: 4px; color: #1e293b;">
            <p style="margin: 0; font-weight: 800; color: #4f46e5; text-transform: uppercase; font-size: 10px; margin-bottom: 2px;">Timothy S. Mayor</p>
            <p style="margin: 0; color: #64748b;">Backend & AI Consultant Base</p>
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
    <section id="map-section" className="py-20 border-b border-slate-200 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs tracking-widest text-indigo-600 uppercase font-bold">Base of Operations</span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Operational Hub & Reach
          </h2>
          <p className="text-sm text-slate-650 font-medium font-sans">
            Timothy is stationed in Lagos, Nigeria, delivering high-reliability backend pipelines, cloud microservices, and AI automations to global partners.
          </p>
        </div>

        {/* Dynamic Map and Location Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Detailed Metadata Pane */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            
            {/* Base info block */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-5 shadow-sm">
              <h3 className="font-display text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-650 text-indigo-600" />
                Network Coordinates
              </h3>
              
              <div className="space-y-4">
                {/* City Location */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-indigo-600 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">PHYSICAL BASE</span>
                    <span className="text-xs font-sans font-bold text-slate-800">
                      Lagos, Nigeria (IP Hub)
                    </span>
                  </div>
                </div>

                {/* Latitude/Longitude */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-indigo-600 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">GEOLOCATION VECTOR</span>
                    <span className="text-xs font-mono font-bold text-slate-800">
                      6.5244° N, 3.3792° E
                    </span>
                  </div>
                </div>

                {/* Local time zone */}
                <div className="flex gap-3.5 items-start">
                  <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-indigo-600 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">TIME CONTEXT</span>
                    <span className="text-xs font-sans font-bold text-slate-800">
                      West Africa Time (WAT / UTC+1)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consulting capabilities */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-sm">
              <h4 className="font-mono text-[10px] text-slate-450 font-extrabold uppercase tracking-widest">Global Reach Model</h4>
              
              <ul className="space-y-2.5 font-sans text-xs">
                <li className="flex gap-2 items-start font-semibold p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 self-center" />
                  <span>Full Remote/Async Consulting Available</span>
                </li>
                <li className="flex gap-2 items-start font-semibold text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-650 bg-indigo-600 mt-2 shrink-0"></span>
                  <span>Overlap schedules with EU & US zones</span>
                </li>
                <li className="flex gap-2 items-start font-semibold text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-650 bg-indigo-600 mt-2 shrink-0"></span>
                  <span>Distributed deployment configurations</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Interactive Styled Map Component */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[350px]">
            
            {/* Map Canvas div */}
            <div 
              ref={mapContainerRef} 
              className="w-full h-full min-h-[300px] bg-slate-100 rounded-xl relative overflow-hidden border border-slate-150 shadow-inner z-10"
              style={{ minHeight: '340px' }}
            />

          </div>

        </div>

      </div>
    </section>
  );
}
