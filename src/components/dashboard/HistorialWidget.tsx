// HistorialWidget.tsx - ACTUALIZADO con todos los estados
'use client';

import { useEffect, useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, Loader2,
  PhoneOff, PhoneMissed, Voicemail, AlertCircle,
  CalendarClock, Timer, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
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
  status: CallStatus;
  retell_call_id: string | null;
  updated_at: string;
  call_duration_seconds?: number;
  end_reason?: string;
  locale: string;
  times_called?: number;
};

const STATUS_CONFIG: Record<CallStatus, {
  label: string;
  icon: React.ReactNode;
  iconColor: string;
}> = {
  finished: {
    label: 'Completada',
    icon: <CheckCircle size={20} />,
    iconColor: 'text-green-500',
  },
  voicemail: {
    label: 'Buzón de Voz',
    icon: <Voicemail size={20} />,
    iconColor: 'text-purple-500',
  },
  no_answer: {
    label: 'No Contestó',
    icon: <PhoneMissed size={20} />,
    iconColor: 'text-orange-500',
  },
  busy: {
    label: 'Ocupado',
    icon: <PhoneOff size={20} />,
    iconColor: 'text-amber-500',
  },
  failed: {
    label: 'Error',
    icon: <AlertCircle size={20} />,
    iconColor: 'text-red-500',
  },
  short_call: {
    label: 'Llamada Corta',
    icon: <Timer size={20} />,
    iconColor: 'text-pink-500',
  },
  callback: {
    label: 'Volver a Llamar',
    icon: <CalendarClock size={20} />,
    iconColor: 'text-indigo-500',
  },
};

export default function HistorialWidget({ 
  refreshTrigger = 0,
  onContactReset
}: { 
  refreshTrigger?: number;
  onContactReset?: () => void;
}) {
  const [calls, setCalls] = useState<HistorialCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CallStatus | 'all'>('all');
  const [resetting, setResetting] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetPhone, setTargetPhone] = useState<string | null>(null);

  useEffect(() => {
    loadHistorial();
  }, [refreshTrigger]);

  async function loadHistorial() {
    try {
      const res = await fetch('/api/cola/historial?limit=20');
      const data = await res.json();
      setCalls(data.calls || []);
    } catch (error) {
      console.error('Error cargando historial:', error);
    } finally {
      setLoading(false);
    }
  }

  function openReset(phone: string) {
    setTargetPhone(phone);
    setConfirmOpen(true);
  }

  async function confirmReset() {
    if (!targetPhone) return;
    setResetting(targetPhone);
    try {
      const data = await resetContact(targetPhone);
      if (data.success) {
        onContactReset?.();
        toast.success('Contacto habilitado para llamar de nuevo');
      }
    } catch (error) {
      toast.error('Error de red al actualizar contacto');
    } finally {
      setResetting(null);
      setConfirmOpen(false);
      setTargetPhone(null);
    }
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins}m`;
    if (diffMins < 1440) return `Hace ${Math.floor(diffMins / 60)}h`;
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatDuration(seconds?: number) {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function getStatusConfig(status: CallStatus) {
    return STATUS_CONFIG[status] || STATUS_CONFIG.finished;
  }

  const filteredCalls = filter === 'all' 
    ? calls 
    : calls.filter(c => c.status === filter);

  // Contar por estado
  const statusCounts = calls.reduce((acc, call) => {
    acc[call.status] = (acc[call.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Historial de Llamadas
        </h2>
        <button
          onClick={loadHistorial}
          className="text-sm text-blue-600 hover:underline"
        >
          Actualizar
        </button>
      </div>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
            filter === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todas ({calls.length})
        </button>
        {Object.entries(statusCounts).map(([st, count]) => {
          const config = getStatusConfig(st as CallStatus);
          return (
            <button
              key={st}
              onClick={() => setFilter(st as CallStatus)}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors flex items-center gap-1 ${
                filter === st
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Lista */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredCalls.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay llamadas en el historial
          </div>
        ) : (
          filteredCalls.map((call, idx) => {
            const config = getStatusConfig(call.status);
            const duration = formatDuration(call.call_duration_seconds);
            
            return (
              <div
                key={`${call.phone}-${call.updated_at}-${idx}`}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1 min-w-0">
                  {/* Icon */}
                  <div className={`shrink-0 ${config.iconColor}`}>
                    {config.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 truncate">
                        {call.user_name || 'Sin nombre'}
                      </p>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded whitespace-nowrap">
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{call.phone}</p>
                  </div>
                </div>

                {/* Duración y tiempo */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto gap-1 pl-8 sm:pl-0">
                  <button
                    aria-label="Volver a llamar"
                    onClick={() => openReset(call.phone)}
                    disabled={resetting === call.phone}
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors order-last sm:order-first"
                    title="Volver a llamar (Mover a Contactos)"
                  >
                    {resetting === call.phone ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <RefreshCw size={16} />
                    )}
                  </button>
                  
                  <div className="flex flex-col items-start sm:items-end">
                    {duration && (
                      <p className="text-sm font-medium text-gray-700">
                        {duration}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={10} />
                      {formatDate(call.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Permitir volver a llamar?</AlertDialogTitle>
            <AlertDialogDescription>
              {targetPhone}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset} disabled={resetting !== null}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
