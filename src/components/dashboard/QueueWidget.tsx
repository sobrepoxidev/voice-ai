// QueueWidget.tsx - ACTUALIZADO con todos los estados
'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Phone, Clock, CheckCircle, XCircle, Loader2, 
  PhoneOff, PhoneMissed, Voicemail, AlertCircle, 
  CalendarClock, Timer 
} from 'lucide-react';

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

const STATUS_CONFIG: Record<CallStatus, {
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}> = {
  queued: {
    label: 'En Cola',
    icon: <Clock size={16} />,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
  calling: {
    label: 'Marcando',
    icon: <Loader2 size={16} className="animate-spin" />,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  active: {
    label: 'En Llamada',
    icon: <Phone size={16} className="animate-pulse" />,
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  finished: {
    label: 'Completada',
    icon: <CheckCircle size={16} />,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
  },
  voicemail: {
    label: 'Buzón de Voz',
    icon: <Voicemail size={16} />,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
  no_answer: {
    label: 'No Contestó',
    icon: <PhoneMissed size={16} />,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
  busy: {
    label: 'Ocupado',
    icon: <PhoneOff size={16} />,
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-700',
  },
  failed: {
    label: 'Error',
    icon: <AlertCircle size={16} />,
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  short_call: {
    label: 'Llamada Corta',
    icon: <Timer size={16} />,
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-700',
  },
  callback: {
    label: 'Volver a Llamar',
    icon: <CalendarClock size={16} />,
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-700',
  },
};

export default function QueueWidget({ 
  onQueueEmpty, 
  refreshTrigger = 0 
}: { 
  onQueueEmpty?: () => void;
  refreshTrigger?: number;
}) {
  const [status, setStatus] = useState<QueueStatus>({
    active_calls: 0,
    queue_size: 0,
    max_concurrent: 20,
    calls: [],
  });
  const [loading, setLoading] = useState(true);
  const wasActiveRef = useRef(false);

  useEffect(() => {
    loadQueueStatus();
    const interval = setInterval(loadQueueStatus, 3000);
    return () => clearInterval(interval);
  }, [refreshTrigger]);

  async function loadQueueStatus() {
    try {
      const res = await fetch('/api/cola/monitor');
      const data = await res.json();
      setStatus(data);

      const hasActiveCalls = data.calls && data.calls.length > 0;

      if (wasActiveRef.current && !hasActiveCalls) {
        onQueueEmpty?.();
      }

      wasActiveRef.current = hasActiveCalls;
    } catch (error) {
      console.error('Error cargando cola:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDuration(seconds?: number) {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function getStatusConfig(status: CallStatus) {
    return STATUS_CONFIG[status] || STATUS_CONFIG.queued;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  // Contar por estado
  const statusCounts = status.calls.reduce((acc, call) => {
    acc[call.status] = (acc[call.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Monitor de Llamadas</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Auto-actualización</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="text-2xl font-bold text-green-700">
            {status.active_calls}
          </div>
          <div className="text-xs text-green-600">Activas</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">
            {status.queue_size}
          </div>
          <div className="text-xs text-yellow-600">En Cola</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-2xl font-bold text-gray-700">
            {status.active_calls} / {status.max_concurrent}
          </div>
          <div className="text-xs text-gray-600">Capacidad</div>
        </div>
      </div>

      {/* Resumen de estados (mini badges) */}
      {Object.keys(statusCounts).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([st, count]) => {
            const config = getStatusConfig(st as CallStatus);
            return (
              <span
                key={st}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bgColor} ${config.textColor}`}
              >
                {config.icon}
                {config.label}: {count}
              </span>
            );
          })}
        </div>
      )}

      {/* Lista de llamadas */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {status.calls.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay llamadas activas
          </div>
        ) : (
          status.calls.map((call) => {
            const config = getStatusConfig(call.status);
            return (
              <div
                key={call.phone}
                className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
              >
                {/* Icon con color */}
                <div className={`shrink-0 ${config.textColor}`}>
                  {config.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">
                      {call.user_name || 'Sin nombre'}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded ${config.bgColor} ${config.textColor}`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{call.phone}</p>
                </div>

                {/* Duración (si aplica) */}
                {call.call_duration_seconds !== undefined && call.call_duration_seconds > 0 && (
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatDuration(call.call_duration_seconds)}
                    </p>
                    <p className="text-xs text-gray-500">Duración</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}