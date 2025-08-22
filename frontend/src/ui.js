export function setupUI(){
  // nav active (scroll spy)
  const links = [...document.querySelectorAll('a[data-spy]')];
  const secs = links.map(a=> document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function onScroll(){
    const y = scrollY + 120;
    let active = links[0];
    secs.forEach((sec,i)=> {
      const t = sec.offsetTop, b = t + sec.offsetHeight;
      if (y>=t && y<b) active = links[i];
    });
    links.forEach(a=> a.classList.toggle('active', a===active));
  }
  addEventListener('scroll', onScroll, { passive:true }); onScroll();

  // reveal-on-scroll
  const rev = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=> e.isIntersecting && e.target.classList.add('visible'));
  }, { threshold: .12 });
  rev.forEach(el=> io.observe(el));

  // year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
}
