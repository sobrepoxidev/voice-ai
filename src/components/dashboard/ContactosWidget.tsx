// ContactosWidget.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Phone, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';

type Contacto = {
  phone: string;
  user_name: string | null;
  locale: string;
  called: boolean;
  times_called: number;
};

type TrunkLine = 'didww' | 'metrocom';

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
  refreshTrigger = 0 
}: { 
  onCallStarted?: () => void;
  refreshTrigger?: number;
}) {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);
  const [selectedLine, setSelectedLine] = useState<TrunkLine>('didww');
  const [agents, setAgents] = useState<RetellAgent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

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
    }
  };

  useEffect(() => {
    loadContactos();
    loadAgents();
  }, [refreshTrigger]);

  async function loadContactos() {
    try {
      const res = await fetch('/api/contactos?limit=10&called=false');
      const data = await res.json();
      setContactos(data.contacts || []);
    } catch (error) {
      console.error('Error cargando contactos:', error);
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
      toast.error('No se pudieron cargar los agentes');
    }
  }

  function pickAgentIdByLine(line: TrunkLine, list: RetellAgent[]): string | null {
    const preferredLang = line === 'didww' ? 'en' : 'es';
    const matchesLang = (lang: string | null): boolean => {
      const l = (lang ?? '').toLowerCase();
      return l === preferredLang || l.startsWith(preferredLang);
    };
    const gaia = list.find(
      (a) => (a.name?.toLowerCase().includes('gaia') ?? false) && matchesLang(a.language) && !!a.agent_id
    );
    if (gaia?.agent_id) return gaia.agent_id;
    const firstLang = list.find((a) => matchesLang(a.language) && !!a.agent_id);
    if (firstLang?.agent_id) return firstLang.agent_id;
    const any = list.find((a) => !!a.agent_id);
    return any?.agent_id ?? null;
  }

  useEffect(() => {
    const id = pickAgentIdByLine(selectedLine, agents);
    setSelectedAgentId(id);
  }, [selectedLine, agents]);

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

  async function handleBatchCall() {
    if (selected.size === 0) {
      toast.warning('Selecciona al menos un contacto');
      return;
    }

    if (selected.size > 20) {
      toast.warning('Máximo 20 llamadas simultáneas');
      return;
    }

    const lineConfig = LINE_CONFIG[selectedLine];
    
    setCalling(true);

    try {
      const selectedContacts = contactos
        .filter(c => selected.has(c.phone))
        .map(c => ({
          phone: c.phone,
          user_name: c.user_name
        }));

      const res = await fetch('/api/cola/iniciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: selectedContacts, // 🔥 NUEVO: Enviar objetos completos
          from_number: lineConfig.fromNumber,
          agent_id: selectedAgentId ?? undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  const currentLine = LINE_CONFIG[selectedLine];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={24} className="text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Contactos</h2>
        </div>
        <Link
          href="/contactos"
          className="text-sm text-blue-600 hover:underline"
        >
          Ver todos →
        </Link>
      </div>

      {/* Selector de Línea y Agente */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Línea de salida:</span>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedLine('didww')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedLine === 'didww'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {LINE_CONFIG.didww.icon} {LINE_CONFIG.didww.label}
            </button>
            <button
              onClick={() => setSelectedLine('metrocom')}
              className={`flex-1 sm:flex-none px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedLine === 'metrocom'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {LINE_CONFIG.metrocom.icon} {LINE_CONFIG.metrocom.label}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto">
          <span className="text-sm font-medium text-gray-700">Agente:</span>
          <select
            value={selectedAgentId ?? ''}
            onChange={(e) => setSelectedAgentId(e.target.value || null)}
            className="flex-1 md:flex-none px-3 py-1.5 text-sm rounded-md border"
          >
            <option value="">Por defecto</option>
            {agents.map((a) => (
              <option key={a.id} value={a.agent_id ?? ''}>
                {(a.name && a.language ? `${a.name} (${a.language})` : a.name) || a.agent_id || 'Agente'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={toggleSelectAll}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
        >
          {selected.size === contactos.length
            ? 'Deseleccionar todos'
            : 'Seleccionar todos'}
        </button>

        <button
          onClick={handleBatchCall}
          disabled={calling || selected.size === 0}
          className={`flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto ${currentLine.color}`}
        >
          {calling ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Llamando...
            </>
          ) : (
            <>
              <Phone size={16} />
              Llamar ({selected.size}) {currentLine.icon}
            </>
          )}
        </button>
      </div>

      {/* Lista de contactos */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {contactos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No hay contactos sin llamar
          </p>
        ) : (
          contactos.map((contacto) => (
            <div
              key={contacto.phone}
              onClick={() => toggleSelect(contacto.phone)}
              className={`
                flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                ${
                  selected.has(contacto.phone)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="checkbox"
                checked={selected.has(contacto.phone)}
                onChange={() => {}}
                className="w-4 h-4"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">
                    {contacto.user_name || 'Sin nombre'}
                  </p>
                  {contacto.times_called > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full border border-yellow-200">
                      {contacto.times_called} llamadas
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{contacto.phone}</p>
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
