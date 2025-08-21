const API_BASE = "http://localhost:3000/api";
const TOKEN_KEY = "tartarus:token";

function setToken(t){ localStorage.setItem(TOKEN_KEY, t); }
function getToken(){ return localStorage.getItem(TOKEN_KEY); }
function isAuthed(){ return !!getToken(); }

async function api(path, opts={}){
  const headers = { "Content-Type":"application/json", ...(opts.headers||{}) };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const data = await res.json().catch(()=> ({}));
  if (!res.ok) throw new Error(data.error || "API error");
  return data;
}

// Auth modal
(function authUI(){
  const modal = document.getElementById("authModal");
  if (!modal) return;

  const tabs = modal.querySelectorAll(".tab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginStatus = document.getElementById("loginStatus");
  const signupStatus = document.getElementById("signupStatus");

  function openAuth(which="login"){
    modal.classList.remove("hidden");
    tabs.forEach(t=> t.classList.toggle("active", t.dataset.tab===which));
    loginForm.classList.toggle("hidden", which!=="login");
    signupForm.classList.toggle("hidden", which!=="signup");
    (which==="login" ? loginStatus : signupStatus).textContent = "";
  }
  function closeAuth(){ modal.classList.add("hidden"); }

  modal.addEventListener("click", (e)=>{
    if (e.target.matches(".modal") || e.target.hasAttribute("data-close")) closeAuth();
    if (e.target.matches(".tab")) openAuth(e.target.dataset.tab);
  });

  // Login
  loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    loginStatus.textContent = "Signing in…";
    const fd = new FormData(loginForm);
    try{
      const out = await api("/auth/login", { method:"POST", body: JSON.stringify(Object.fromEntries(fd)) });
      setToken(out.token);
      loginStatus.textContent = "Welcome back!";
      setTimeout(closeAuth, 600);
    }catch(err){
      loginStatus.textContent = err.message;
    }
  });

  // Signup
  signupForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    signupStatus.textContent = "Creating account…";
    const fd = new FormData(signupForm);
    const payload = Object.fromEntries(fd);
    try{
      await api("/auth/register", { method:"POST", body: JSON.stringify(payload) });
      // auto-login after signup
      const out = await api("/auth/login", { method:"POST", body: JSON.stringify({ email: payload.email, password: payload.password }) });
      setToken(out.token);
      signupStatus.textContent = "Account ready!";
      setTimeout(closeAuth, 600);
    }catch(err){
      signupStatus.textContent = err.message;
    }
  });

  // Connect buttons
  document.addEventListener("click", async (e)=>{
    if (!e.target.matches(".connect-btn")) return;
    const slug = e.target.getAttribute("data-slug");
    if (!isAuthed()){ openAuth("login"); return; }
    e.target.disabled = true; e.target.textContent = "Connecting…";
    try{
      await api("/games/link", { method:"POST", body: JSON.stringify({ slug }) });
      e.target.textContent = "Connected ✓";
    }catch(err){
      e.target.textContent = "Failed";
      setTimeout(()=>{ e.target.disabled=false; e.target.textContent="Connect"; }, 1200);
    }
  });
})();
