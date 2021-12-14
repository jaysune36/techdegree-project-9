document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    if(localStorage.getItem('portfolioView') === 'list-view'){
    portfolioView(localStorage.getItem('portfolioView'));
    }
    if(localStorage.getItem('portfolioView') === 'grid-view'){
      portfolioView(localStorage.getItem('portfolioView'));
      const gridView = document.querySelector('.grid-view');
      const listView = document.querySelector('.list-view');
      gridView.classList.add('active');
      listView.classList.remove('active');
    }
  })


  const mainBackground = document.getElementById('main-img')
  const aboutInfo = document.getElementById('about');
  const nav = document.querySelector('.nav-bar');
  const info = aboutInfo.querySelector('.display');
  const skillsList = document.getElementById('skills')
  const portfolio = document.getElementById('portfolio');
  const portfolioList = portfolio.querySelector('.portfolio-list');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modal = document.getElementById('modal');
  const contactInfo = document.getElementById('contact');
  const media768 = window.matchMedia('(max-width: 768px)');

  function slideDownShow(element) {
      element.classList.toggle('slide-down');
      element.style.overflow = '';
      element.style.maxHeight = '100%';
  }

  function slideDownHide(element) {
      element.classList.toggle('slide-down');
      element.style.overflow = 'null';
      element.style.maxHeight = '0';
  }

  function createModal(item, index) {
    const modalBox = modal.querySelector('.modal-box');
    const div = document.createElement('div');
    div.classList.add('port-item-info');
    div.setAttribute('data-index', index);
    div.innerHTML = `
    ${item.firstElementChild.innerHTML}
    <div class='port-modal-info'>
      ${item.lastElementChild.innerHTML}
    </div>
    `;
    modalBox.insertAdjacentElement('beforeend', div);
    console.log(item.firstElementChild);
  }

  function moveImg() {
    let position = 0;
    setInterval(() => {
      if(mainBackground.style.transform === `scale(1.3)`) {
        mainBackground.style.transform = `scale(1)`;
        mainBackground.style.transition = 'transform 15s ease-in-out'
      } else {
        mainBackground.style.transform = `scale(1.3)`;
        mainBackground.style.transition = 'transform 15s ease-in-out'
      }
    }, 20000);
  }

  function portfolioView(viewType) {
    let index = 0;
    if(viewType.includes('list-view')) {
      for (let i = 0; i < portfolioItems.length; i++) {
        let portfolioItem = portfolioItems[i];
        portfolioItem.classList.add('list');
        portfolioItem.removeAttribute('data-index');
      }
    } 
    if (viewType.includes('grid-view')) {
      portfolioList.classList.add('grid');
      for (let i = 0; i < portfolioItems.length; i++) {
        let portfolioItem = portfolioItems[i];
        portfolioItem.setAttribute('data-index', index);
        portfolioItem.classList.remove('list');
        index++
      }
    }
  }

  if(!media768.matches) {
  moveImg();
  }

  aboutInfo.addEventListener('fullscreenchange', (e) => {

    if(aboutInfo.fullscreenElement) {
      console.log('this screen has changed')
    }
  })

  aboutInfo.addEventListener('click', (e) => {
    if (e.target !== aboutInfo) {
      const aboutSection = e.target.closest('section');
      if (aboutSection) {
        if(media768.matches) {
        if (info.className === 'display') {
          slideDownShow(info);
        } else {
          slideDownHide(info);
        }
      }
      }
    }
  })

  skillsList.addEventListener('click', (e) => {
    if(media768.matches) {
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
  }
  })

  portfolio.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV' || e.target.parentElement.tagName === 'DIV' || e.target.parentElement.parentElement.tagName === 'DIV') {
      const view = e.target.closest('div');
      const viewClass = view.className;
      if (view.className === 'list-view') {
        view.className = viewClass + ' active';
        const listView = view.nextElementSibling;
        listView.classList.remove('active');
        portfolioList.classList.remove('grid');
        localStorage.setItem('portfolioView', 'list-view');
        portfolioView(view.className);
        index = 0;
      }
      if (view.className === 'grid-view') {
        view.className = viewClass + ' active';
        const listView = view.previousElementSibling;
        listView.classList.remove('active');
        localStorage.setItem('portfolioView', 'grid-view');
        portfolioView(view.className);
      }
    }
    if(media768.matches) {
    if (e.target.tagName === 'IMG') {
      const skillDisplay = e.target.nextElementSibling
      const portfolioInfo = e.target.parentElement.nextElementSibling.lastElementChild;
      if (portfolioInfo.className === '') {
        e.target.classList.toggle('no-filter');
        slideDownShow(portfolioInfo);
          setTimeout(() => {
            skillDisplay.style.display = 'flex';
            slideDownShow(skillDisplay);
          }, 50);
      } else {
        e.target.classList.toggle('no-filter');
        slideDownHide(portfolioInfo);
        skillDisplay.style.display = 'none';
        slideDownShow(skillDisplay);
      }
    }
  }
    if (e.target.parentElement.parentElement.parentElement.className.includes('grid') && !media768.matches) {
      if (e.target.tagName === 'IMG') {
        modal.style.display = 'block';
        let portModalIndex = e.target.parentElement.parentElement.getAttribute('data-index');
        createModal(portfolioItems[portModalIndex], portModalIndex);
      }
    }
  })

  modal.addEventListener('click', (e) => {
    const portModal = document.querySelector('.port-item-info');
    let portIndex = portModal.getAttribute('data-index');
    if (e.target.className === 'modal-close') {
      modal.style.display = 'none';
      modal.lastElementChild.firstElementChild.nextElementSibling.remove();
    }
    if (e.target.className === 'scroll-left') {
      if(portIndex > 0) {
      portModal.remove()
      createModal(portfolioItems[parseFloat(portIndex) - 1], parseFloat(portIndex) - 1);
      } else {
        return null;
      }
    }
    if (e.target.className === 'scroll-right') {
      if(portIndex < (portfolioItems.length - 1)) {
      portModal.remove()
      createModal(portfolioItems[parseFloat(portIndex) + 1], parseFloat(portIndex) + 1);
      }
    }
  })

})