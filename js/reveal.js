document.addEventListener('DOMContentLoaded', ()=>{
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(document.querySelectorAll('.reveal'));
  if(prefersReduced){ items.forEach(i=>i.classList.add('revealed')); return }
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay')||'0',10);
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('revealed');
        obs.unobserve(el);
      }
    });
  },{threshold:0.12});

  items.forEach((el,i)=>{
    if(!el.hasAttribute('data-delay')) el.setAttribute('data-delay', String(i*80));
    io.observe(el);
  });
});
