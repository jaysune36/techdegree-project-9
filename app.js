document.addEventListener('DOMContentLoaded', ()=> {
  const aboutInfo = document.getElementById('about');
  const nav = document.querySelector('.nav-bar');
  const info = aboutInfo.querySelector('.display');

  aboutInfo.addEventListener('click', (e) => {
    if(e.target !== aboutInfo) {
      const aboutSection = e.target.closest('section');
      if(aboutSection){
        info.classList.toggle('hide');
      }
    } 
  })



})