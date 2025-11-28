'use client';

import { useState } from 'react';
import ContactosWidget from '@/components/dashboard/ContactosWidget';
import QueueWidget from '@/components/dashboard/QueueWidget';
import TransferenciasWidget from '@/components/dashboard/TransferenciasWidget';
import WhatsAppWidget from '@/components/dashboard/WhatsAppWidget';
import HistorialWidget from '@/components/dashboard/HistorialWidget';
import ConsolaAgente from '@/components/dashboard/ConsolaAgente';
import Link from 'next/link';

export default function DashboardPage() {
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [refreshQueue, setRefreshQueue] = useState(0);
  const [refreshContactos, setRefreshContactos] = useState(0);
  const [showConsola, setShowConsola] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header con toggle de consola */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setShowConsola(!showConsola)}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg font-semibold transition-colors ${
              showConsola
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showConsola ? '📞 Ocultar Consola' : '📞 Mostrar Consola'}
          </button>
          <Link
            href="/consola"
            className="text-sm text-blue-600 hover:underline whitespace-nowrap"
          >
            Abrir consola en página completa →
          </Link>
        </div>
      </div>

      {/* Consola (opcional) */}
      {showConsola && (
        <div className="bg-white rounded-lg shadow p-6">
          <ConsolaAgente />
        </div>
      )}

      {/* Grid de widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zona 1: Contactos */}
        <div className="bg-white rounded-lg shadow p-6 lg:row-span-2">
          <ContactosWidget
            onCallStarted={() => setRefreshQueue((prev) => prev + 1)}
            refreshTrigger={refreshContactos}
          />
        </div>

        {/* Zona 2: Monitor de Cola */}
        <div className="bg-white rounded-lg shadow p-6">
          <QueueWidget
            refreshTrigger={refreshQueue}
            onQueueEmpty={() => setRefreshHistory((prev) => prev + 1)}
          />
        </div>

        {/* Zona 3: Historial de Llamadas */}
        <div className="bg-white rounded-lg shadow p-6">
          <HistorialWidget
            refreshTrigger={refreshHistory}
            onContactReset={() => setRefreshContactos((prev) => prev + 1)}
          />
        </div>

        {/* Zona 4: Transferencias */}
        <div className="bg-white rounded-lg shadow p-6">
          <TransferenciasWidget />
        </div>

        {/* Zona 5: WhatsApp */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <WhatsAppWidget />
        </div>
      </div>
    </div>
  );
}