// Year
document.getElementById("year").textContent = new Date().getFullYear().toString();

// Smooth jump from The Gate button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enterBtn");
  if (btn) btn.addEventListener("click", () => location.hash = "#myth");
});

// Simple ScrollSpy for nav highlighting
const spyLinks = [...document.querySelectorAll('a[data-spy]')];
const sections = spyLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScroll(){
  const y = window.scrollY + 120; // offset
  let active = spyLinks[0];
  sections.forEach((sec, i) => {
    const top = sec.offsetTop, bottom = top + sec.offsetHeight;
    if (y >= top && y < bottom) active = spyLinks[i];
  });
  spyLinks.forEach(a => a.classList.toggle('active', a === active));
}
addEventListener('scroll', onScroll, {passive:true});
onScroll();

// Simple canvases (bars & wave) if kept from earlier version
(function initCanvases(){
  const bars = document.getElementById("bars");
  const wave = document.getElementById("wave");
  if (!bars && !wave) return;

  if (bars){
    const ctx = bars.getContext("2d");
    const w = bars.width = bars.clientWidth; const h = bars.height = 120; let t = 0;
    (function frame(){
      ctx.clearRect(0,0,w,h);
      for(let i=0;i<32;i++){
        const x = (i/32)*w;
        const val = (Math.sin(t+i*.3)+1)/2;
        const bh = val * (h*0.9);
        const grd = ctx.createLinearGradient(0,0,0,bh);
        grd.addColorStop(0,"#8a2be2"); grd.addColorStop(1,"#5ddcff");
        ctx.fillStyle = grd; ctx.fillRect(x, h-bh, w/36, bh);
      }
      t += 0.08; requestAnimationFrame(frame);
    })();
  }
  if (wave){
    const ctx = wave.getContext("2d");
    const w = wave.width = wave.clientWidth; const h = wave.height = 120; let t = 0;
    (function frame(){
      ctx.clearRect(0,0,w,h);
      ctx.beginPath();
      for(let x=0;x<w;x++){
        const y = h/2 + Math.sin((x+t)/20)*20;
        x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.strokeStyle = "#5ddcff"; ctx.stroke();
      t += 1.6; requestAnimationFrame(frame);
    })();
  }
})();
