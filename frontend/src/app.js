/* ===== Navbar: centered row, smooth slide to section, progress hairline ===== */
const menu = document.getElementById('menu');
const burger = document.getElementById('burger');
const progress = document.getElementById('navProgress');
const links = [...document.querySelectorAll('a[data-spy]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

/* custom eased scroll (nicer than default) */
function smoothScrollTo(targetY, duration = 650){
  const startY = window.scrollY;
  const delta = targetY - startY;
  const t0 = performance.now();
  const ease = t => t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; // easeInOutCubic
  function step(now){
    const p = Math.min(1, (now - t0)/duration);
    scrollTo(0, startY + delta * ease(p));
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

links.forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (!id || !id.startsWith('#')) return;
    e.preventDefault();
    const sec = document.querySelector(id);
    if (!sec) return;
    const offset = 68; // keep a bit under the navbar
    const y = sec.getBoundingClientRect().top + window.scrollY - offset;
    smoothScrollTo(y);
    menu?.classList.remove('open'); burger?.classList.remove('open'); burger?.setAttribute('aria-expanded','false');
    history.pushState(null,'',id);
  });
});

function setActiveByScroll(){
  const y = scrollY + 120; let active = links[0];
  sections.forEach((s,i)=>{ const t=s.offsetTop, b=t+s.offsetHeight; if (y>=t && y<b) active=links[i]; });
  links.forEach(a => a.classList.toggle('active', a===active));
}
function updateProgress(){
  const dh=document.documentElement, h=dh.scrollHeight-dh.clientHeight;
  progress.style.width = (h>0 ? (scrollY/h)*100 : 0) + '%';
}
addEventListener('scroll', ()=>{ setActiveByScroll(); updateProgress(); }, { passive:true });
addEventListener('resize', setActiveByScroll);
requestAnimationFrame(()=>{ setActiveByScroll(); updateProgress(); });

burger?.addEventListener('click', ()=>{
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ===== Public config from backend (.env → /api/public) =====
   We display: studio email + social URLs + USERNAMES on hero & Oracle cards. */
async function loadPublicConfig(){
  try{
    const res = await fetch('http://localhost:3000/api/public');
    if (!res.ok) return;
    const cfg = await res.json();

    // Email
    const email = cfg?.studioEmail || 'studio@example.com';
    const emailEls = [document.getElementById('studioEmail'), document.getElementById('footerEmail')].filter(Boolean);
    emailEls.forEach(a => { a.href = `mailto:${email}`; a.textContent = email; });

    // Social links
    const setHref = (id, url)=>{ const el=document.getElementById(id); if(el && url) el.href=url; };
    setHref('xLink', cfg?.social?.x); setHref('xCard', cfg?.social?.x);
    setHref('discordLink', cfg?.social?.discord); setHref('discordCard', cfg?.social?.discord);
    setHref('ytLink', cfg?.social?.youtube); setHref('ytCard', cfg?.social?.youtube);
    setHref('gitLink', cfg?.social?.github); setHref('gitCard', cfg?.social?.github);

    // Usernames (from env or derived from URL)
    const user = (k, url) => cfg?.usernames?.[k] || (url||"").replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/,"").split('/').pop() || '';
    const xu = user('x', cfg?.social?.x); const du=user('discord', cfg?.social?.discord);
    const yu = user('youtube', cfg?.social?.youtube); const gu=user('github', cfg?.social?.github);

    const setText = (id, handle)=>{ const el=document.getElementById(id); if(el) el.textContent = handle ? '@'+handle : ''; };
    setText('xUser', xu); setText('xUserCard', xu);
    setText('discordUser', du); setText('discordUserCard', du);
    setText('ytUser', yu); setText('ytUserCard', yu);
    setText('gitUser', gu); setText('gitUserCard', gu);
  }catch(e){ /* ignore in dev */ }
}
loadPublicConfig();

/* Copy email */
const copyBtn = document.getElementById('copyEmail');
copyBtn?.addEventListener('click', async ()=>{
  const el = document.getElementById('studioEmail');
  if (!el) return;
  try{ await navigator.clipboard.writeText(el.textContent.trim()); copyBtn.textContent='Copied'; setTimeout(()=>copyBtn.textContent='Copy', 1400); }
  catch{ copyBtn.textContent='Copy failed'; setTimeout(()=>copyBtn.textContent='Copy', 1400); }
});

/* ===== Oracle form submit → /api/contact (email + DB) ===== */
async function postJSON(url, data){
  const res = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  return res.json();
}
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('contactStatus');
const sendBtn = document.getElementById('sendBtn');
form?.addEventListener('submit', async (e)=>{
  e.preventDefault(); statusEl.classList.remove('error'); statusEl.textContent='';
  const data = Object.fromEntries(new FormData(form));
  if (data.website) { statusEl.textContent='Blocked.'; return; } // honeypot
  sendBtn.classList.add('btn-loading'); sendBtn.disabled = true;
  try{
    const out = await postJSON('http://localhost:3000/api/contact', data);
    if (out.ok){ statusEl.textContent='Delivered. Check your inbox.'; form.reset(); }
    else { statusEl.classList.add('error'); statusEl.textContent = out.error || 'Failed to send.'; }
  }catch{ statusEl.classList.add('error'); statusEl.textContent='Network error. Please try again.'; }
  finally{ sendBtn.classList.remove('btn-loading'); sendBtn.disabled=false; }
});
