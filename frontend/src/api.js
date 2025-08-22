export const API_BASE = "http://localhost:3000/api";
const TOKEN_KEY = "tartarus:token";
export const setToken = (t)=> localStorage.setItem(TOKEN_KEY, t);
export const getToken = ()=> localStorage.getItem(TOKEN_KEY);
export const isAuthed = ()=> !!getToken();

export async function api(path, opts={}){
  const headers = { "Content-Type":"application/json", ...(opts.headers||{}) };
  const t = getToken(); if (t) headers.Authorization = `Bearer ${t}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const data = await res.json().catch(()=> ({}));
  if (!res.ok) throw new Error(data.error || "API error");
  return data;
}
