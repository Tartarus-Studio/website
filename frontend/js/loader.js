document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enterBtn");
  const uw = document.getElementById("underworld");

  function startDescent(){
    if (!uw) { location.hash = "#myth"; return; }
    uw.classList.remove("hidden");
    // small delay, then “closing” animation and navigate
    setTimeout(()=> uw.classList.add("closing"), 900);
    setTimeout(()=>{
      uw.classList.add("hidden");
      location.hash = "#myth"; // redirect to Home/Overview
      requestAnimationFrame(()=> window.scrollBy({ top: -60, behavior: "smooth" }));
      // trigger counters
      animateCounts();
    }, 1700);
  }

  if (btn) btn.addEventListener("click", startDescent);

  // optional: auto play if user lands with #gate and presses Enter key
  document.addEventListener("keydown", (e)=>{
    if (location.hash === "#gate" && (e.key === "Enter")) startDescent();
  });
});

// Counters
function animateCounts(){
  const els = document.querySelectorAll(".count");
  els.forEach(el=>{
    const target = Number(el.getAttribute("data-count")||"0");
    const dur = 800;
    const t0 = performance.now();
    function tick(t){
      const p = Math.min(1, (t - t0)/dur);
      const v = Math.floor(target * (0.1 + 0.9 * p*p));
      el.textContent = String(v);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
