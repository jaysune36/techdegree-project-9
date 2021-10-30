document.addEventListener('DOMContentLoaded', ()=> {
  const aboutInfo = document.getElementById('about');
  let aboutToggle = false;

  aboutInfo.addEventListener('click', (e) => {
    const info = aboutInfo.querySelector('p');
    if(e.target !== aboutInfo) {
      const aboutSection = e.target.closest('section');
      if(aboutSection){
        if(aboutToggle === false) {
          info.style.height = '100%';
          info.style.transition = 'transform .5s ease-out'
          info.style.tranform = 'translateY(100px)'
          aboutToggle = true;
        } else {
          info.style.height = '0';
          info.style.transition = 'height .5s ease-out'
          aboutToggle = false;
        }
      }
    } 
  })



})