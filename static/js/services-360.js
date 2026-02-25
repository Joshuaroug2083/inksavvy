// services-360.js
// Simplified micro-animation logic: Removes layout-breaking absolute positioning
(function(){
  const stage = document.querySelector('.services-stage');
  if(!stage) return;
  const stack = stage.querySelector('.services-stack');
  const cards = Array.from(stack.querySelectorAll('.service'));
  if(!cards.length) return;

  function resetLayout(){
    stage.style.height = 'auto';
    if (stack) {
      stack.style.position = 'static';
      stack.style.display = 'grid';
    }
    cards.forEach(c => {
      c.style.position = 'relative';
      c.style.top = 'auto';
      c.style.left = 'auto';
      c.style.transform = '';
      c.style.opacity = '';
      c.style.zIndex = 'auto';
      c.style.width = 'auto';
      c.style.maxWidth = 'none';
    });
  }

  // init
  resetLayout();
  window.addEventListener('resize', resetLayout);
})();
