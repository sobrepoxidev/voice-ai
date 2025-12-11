'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Phone, Users, Loader2, Filter, CheckCircle, XCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';

type Contacto = {
  phone: string;
  user_name: string | null;
  locale: string;
  called?: boolean;
  times_called: number;
  classification_details?: Record<string, unknown>;
  classification_cause?: string;
};

type TrunkLine = 'didww' | 'metrocom';
type ViewType = 'raw' | 'active' | 'inactive';

type RetellAgent = {
  id: number;
  created_at: string;
  language: string | null;
  name: string | null;
  description: string | null;
  call_direction: string | null;
  agent_id: string | null;
};

export default function ContactosWidget({ 
  onCallStarted,
  refreshTrigger = 0,
  onViewModeChange,
  onClassifyStarted
}: { 
  onCallStarted?: () => void;
  refreshTrigger?: number;
  onViewModeChange?: (mode: 'raw' | 'active' | 'inactive') => void;
  onClassifyStarted?: () => void;
}) {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  const [classifying, setClassifying] = useState(false);
  
  const [viewType, setViewType] = useState<ViewType>('raw');

  // Sync view mode to parent
  useEffect(() => {
    onViewModeChange?.(viewType);
  }, [viewType, onViewModeChange]);
  
  const [selectedLine, setSelectedLine] = useState<TrunkLine>('didww');
  
  const [agents, setAgents] = useState<RetellAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const LINE_CONFIG = {
    didww: {
      label: 'DIDWW (USA)',
      fromNumber: '+18887719555',
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: '🇺🇸'
    },
    metrocom: {
      label: 'Metrocom (CR)',
      fromNumber: '+50642052929',
      color: 'bg-green-600 hover:bg-green-700',
      icon: '🇨🇷'
    },
    telnyx: {
      label: 'Telnyx (Local USA)',
      fromNumber: '+50642052929',
      color: 'bg-green-600 hover:bg-green-700',
      icon: '🇨🇷'
    },
  };

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      loadContactos();
    }, 500);
    return () => clearTimeout(timer);
  }, [refreshTrigger, viewType, searchTerm]);

  // Realtime subscription
  useEffect(() => {
    if (viewType === 'raw') return; // No realtime for raw view usually needed unless contacts added

    const supabase = createClient();
    const table = viewType === 'active' ? 'active_contacts' : 'inactive_contacts';

    const channel = supabase
      .channel(`realtime_${table}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: table }, (payload) => {
        // Simple reload logic: if new item inserted, reload list
        // Could be optimized to just append, but reload is safer for sort order
        loadContactos();
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: table }, () => {
        loadContactos();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [viewType]);

  useEffect(() => {
    setSelected(new Set());
  }, [viewType]);

  async function loadContactos() {
    setLoading(true);
    try {
      // Para raw, filtramos called=false por defecto. Para otros, traemos todo (limitado)
      const calledParam = viewType === 'raw' ? '&called=false' : '';
      const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
      const res = await fetch(`/api/contactos?limit=50&type=${viewType}${calledParam}${searchParam}`);
      const data = await res.json();
      setContactos(data.contacts || []);
      // Eliminado: setSelected(new Set()); // Ya no limpiamos al cargar datos (solo al cambiar vista)
    } catch (error) {
      console.error('Error cargando contactos:', error);
      toast.error('Error al cargar contactos');
    } finally {
      setLoading(false);
    }
  }

  async function loadAgents() {
    try {
      const res = await fetch('/api/retell/agents');
      const data = await res.json();
      const list: RetellAgent[] = data.agents || [];
      setAgents(list);
    } catch {
      // toast.error('No se pudieron cargar los agentes');
    }
  }

  // Auto-select agent logic
  useEffect(() => {
    if (viewType !== 'active') return; // Solo importa para llamar con IA
    
    const preferredLang = selectedLine === 'didww' ? 'en' : 'es';
    const matchesLang = (lang: string | null): boolean => {
      const l = (lang ?? '').toLowerCase();
      return l === preferredLang || l.startsWith(preferredLang);
    };
    
    const gaia = agents.find(
      (a) => (a.name?.toLowerCase().includes('gaia') ?? false) && matchesLang(a.language) && !!a.agent_id
    );
    
    if (gaia?.agent_id) {
      setSelectedAgentId(gaia.agent_id);
      return;
    }
    
    const firstLang = agents.find((a) => matchesLang(a.language) && !!a.agent_id);
    if (firstLang?.agent_id) {
      setSelectedAgentId(firstLang.agent_id);
      return;
    }
    
    if (agents.length > 0) {
      setSelectedAgentId(agents[0].agent_id);
    }
  }, [selectedLine, agents, viewType]);

  function toggleSelect(phone: string) {
    const newSelected = new Set(selected);
    if (newSelected.has(phone)) {
      newSelected.delete(phone);
    } else {
      newSelected.add(phone);
    }
    setSelected(newSelected);
  }

  function toggleSelectAll() {
    if (selected.size === contactos.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(contactos.map((c) => c.phone)));
    }
  }

  // Lógica para llamar con IA (Solo disponible en 'active' o 'raw' si se fuerza)
  async function handleBatchCall() {
    if (selected.size === 0) return;
    if (selected.size > 20) {
      toast.warning('Máximo 20 llamadas simultáneas');
      return;
    }

    setCalling(true);
    const lineConfig = LINE_CONFIG[selectedLine];

    try {
      const selectedContacts = Array.from(selected).map(phone => {
        const visible = contactos.find(c => c.phone === phone);
        return {
          phone,
          user_name: visible?.user_name || ''
        };
      });

      const res = await fetch('/api/cola/iniciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: selectedContacts,
          from_number: lineConfig.fromNumber,
          agent_id: selectedAgentId ?? undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Llamadas iniciadas');
        setSelected(new Set());
        loadContactos();
        onCallStarted?.();
      } else {
        toast.error(data.error ?? 'Error al iniciar llamadas');
      }
    } catch (error) {
      console.error('Error iniciando llamadas:', error);
      toast.error('Error al iniciar llamadas');
    } finally {
      setCalling(false);
    }
  }

  // Lógica para clasificar (Solo disponible en 'raw')
  async function handleClassify() {
    if (selected.size === 0) return;
    if (selected.size > 20) {
      toast.warning('Máximo 20 números por lote');
      return;
    }

    setClassifying(true);
    try {
      // Si la selección persiste entre búsquedas, es posible que algunos contactos seleccionados
      // NO estén visibles en la lista 'contactos' actual.
      // Sin embargo, solo tenemos acceso a los detalles (user_name) de los visibles.
      // Para solucionar esto, idealmente deberíamos guardar el objeto completo en 'selected' o buscarlo.
      // Como solución rápida, asumimos que si está seleccionado es válido, pero si no está visible,
      // perdemos el user_name si no lo guardamos.
      // MEJORA: Usar los que están en 'contactos' O simplemente enviar el teléfono.
      // El backend buscará el user_name si es necesario o lo ignorará.
      
      const selectedContacts = Array.from(selected).map(phone => {
        const visible = contactos.find(c => c.phone === phone);
        return {
          phone,
          user_name: visible?.user_name || '' 
        };
      });

      const res = await fetch('/api/cola/clasificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: selectedContacts
        }),
      });

      if (res.ok) {
        toast.success('Clasificación iniciada en background (Intervalos aleatorios)');
        setSelected(new Set());
        setTimeout(loadContactos, 2000);
        onClassifyStarted?.();
      } else {
        toast.error('Error al iniciar clasificación');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión');
    } finally {
      setClassifying(false);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Copiado');
  }

  if (loading && contactos.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Contactos</h2>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Buscar (nombre o teléfono)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <Link href="/contactos" className="text-sm text-blue-600 hover:underline whitespace-nowrap">
              Ver todos →
            </Link>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-lg self-start">
          <button
            onClick={() => setViewType('raw')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              viewType === 'raw' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Filter size={16} className="inline mr-2" />
            Sin Clasificar
          </button>
          <button
            onClick={() => setViewType('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              viewType === 'active' ? 'bg-white shadow text-green-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CheckCircle size={16} className="inline mr-2" />
            Activos
          </button>
          <button
            onClick={() => setViewType('inactive')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              viewType === 'inactive' ? 'bg-white shadow text-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <XCircle size={16} className="inline mr-2" />
            Inactivos
          </button>
        </div>
      </div>

      {/* Controls based on View */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
        
        {viewType === 'active' && (
          <div className="flex flex-col md:flex-row gap-4 items-center">
             {/* Línea Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Línea:</span>
              <div className="flex bg-white rounded-md border overflow-hidden">
                <button
                  onClick={() => setSelectedLine('didww')}
                  className={`px-3 py-1.5 text-xs ${selectedLine === 'didww' ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-gray-50'}`}
                >
                  🇺🇸 DIDWW
                </button>
                <button
                  onClick={() => setSelectedLine('metrocom')}
                  className={`px-3 py-1.5 text-xs ${selectedLine === 'metrocom' ? 'bg-green-100 text-green-700 font-bold' : 'hover:bg-gray-50'}`}
                >
                  🇨🇷 Metrocom
                </button>
              </div>
            </div>

            {/* Agent Selector */}
            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm font-medium text-gray-700">Agente:</span>
              <select
                value={selectedAgentId ?? ''}
                onChange={(e) => setSelectedAgentId(e.target.value || null)}
                className="flex-1 px-2 py-1.5 text-sm rounded-md border border-gray-300"
              >
                <option value="">-- Seleccionar --</option>
                {agents.map((a) => (
                  <option key={a.id} value={a.agent_id ?? ''}>
                    {a.name} ({a.language})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 justify-between">
          <button
            onClick={toggleSelectAll}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-white bg-white"
          >
            {selected.size === contactos.length && contactos.length > 0 ? 'Deseleccionar' : 'Seleccionar Todo'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selected.size} seleccionados
            </span>

            {/* ACTION BUTTONS */}
            {viewType === 'raw' && (
              <button
                onClick={handleClassify}
                disabled={classifying || selected.size === 0}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {classifying ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                Clasificar
              </button>
            )}

            {viewType === 'active' && (
              <button
                onClick={handleBatchCall}
                disabled={calling || selected.size === 0}
                className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg disabled:opacity-50 ${LINE_CONFIG[selectedLine].color}`}
              >
                {calling ? <Loader2 size={16} className="animate-spin" /> : <Phone size={16} />}
                Llamar IA
              </button>
            )}
            
            {viewType === 'inactive' && (
               <div className="text-xs text-gray-500 italic">
                 Solo copia manual disponible
               </div>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {contactos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No hay contactos en esta vista
          </p>
        ) : (
          contactos.map((contacto) => (
            <div
              key={contacto.phone}
              onClick={() => toggleSelect(contacto.phone)}
              className={`
                flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                ${selected.has(contacto.phone) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}
              `}
            >
              <input
                type="checkbox"
                checked={selected.has(contacto.phone)}
                onChange={() => {}}
                className="w-4 h-4 pointer-events-none"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 truncate">
                    {contacto.user_name || 'Sin nombre'}
                  </p>
                  {/* Status Badges */}
                  {viewType === 'active' && (
                     <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">
                       ACTIVO
                     </span>
                  )}
                  {viewType === 'inactive' && (
                     <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full">
                       {contacto.classification_cause || 'INACTIVO'}
                     </span>
                  )}
                  
                  {contacto.times_called > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full border border-yellow-200">
                      {contacto.times_called} llamadas
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500 font-mono">{contacto.phone}</p>
                  {viewType === 'inactive' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(contacto.phone); }}
                      className="text-xs text-blue-600 hover:underline px-2"
                    >
                      Copiar
                    </button>
                  )}
                </div>
              </div>

              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {contacto.locale.toUpperCase()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
