const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
  box.addEventListener('mousemove', (e) => {
    const x = e.clientX - box.getBoundingClientRect().left;
    const y = e.clientY - box.getBoundingClientRect().top;
    box.querySelector('.glow').style.left = `${x}px`;
    box.querySelector('.glow').style.top = `${y}px`;
  });
});
