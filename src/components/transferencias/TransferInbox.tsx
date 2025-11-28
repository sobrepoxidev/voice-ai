// components/transferencias/TransferInbox.tsx

'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { useRealtime } from '@/lib/hooks/useRealtime';
import TransferCard from './TransferCard';

type Transfer = {
  id: string;
  phone: string;
  reason: string;
  priority: 'normal' | 'urgent';
  status: string;
  created_at: string;
};

export default function TransferInbox() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const { subscribe } = useRealtime();

  // Cargar transferencias pendientes
  useEffect(() => {
    loadTransfers();
  }, []);

  // Suscribirse a nuevas transferencias en tiempo real
  useEffect(() => {
    const unsub = subscribe((event: { type: string; data: Transfer }) => {
      if (event.type === 'transfer_new') {
        setTransfers((prev) => [event.data, ...prev]);
        
        // Reproducir sonido si es urgente
        if (event.data.priority === 'urgent') {
          new Audio('/sounds/urgent-transfer.mp3').play();
        }
      }
      
      if (event.type === 'transfer_update') {
        setTransfers((prev) =>
          prev.map((t) => (t.id === event.data.id ? event.data : t))
        );
      }
    });

    return unsub;
  }, [subscribe]);

  async function loadTransfers() {
    try {
      const res = await fetch('/api/transferencias?status=pending');
      const data = await res.json();
      setTransfers(data.transfers || []);
    } catch (error) {
      console.error('Error cargando transferencias:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept(transferId: string) {
    try {
      const res = await fetch('/api/transferencias/aceptar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transfer_id: transferId })
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Error: ${error.error}`);
        return;
      }

      // Actualizar UI
      setTransfers((prev) => prev.filter((t) => t.id !== transferId));
      
      alert('✅ Transferencia aceptada - La llamada se conectará a tu extensión');
    } catch (error) {
      console.error('Error aceptando:', error);
      alert('Error al aceptar transferencia');
    }
  }

  async function handleReject(transferId: string) {
    try {
      await fetch('/api/transferencias/rechazar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transfer_id: transferId })
      });

      setTransfers((prev) => prev.filter((t) => t.id !== transferId));
    } catch (error) {
      console.error('Error rechazando:', error);
    }
  }

  if (loading) return <div>Cargando transferencias...</div>;

  const urgentCount = transfers.filter((t) => t.priority === 'urgent').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Transfer Inbox
          {urgentCount > 0 && (
            <span className="ml-2 text-red-600 animate-pulse">
              🔴 {urgentCount} Urgente{urgentCount > 1 ? 's' : ''}
            </span>
          )}
        </h2>
        <span className="text-gray-500">{transfers.length} pendientes</span>
      </div>

      {transfers.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No hay transferencias pendientes
        </div>
      ) : (
        <div className="space-y-3">
          {transfers.map((transfer) => (
            <TransferCard
              key={transfer.id}
              transfer={transfer}
              onAccept={() => handleAccept(transfer.id)}
              onReject={() => handleReject(transfer.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}