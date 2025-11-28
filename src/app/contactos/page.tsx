'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Upload, Plus, X } from 'lucide-react';

type NuevoContacto = {
  phone: string;
  user_name: string;
  locale: 'es' | 'en';
};

export default function ContactosPage() {
  const [contacts, setContacts] = useState<NuevoContacto[]>([]);
  const [importing, setImporting] = useState(false);

  function handleAddContact() {
    setContacts([...contacts, { phone: '', user_name: '', locale: 'es' }]);
  }

  function handleRemoveContact(index: number) {
    setContacts(contacts.filter((_, i) => i !== index));
  }

  function handleChangeContact(index: number, field: keyof NuevoContacto, value: string) {
    const newContacts = [...contacts];
    if (field === 'locale') {
      const val = value === 'en' ? 'en' : 'es';
      newContacts[index].locale = val;
    } else if (field === 'phone') {
      newContacts[index].phone = value;
    } else if (field === 'user_name') {
      newContacts[index].user_name = value;
    }
    setContacts(newContacts);
  }

  async function handleImport() {
    const validContacts = contacts.filter((c) => c.phone.trim() !== '');

    if (validContacts.length === 0) {
      toast.warning('Agrega al menos un contacto con teléfono');
      return;
    }

    setImporting(true);

    try {
      const res = await fetch('/api/contactos/importar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: validContacts }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`✅ ${data.imported} contactos importados`);
        setContacts([]);
        window.location.href = '/dashboard';
      } else {
        toast.error(data.error ?? 'Error al importar');
      }
    } catch (error) {
      console.error('Error importando:', error);
      toast.error('Error al importar contactos');
    } finally {
      setImporting(false);
    }
  }

  function handlePasteCSV(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const text = e.clipboardData.getData('text');
    const lines = text.split('\n').filter((l) => l.trim());

    const parsed = lines.map((line) => {
      const [phone, name, localeRaw] = line.split(',').map((s) => s.trim());
      const locale = localeRaw === 'en' ? 'en' : 'es';
      return { phone, user_name: name || '', locale } as NuevoContacto;
    });

    setContacts([...contacts, ...parsed]);
    e.preventDefault();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold">Importar Contactos</h1>
        <button
          onClick={() => (window.location.href = '/dashboard')}
          className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
        >
          ← Volver al Dashboard
        </button>
      </div>

      {/* Método 1: Pegar CSV */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Upload size={20} />
          Pegar CSV (Teléfono, Nombre)
        </h2>
        <textarea
          placeholder="Pega aquí tu CSV:
+50688812334, Juan Pérez
+50677734521, María López
50662633553, Roberto"
          className="w-full h-32 p-3 border rounded-lg font-mono text-sm"
          onPaste={handlePasteCSV}
        />
      </div>

      {/* Método 2: Agregar manualmente */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Plus size={20} />
            Agregar Manualmente
          </h2>
          <button
            onClick={handleAddContact}
            className="w-full sm:w-auto px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center"
          >
            + Agregar Fila
          </button>
        </div>

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No hay contactos. Haz clic en &quot;Agregar Fila&quot; o pega un CSV arriba.
          </p>
        ) : (
          <div className="space-y-4 sm:space-y-2">
            {contacts.map((contact, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-gray-50 sm:bg-transparent p-3 sm:p-0 rounded-lg border sm:border-0 border-gray-200">
                <input
                  type="text"
                  placeholder="+50612345678"
                  value={contact.phone}
                  onChange={(e) => handleChangeContact(index, 'phone', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg w-full sm:w-auto"
                />
                <input
                  type="text"
                  placeholder="Nombre (opcional)"
                  value={contact.user_name}
                  onChange={(e) => handleChangeContact(index, 'user_name', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg w-full sm:w-auto"
                />
                <div className="flex gap-3">
                  <select
                    value={contact.locale}
                    onChange={(e) => handleChangeContact(index, 'locale', e.target.value)}
                    className="flex-1 sm:flex-none px-3 py-2 border rounded-lg"
                  >
                    <option value="es">ES</option>
                    <option value="en">EN</option>
                  </select>
                  <button
                    onClick={() => handleRemoveContact(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 sm:border-0 bg-white sm:bg-transparent flex-none"
                    aria-label="Eliminar fila"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {contacts.length > 0 && (
          <button
            onClick={handleImport}
            disabled={importing}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
          >
            {importing ? 'Importando...' : `Importar ${contacts.length} Contactos`}
          </button>
        )}
      </div>
    </div>
  );
}
