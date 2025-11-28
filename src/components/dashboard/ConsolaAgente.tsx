// src/components/dashboard/ConsolaAgente.tsx
'use client';

import { useState } from 'react';
import { Phone, Maximize2, Minimize2, ChevronDown, ChevronUp, RefreshCw, Info } from 'lucide-react';

export default function ConsolaAgente() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false); // Default hidden on mobile to save space
  const [iframeKey, setIframeKey] = useState(0);

  // Recargar iframe si falla
  const reloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full space-y-2 md:space-y-4">
      {/* Header */}
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Phone className="text-blue-600 shrink-0" size={20} />
          <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">Consola</h2>
        </div>
        <div className="flex items-center gap-1">
           <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded md:hidden"
            aria-label="Toggle instructions"
          >
            <Info size={20} className={showInstructions ? 'text-blue-600' : ''} />
          </button>
          <button
            onClick={reloadIframe}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
            title="Recargar consola"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Recargar</span>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title={isExpanded ? "Minimizar" : "Maximizar"}
          >
            {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* Instrucciones Collapsible */}
      <div className={`bg-blue-50 border border-blue-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${showInstructions ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 md:max-h-96 md:opacity-100 md:p-4 p-0 border-0 md:border'}`}>
        <div className="flex items-start gap-2">
             <div className="shrink-0 text-blue-600 mt-0.5 hidden md:block">
                <Info size={16} />
             </div>
             <div>
                <p className="text-sm text-blue-800 font-semibold mb-1 block md:hidden">Instrucciones:</p>
                <p className="text-sm text-blue-800 font-semibold mb-1 hidden md:block">Instrucciones de uso</p>
                <ul className="text-sm text-blue-700 space-y-1 pl-4 md:pl-0 list-disc md:list-none">
                  <li>Inicia sesión con tu usuario de agente (ej: 1002)</li>
                  <li>Usa la consola para llamar o recibir transferencias</li>
                  <li>El audio funcionará a través de tu navegador (WebRTC)</li>
                </ul>
             </div>
        </div>
      </div>

      {/* Iframe Container */}
      <div
        className={`flex-1 border-2 border-gray-300 rounded-lg overflow-hidden bg-white transition-all relative ${
          isExpanded ? 'fixed inset-0 md:inset-4 z-50 rounded-none md:rounded-lg border-0 md:border-2' : 'min-h-[400px]'
        }`}
      >
        <iframe
          key={iframeKey}
          src="https://voiceai.sobrepoxi.com/consola/"
          className="w-full h-full border-0 absolute inset-0"
          allow="microphone; autoplay; camera"
          title="Consola de Agente OmniLeads"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
        {/* Close button for fullscreen mobile overlay */}
        {isExpanded && (
            <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 z-50"
            >
                <Minimize2 size={24} />
            </button>
        )}
      </div>

      {/* Overlay para cerrar expandido */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </div>
  );
}