export async function body(request){try{return await request.json()}catch{return {}}}
export function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}})}
export async function userFrom(request,env){const c=request.headers.get('Cookie')||'';const m=c.match(/yu_session=([A-Za-z0-9_-]+)/);if(!m)return null;const hash=await sha(m[1]);const row=await env.DB.prepare('SELECT u.id,u.username,u.display_name,u.bio,u.avatar FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?').bind(hash,Date.now()).first();return row||null}
export async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
export function cookie(value,maxAge){return `yu_session=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`}
export function validText(s,max){return typeof s==='string'&&s.length<=max}
