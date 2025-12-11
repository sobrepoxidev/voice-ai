import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

type Customer = {
  id: number;
  created_at: string | null;
  updated_at: string | null;
  user_name: string | null;
  user_number: string;
  user_wa_number: string | null;
  locale: string | null;
  interest_first: string | null;
  interest_second: string | null;
  qualified: string | null;
  qualified_for: string | null;
  conversations: Array<Record<string, unknown>> | null;
  last_call_id: string | null;
  last_interaction_ts: string | null;
  wa_sending: boolean | null;
  wa_number_backup: string | null;
  conversation_context: Record<string, unknown> | null;
  last_wa_interaction: string | null;
  wa_consent_received: boolean | null;
  trees_interested_count: number | null;
  interaction_stage: string | null;
};

function formatDate(ts: string | null): string {
  if (!ts) return 'N/A';
  const d = new Date(ts);
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

export default async function ClientsPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Server Components cannot set cookies here
        },
      },
    }
  );

  const { data } = await supabase
    .from('out_customers')
    .select('*')
    .order('last_interaction_ts', { ascending: false })
    .limit(50);

  const customers: Customer[] = (data as Customer[]) || [];

  const total = customers.length;
  const withConsent = customers.filter((c) => c.wa_consent_received === true).length;
  const qualifiedCount = customers.filter((c) => (c.qualified ?? '').length > 0).length;
  const localeEs = customers.filter((c) => (c.locale ?? 'es') === 'es').length;

  return (
    <div className="space-y-6 ">
      <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-2xl font-bold text-gray-900">{qualifiedCount}</div>
          <div className="text-xs text-gray-600">Calificados</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-2xl font-bold text-gray-900">{withConsent}</div>
          <div className="text-xs text-gray-600">WA Consent</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border">
          <div className="text-2xl font-bold text-gray-900">{localeEs}</div>
          <div className="text-xs text-gray-600">Locale ES</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Nombre</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Número</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Locale</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Intereses</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Calificado</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Última Interacción</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Conversaciones</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>Sin registros</td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{c.user_name ?? 'Sin nombre'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700 font-mono">{c.user_number}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{c.locale ?? 'es'}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {(c.interest_first ?? '—')}{c.interest_second ? `, ${c.interest_second}` : ''}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{c.qualified ?? '—'}{c.qualified_for ? ` (${c.qualified_for})` : ''}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{formatDate(c.last_interaction_ts)}</td>
                    <td className="px-4 py-2 text-xs text-gray-600">
                      {c.conversations && c.conversations.length > 0
                        ? `Items: ${c.conversations.length}`
                        : '—'}
                    </td>
                    <td className="px-4 py-2 text-xs">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-700">
                        {c.interaction_stage ?? 'initial'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
