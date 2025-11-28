// src/components/dashboard/TransferenciasWidget.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Phone, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Transfer = {
  id: string;
  retell_call_id: string;
  phone: string;
  reason: string | null;
  priority: 'urgent' | 'normal';
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  agent_id: string | null;
  created_at: string;
  accepted_at: string | null;
  completed_at: string | null;
};

export default function TransferenciasWidget() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState<string | null>(null);

  useEffect(() => {
    // Pedir permiso para notificaciones
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    loadTransfers();

    // Subscribe a cambios en tiempo real
    const channel = supabase
      .channel('transfers-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'call_transfers',
          filter: 'status=eq.pending',
        },
        (payload) => {
          const newTransfer = payload.new as Transfer;
          setTransfers((prev) => [newTransfer, ...prev]);
          
          // Mostrar notificación browser
          showNotification(newTransfer);
          
          // Reproducir sonido (opcional)
          playNotificationSound();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'call_transfers',
        },
        (payload) => {
          const updatedTransfer = payload.new as Transfer;
          setTransfers((prev) =>
            prev.map((t) => (t.id === updatedTransfer.id ? updatedTransfer : t))
          );
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  async function loadTransfers() {
    try {
      const { data, error } = await supabase
        .from('call_transfers')
        .select('*')
        .in('status', ['pending', 'accepted'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransfers(data || []);
    } catch (error) {
      console.error('Error cargando transferencias:', error);
    } finally {
      setLoading(false);
    }
  }

  function showNotification(transfer: Transfer) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification('🔔 Nueva Transferencia', {
        body: `Llamada de ${transfer.phone}\n${transfer.reason || 'Sin motivo especificado'}`,
        icon: '/phone-icon.png',
        tag: transfer.id,
        requireInteraction: transfer.priority === 'urgent',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  function playNotificationSound() {
    const audio = new Audio('/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Ignorar si el browser bloquea autoplay
    });
  }

  async function handleAccept(transferId: string) {
    setAccepting(transferId);
    
    try {
      const res = await fetch('/api/transferencias/aceptar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transfer_id: transferId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Error aceptando transferencia');
      }

      const result = await res.json();
      console.log('✅ Transferencia aceptada:', result);

      // Mostrar mensaje de éxito
      alert('✅ Transferencia aceptada. Contestá tu teléfono.');
      
    } catch (error: any) {
      console.error('Error:', error);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setAccepting(null);
    }
  }

  async function handleReject(transferId: string) {
    if (!confirm('¿Rechazar esta transferencia?')) return;

    try {
      const { error } = await supabase
        .from('call_transfers')
        .update({ status: 'rejected' })
        .eq('id', transferId);

      if (error) throw error;

      // Remover de la lista local
      setTransfers((prev) => prev.filter((t) => t.id !== transferId));
    } catch (error) {
      console.error('Error rechazando:', error);
      alert('❌ Error rechazando transferencia');
    }
  }

  function getPriorityColor(priority: string) {
    return priority === 'urgent' 
      ? 'bg-red-100 text-red-700 border-red-300' 
      : 'bg-blue-100 text-blue-700 border-blue-300';
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'pending':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'accepted':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-blue-500" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  }

  const pendingTransfers = transfers.filter((t) => t.status === 'pending');
  const activeTransfers = transfers.filter((t) => t.status === 'accepted');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Transferencias</h2>
        {pendingTransfers.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
            {pendingTransfers.length} pendiente{pendingTransfers.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Transferencias pendientes */}
      {pendingTransfers.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">Pendientes</h3>
          {pendingTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className={`border-2 rounded-lg p-4 ${getPriorityColor(transfer.priority)} animate-pulse`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Phone className="text-gray-700" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">{transfer.phone}</p>
                    <p className="text-sm text-gray-600">
                      {transfer.reason || 'Sin motivo especificado'}
                    </p>
                  </div>
                </div>
                <span className="text-xs bg-white px-2 py-1 rounded">
                  {transfer.priority === 'urgent' ? '🔥 Urgente' : '📋 Normal'}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(transfer.id)}
                  disabled={accepting === transfer.id}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {accepting === transfer.id ? 'Aceptando...' : '✅ Aceptar'}
                </button>
                <button
                  onClick={() => handleReject(transfer.id)}
                  disabled={accepting === transfer.id}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 transition-colors"
                >
                  ❌ Rechazar
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Hace {getTimeAgo(transfer.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Transferencias activas */}
      {activeTransfers.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700">En Curso</h3>
          {activeTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className="border rounded-lg p-4 bg-green-50 border-green-200"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(transfer.status)}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{transfer.phone}</p>
                  <p className="text-sm text-gray-600">En curso...</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estado vacío */}
      {pendingTransfers.length === 0 && activeTransfers.length === 0 && (
        <div className="text-center py-12">
          <Phone className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">No hay transferencias pendientes</p>
          <p className="text-sm text-gray-400 mt-2">
            Las solicitudes de la IA aparecerán aquí
          </p>
        </div>
      )}
    </div>
  );
}

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}d`;
}