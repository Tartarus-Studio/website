export function setupIntro(){
  const uw = document.getElementById("uw");
  const btn = document.getElementById("enterBtn");
  const start = ()=>{
    if (!uw) { location.hash="#myth"; return; }
    uw.classList.remove("hidden");
    setTimeout(()=> uw.classList.add("closing"), 900);
    setTimeout(()=>{
      uw.classList.add("hidden");
      location.hash="#myth";
      requestAnimationFrame(()=> window.scrollBy({top:-60,behavior:"smooth"}));
      animateCounts();
    }, 1700);
  };
  btn?.addEventListener("click", start);
  document.addEventListener("keydown", (e)=> {
    if (location.hash==="#gate" && e.key==="Enter") start();
  });
}

export function animateCounts(){
  const els = document.querySelectorAll(".count");
  els.forEach(el=>{
    const target = Number(el.getAttribute("data-count")||"0");
    const dur = 900; const t0 = performance.now();
    const tick = (t)=>{
      const p = Math.min(1,(t-t0)/dur);
      el.textContent = String(Math.floor(target*(0.05+0.95*p*p)));
      if (p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
