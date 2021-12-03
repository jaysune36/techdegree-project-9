document.addEventListener('DOMContentLoaded', () => {
  const aboutInfo = document.getElementById('about');
  const nav = document.querySelector('.nav-bar');
  const info = aboutInfo.querySelector('.display');
  const skillsList = document.getElementById('skills')
  const portfolio = document.getElementById('portfolio');
  let portfolioItems = document.querySelectorAll('.portfolio-item');
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
      element.style.overflow = 'hidden';
      element.style.maxHeight = '0';
  }

  function createModal(item, index) {
    const modalBox = modal.querySelector('.modal-box');
    const div = document.createElement('div');
    div.classList.add('port-item-info');
    div.setAttribute('data-index', index)
    div.innerHTML = `
    <img src='${item.firstElementChild.getAttribute('src')}' alt='${item.firstElementChild.getAttribute('alt')}' class='no-filter'>
    <div class='port-modal-info'>
      ${item.lastElementChild.innerHTML}
    </div>
`;
    modalBox.insertAdjacentElement('beforeend', div);
  }

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

  portfolio.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV' || e.target.parentElement.tagName === 'DIV' || e.target.parentElement.parentElement.tagName === 'DIV') {
      const view = e.target.closest('div');
      const viewClass = view.className;
      const portfolioList = portfolio.querySelector('.portfolio-list');
      const portfolioItems = portfolioList.querySelectorAll('.portfolio-item');
      let index = 0;
      if (view.className === 'list-view') {
        view.className = viewClass + ' active';
        const listView = view.nextElementSibling;
        listView.classList.remove('active');
        portfolioList.classList.remove('grid')
        for (let i = 0; i < portfolioItems.length; i++) {
          let portfolioItem = portfolioItems[i];
          portfolioItem.classList.add('list');
          portfolioItem.removeAttribute('data-index');
        }
        index = 0;
      }
      if (view.className === 'grid-view') {
        view.className = viewClass + ' active';
        const listView = view.previousElementSibling;
        listView.classList.remove('active');
        for (let i = 0; i < portfolioItems.length; i++) {
          let portfolioItem = portfolioItems[i];
          portfolioItem.setAttribute('data-index', index);
          portfolioItem.classList.remove('list');
          index++
        }
        portfolioList.classList.add('grid');
        console.log(index)
      }
    }
    if(media768.matches) {
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
  }
    if (e.target.parentElement.parentElement.className.includes('grid') && !media768.matches) {
      if (e.target.tagName === 'IMG') {
        modal.style.display = 'block';
        let portModalIndex = e.target.parentElement.getAttribute('data-index');
        createModal(portfolioItems[portModalIndex], portModalIndex);
      }
    }
  })

  modal.addEventListener('click', (e) => {
    const portfolioList = portfolio.querySelector('.portfolio-list');
    const portfolioItems = portfolioList.querySelectorAll('.portfolio-item');
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


})