// QueueWidget.tsx - ACTUALIZADO con Monitor de Verificación y ActiveCallsMonitor
'use client';

import { useEffect, useState, useRef } from 'react';
import { 
  Phone, Clock, CheckCircle, XCircle, Loader2, 
  PhoneOff, PhoneMissed, Voicemail, AlertCircle, 
  CalendarClock, Timer, Search, HelpCircle, Activity 
} from 'lucide-react';
import { createClient } from '@/lib/supabaseClient';

// --- TIPOS ---

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

type ClassificationItem = {
  id: number;
  phone: string;
  status: 'pending' | 'waiting_entropy' | 'dialing' | 'completed' | 'failed';
  result: string | null; // active, inactive, indeterminate
  cause: string | null;
  updated_at: string;
};

// --- CONFIG ---

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

// --- COMPONENTES ---

function VerificationMonitor({ 
  refreshTrigger = 0,
  onQueueEmpty 
}: { 
  refreshTrigger?: number;
  onQueueEmpty?: () => void;
}) {
  const [items, setItems] = useState<ClassificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const wasActiveRef = useRef(false);
  const onQueueEmptyRef = useRef(onQueueEmpty);

  // Mantener el ref actualizado
  useEffect(() => {
    onQueueEmptyRef.current = onQueueEmpty;
  }, [onQueueEmpty]);

  const handleDataUpdate = (newItems: ClassificationItem[]) => {
    setItems(newItems);
    const activeCount = newItems.filter(i => ['waiting_entropy', 'dialing'].includes(i.status)).length;
    const hasActive = activeCount > 0;
    
    if (wasActiveRef.current && !hasActive) {
      onQueueEmptyRef.current?.();
    }
    wasActiveRef.current = hasActive;
  };

  useEffect(() => {
    const supabase = createClient();

    const loadInitial = async () => {
      try {
        const res = await fetch('/api/cola/classification-monitor');
        const data = await res.json();
        if (data.items) {
          handleDataUpdate(data.items);
        }
      } catch (error) {
        console.error('Error loading classification monitor:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();

    const channel = supabase
      .channel('realtime_classification')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'classification_queue' }, () => {
        loadInitial();
      })
      .subscribe();

    const handler = () => {
      if (document.visibilityState === 'visible') {
        loadInitial();
      }
    };
    const interval = window.setInterval(handler, 4000);
    document.addEventListener('visibilitychange', handler);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handler);
    };
  }, []);

  useEffect(() => {
    const fetchNow = async () => {
      try {
        const res = await fetch('/api/cola/classification-monitor');
        const data = await res.json();
        if (data.items) {
          handleDataUpdate(data.items);
        }
      } catch (error) {
        console.error('Error loading classification monitor:', error);
      }
    };
    fetchNow();
  }, [refreshTrigger]);

  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  // Contadores
  const activeCount = items.filter(i => ['waiting_entropy', 'dialing'].includes(i.status)).length;
  const completedCount = items.filter(i => i.status === 'completed').length;
  const failedCount = items.filter(i => i.status === 'failed').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Monitor de Verificación</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">En vivo</span>
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
          <div className="text-2xl font-bold text-indigo-700">{activeCount}</div>
          <div className="text-xs text-indigo-600 font-medium">Verificando</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <div className="text-2xl font-bold text-green-700">{completedCount}</div>
          <div className="text-xs text-green-600 font-medium">Completados</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border border-red-100">
          <div className="text-2xl font-bold text-red-700">{failedCount}</div>
          <div className="text-xs text-red-600 font-medium">Fallidos</div>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <Search size={32} className="mx-auto mb-2 opacity-20" />
            <p>No hay actividad reciente</p>
          </div>
        ) : (
          items.map((item) => {
            let statusIcon = <Clock size={16} />;
            let statusColor = "bg-gray-100 text-gray-600";
            let statusText = "Pendiente";

            if (item.status === 'waiting_entropy') {
              statusIcon = <Clock size={16} className="animate-pulse" />;
              statusColor = "bg-indigo-100 text-indigo-700";
              statusText = "Esperando";
            } else if (item.status === 'dialing') {
              statusIcon = <Loader2 size={16} className="animate-spin" />;
              statusColor = "bg-yellow-100 text-yellow-700";
              statusText = "Marcando";
            } else if (item.status === 'completed') {
              if (item.result === 'active') {
                statusIcon = <CheckCircle size={16} />;
                statusColor = "bg-green-100 text-green-700";
                statusText = "Activo";
              } else if (item.result === 'inactive') {
                statusIcon = <XCircle size={16} />;
                statusColor = "bg-red-100 text-red-700";
                statusText = "Inactivo";
              } else {
                statusIcon = <HelpCircle size={16} />;
                statusColor = "bg-gray-100 text-gray-700";
                statusText = "Indeterminado";
              }
            } else if (item.status === 'failed') {
              statusIcon = <AlertCircle size={16} />;
              statusColor = "bg-red-50 text-red-600";
              statusText = "Falló";
            }

            return (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${statusColor}`}>
                    {statusIcon}
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium text-gray-900">{item.phone}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.updated_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor}`}>
                    {statusText}
                  </span>
                  {item.cause && (
                    <p className="text-[10px] text-gray-400 mt-1 max-w-[100px] truncate" title={item.cause}>
                      {item.cause}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function ActiveCallsMonitor({ 
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
    const fn = async () => {
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
    };
    fn();
    const handler = () => {
      if (document.visibilityState === 'visible') {
        fn();
      }
    };
    const interval = window.setInterval(handler, 3000);
    document.addEventListener('visibilitychange', handler);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handler);
    };
  }, [refreshTrigger]);

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
        <div className="flex items-center gap-2">
          <Activity className="text-green-600" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Monitor de Llamadas</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">En vivo</span>
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

export default function QueueWidget({ 
  onQueueEmpty, 
  refreshTrigger = 0,
  viewMode = 'active'
}: { 
  onQueueEmpty?: () => void;
  refreshTrigger?: number;
  viewMode?: 'raw' | 'active' | 'inactive';
}) {
  // --- MODO VERIFICACIÓN ---
  if (viewMode === 'raw') {
    return (
      <VerificationMonitor 
        refreshTrigger={refreshTrigger} 
        onQueueEmpty={onQueueEmpty}
      />
    );
  }

  // --- MODO LLAMADAS ACTIVAS (Original) ---
  return (
    <ActiveCallsMonitor 
      onQueueEmpty={onQueueEmpty} 
      refreshTrigger={refreshTrigger} 
    />
  );
}
