'use client';

import { useEffect, useState } from 'react';
import { Phone, Clock } from 'lucide-react';

export default function AgentStatus({
  userName,
  userId,
}: {
  userName: string;
  userId: string;
}) {
  const [queueStatus, setQueueStatus] = useState({
    active_calls: 0,
    queue_size: 0,
    max_concurrent: 20,
  });

  useEffect(() => {
    // Cargar estado inicial
    loadQueueStatus();

    // Actualizar cada 3 segundos
    const interval = setInterval(loadQueueStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  async function loadQueueStatus() {
    try {
      const res = await fetch('/api/cola/status');
      if (res.ok) {
        const data = await res.json();
        setQueueStatus(data);
      }
    } catch (error) {
      console.error('Error cargando estado:', error);
    }
  }

  const statusColor =
    queueStatus.active_calls > 0 ? 'bg-orange-500' : 'bg-green-500';

  return (
    <div className="bg-white border-b border-gray-200 px-2 md:px-6 py-1 sm:py-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-0">
        {/* Info del agente */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
            <span className="font-semibold text-gray-900">{userName}</span>
          </div>
          <span className="text-sm text-gray-500">
            {queueStatus.active_calls > 0 ? 'Activo' : 'Disponible'}
          </span>
        </div>

        {/* Estadísticas */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          {/* Llamadas activas */}
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              Llamadas: {queueStatus.active_calls} / {queueStatus.max_concurrent}
            </span>
          </div>

          {/* Cola */}
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-orange-600" />
            <span className="text-sm font-medium text-gray-700">
              En cola: {queueStatus.queue_size}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}