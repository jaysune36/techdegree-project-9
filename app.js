document.addEventListener('DOMContentLoaded', () => {
  const aboutInfo = document.getElementById('about');
  const nav = document.querySelector('.nav-bar');
  const info = aboutInfo.querySelector('.display');
  const skillsList = document.getElementById('skills')
  const portfolio = document.getElementById('portfolio');
  const contactInfo = document.getElementById('contact');
  const media768 = window.matchMedia('(max-width: 768px)');


  function slideDownShow(element) {
    if(media768.matches) {
    element.classList.toggle('slide-down');
    element.style.overflow = '';
    element.style.maxHeight = '100%';
    }
  }

  function slideDownHide(element) {
    if(media768.matches) {
    element.classList.toggle('slide-down');
    element.style.overflow = 'hidden';
    element.style.maxHeight = '0';
    }
  }

  aboutInfo.addEventListener('click', (e) => {
    if (e.target !== aboutInfo) {
      const aboutSection = e.target.closest('section');
      if (aboutSection) {
        if (info.className === 'display') {
          slideDownShow(info);
        } else {
          slideDownHide(info);
        }
      }
    }
  })

  portfolio.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      const portfolioInfo = e.target.nextElementSibling.lastElementChild;
      if (portfolioInfo.className === '') {
        e.target.classList.toggle('no-filter');
        slideDownShow(portfolioInfo);
      } else {
        e.target.classList.toggle('no-filter');
        slideDownHide(portfolioInfo)
      }
    }
  })

  skillsList.addEventListener('click', (e) => {
    if (e.target !== skillsList) {
      const skillSection = e.target.closest('section');
      const skillItems = skillsList.querySelectorAll('.skill');
      if (skillSection) {
        if (skillSection.className === '') {
          skillSection.className = 'open'
          let counter = 0;
          setInterval(() => {
            if (counter < 4) {
              slideDownShow(skillItems[counter])
              counter++
            }
          }, 40);
        } else {
          skillSection.className = '';
          for (let i = 0; i < skillItems.length; i++) {
            let skillItem = skillItems[i];
            slideDownHide(skillItem);
          }
        }
      }
    }
  })


})