export type ResetContactResponse = {
  success: boolean;
  contact?: {
    phone: string;
    user_name: string | null;
    locale?: string;
    called?: boolean;
  };
  error?: string;
};

export async function resetContact(phone: string): Promise<ResetContactResponse> {
  const res = await fetch('/api/contactos/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  const data: ResetContactResponse = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}
