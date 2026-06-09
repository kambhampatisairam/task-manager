const BASE_URL = '/api/tasks';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  getTasks: () => request(BASE_URL),

  createTask: (payload) =>
    request(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateTask: (id, payload) =>
    request(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  deleteTask: (id) => request(`${BASE_URL}/${id}`, { method: 'DELETE' }),
};
