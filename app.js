document.addEventListener('DOMContentLoaded', ()=> {
  const aboutInfo = document.getElementById('about');
  const nav = document.querySelector('.nav-bar');
  const info = aboutInfo.querySelector('.display');

  aboutInfo.addEventListener('click', (e) => {
    if(e.target !== aboutInfo) {
      const aboutSection = e.target.closest('section');
      if(aboutSection){
        if(info.className === 'display') {
        info.classList.toggle('slide-down');
        info.style.overflow = '';
        info.style.maxHeight = '100%';
      } else {
        info.classList.toggle('slide-down');
        info.style.overflow = 'hidden';
        info.style.maxHeight = '0';
      }
    }
    } 
  })



})