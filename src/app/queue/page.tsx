'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import {
  Phone,
  Clock,
  CheckCircle,
  Loader2,
  PhoneOff,
  PhoneMissed,
  Voicemail,
  AlertCircle,
  CalendarClock,
  Timer,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { resetContact } from '@/lib/api/contactos';

type CallStatus =
  | 'queued'
  | 'calling'
  | 'active'
  | 'finished'
  | 'voicemail'
  | 'no_answer'
  | 'busy'
  | 'failed'
  | 'short_call'
  | 'callback';

type Call = {
  phone: string;
  user_name: string | null;
  status: CallStatus;
  retell_call_id: string | null;
  updated_at: string;
  call_duration_seconds?: number;
  end_reason?: string;
};

type QueueStatus = {
  active_calls: number;
  queue_size: number;
  max_concurrent: number;
  calls: Call[];
};

type HistorialStatus =
  | 'finished'
  | 'voicemail'
  | 'no_answer'
  | 'busy'
  | 'failed'
  | 'short_call'
  | 'callback';

type HistorialCall = {
  phone: string;
  user_name: string | null;
  status: HistorialStatus;
  retell_call_id: string | null;
  updated_at: string;
  call_duration_seconds?: number;
  end_reason?: string;
  locale: string;
};

const STATUS_CONFIG: Record<CallStatus, { label: string; icon: ReactNode; bg: string; text: string }> = {
  queued: { label: 'En Cola', icon: <Clock size={16} />, bg: 'bg-gray-100', text: 'text-gray-700' },
  calling: { label: 'Marcando', icon: <Loader2 size={16} className="animate-spin" />, bg: 'bg-yellow-100', text: 'text-yellow-700' },
  active: { label: 'En Llamada', icon: <Phone size={16} className="animate-pulse" />, bg: 'bg-green-100', text: 'text-green-700' },
  finished: { label: 'Completada', icon: <CheckCircle size={16} />, bg: 'bg-blue-100', text: 'text-blue-700' },
  voicemail: { label: 'Buzón de Voz', icon: <Voicemail size={16} />, bg: 'bg-purple-100', text: 'text-purple-700' },
  no_answer: { label: 'No Contestó', icon: <PhoneMissed size={16} />, bg: 'bg-orange-100', text: 'text-orange-700' },
  busy: { label: 'Ocupado', icon: <PhoneOff size={16} />, bg: 'bg-amber-100', text: 'text-amber-700' },
  failed: { label: 'Error', icon: <AlertCircle size={16} />, bg: 'bg-red-100', text: 'text-red-700' },
  short_call: { label: 'Llamada Corta', icon: <Timer size={16} />, bg: 'bg-pink-100', text: 'text-pink-700' },
  callback: { label: 'Volver a Llamar', icon: <CalendarClock size={16} />, bg: 'bg-indigo-100', text: 'text-indigo-700' },
};

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueStatus>({ active_calls: 0, queue_size: 0, max_concurrent: 20, calls: [] });
  const [historial, setHistorial] = useState<HistorialCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Call | null>(null);
  const [resettingPhone, setResettingPhone] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      const [qRes, hRes] = await Promise.all([
        fetch('/api/cola/monitor'),
        fetch('/api/cola/historial?limit=20'),
      ]);
      const qData: QueueStatus = await qRes.json();
      const hData: { calls: HistorialCall[] } = await hRes.json();
      setQueue(qData);
      setHistorial(hData.calls || []);
    } catch {
      toast.error('Error cargando datos de cola');
    } finally {
      setLoading(false);
    }
  }

  const statusCounts = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const c of queue.calls) acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, [queue.calls]);

  function formatDuration(seconds?: number) {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function openCard(call: Call) {
    setSelected(call);
    setModalOpen(true);
  }

  async function handleReset() {
    if (!selected) return;
    setResettingPhone(selected.phone);
    try {
      await resetContact(selected.phone);
      toast.success('Contacto habilitado para volver a llamar');
    } catch {
      toast.error('No se pudo actualizar el contacto');
    } finally {
      setResettingPhone(null);
      setModalOpen(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold text-gray-900">Cola de Llamadas</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Llamadas Activas</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Auto-actualización</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {Object.keys(statusCounts).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(statusCounts).map(([st, count]) => {
                const config = STATUS_CONFIG[st as CallStatus];
                return (
                  <span key={st} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
                    {config.icon}
                    {config.label}: {count}
                  </span>
                );
              })}
            </div>
          )}

          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {queue.calls.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No hay llamadas activas</div>
            ) : (
              queue.calls.map((call) => {
                const cfg = STATUS_CONFIG[call.status];
                return (
                  <button
                    key={`${call.phone}-${call.updated_at}`}
                    onClick={() => openCard(call)}
                    className="w-full text-left flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className={`shrink-0 ${cfg.text}`}>{cfg.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 truncate">{call.user_name || 'Sin nombre'}</p>
                        <span className={`text-xs px-2 py-1 rounded ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                      </div>
                      <p className="text-sm text-gray-500">{call.phone}</p>
                    </div>
                    {call.call_duration_seconds && call.call_duration_seconds > 0 && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatDuration(call.call_duration_seconds)}</p>
                        <p className="text-xs text-gray-500">Duración</p>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Métricas</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="text-2xl font-bold text-green-700">{queue.active_calls}</div>
              <div className="text-xs text-green-600">Activas</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">{queue.queue_size}</div>
              <div className="text-xs text-yellow-600">En Cola</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-2xl font-bold text-gray-700">{queue.active_calls} / {queue.max_concurrent}</div>
              <div className="text-xs text-gray-600">Capacidad</div>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-900 mt-6 mb-2">Historial Reciente</h3>
          <div className="space-y-2 max-h-[40vh] overflow-y-auto">
            {historial.length === 0 ? (
              <div className="text-gray-500">Sin historial</div>
            ) : (
              historial.map((h, idx) => (
                <div key={`${h.phone}-${h.updated_at}-${idx}`} className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                  <div className="shrink-0 text-gray-400">
                    <Clock size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 truncate">{h.user_name || 'Sin nombre'}</p>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{h.status}</span>
                    </div>
                    <p className="text-sm text-gray-500">{h.phone}</p>
                  </div>
                  {h.call_duration_seconds && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatDuration(h.call_duration_seconds)}</p>
                      <p className="text-xs text-gray-500">Duración</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Detalle de Contacto</AlertDialogTitle>
            <AlertDialogDescription>{selected?.phone}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1 flex items-center justify-center">
              <div className="size-20 rounded-full bg-gray-100 border flex items-center justify-center text-gray-600 text-lg font-bold">
                {(selected?.user_name || 'S')[0]}
              </div>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <p className="text-sm text-gray-700">Nombre: <span className="font-medium text-gray-900">{selected?.user_name || 'Sin nombre'}</span></p>
              <p className="text-sm text-gray-700">Estado: <span className="font-medium text-gray-900">{selected ? STATUS_CONFIG[selected.status].label : ''}</span></p>
              <p className="text-sm text-gray-700">Actualizado: <span className="font-medium text-gray-900">{selected?.updated_at}</span></p>
              <p className="text-sm text-gray-700">Retell ID: <span className="font-mono text-gray-900">{selected?.retell_call_id || 'N/A'}</span></p>
              <p className="text-sm text-gray-700">Motivo: <span className="font-medium text-gray-900">{selected?.end_reason || 'N/A'}</span></p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cerrar</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} disabled={resettingPhone !== null}>Permitir volver a llamar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
