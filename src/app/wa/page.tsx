'use client';

import { MessageSquare, Settings, Plus } from 'lucide-react';

export default function WhatsAppPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare size={26} />
          WhatsApp
        </h1>
        <div className="flex items-center gap-2">
          <button
            aria-label="Configurar integración"
            disabled
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-400 bg-gray-100 cursor-not-allowed"
          >
            <Settings size={16} className="inline mr-2" />
            Configurar
          </button>
          <button
            aria-label="Crear chat"
            disabled
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed"
          >
            <Plus size={16} className="inline mr-2" />
            Nuevo Chat
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Chats</h2>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">Próximamente</span>
          </div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-3 border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gray-100" />
                  <div>
                    <div className="h-3 w-28 bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-40 bg-gray-100 rounded" />
                  </div>
                </div>
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Panel de conversación</h2>
          <div className="border rounded-lg h-[50vh] sm:h-[60vh] flex flex-col">
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="size-8 rounded-full bg-gray-100" />
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-3 flex items-center gap-2">
              <input
                aria-label="Mensaje"
                disabled
                placeholder="Escribe un mensaje"
                className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-gray-400"
              />
              <button
                aria-label="Enviar"
                disabled
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
