/* eslint-disable no-console */
/* eslint-disable linebreak-style */
window.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementsByTagName('main')[0];
  const input = document.getElementsByTagName('input')[0];
  const selector = document.querySelector('.iti__selected-dial-code');
  const favorite = document.querySelector('#favorite');
  const menu = document.querySelector('.menu-main');
  const li = menu.querySelectorAll('li');

  function isAN(value) {
    return /^[-]?\d+$/.test(value);
  }
  document.addEventListener('click', (e) => {
    if (e.target.parentNode.parentNode.classList.contains('menu-main')) {
      li.forEach(e => e.lastChild.classList.remove('current'))
      e.target.classList.add('current');
    }
    if(e.target === favorite){
      add_favorite(this)
    }
    if (e.target.className === 'field') {
      main.classList.add('is-focus');
    } else {
      main.classList.remove('is-focus');
    }
    if (e.target.className === 'btn-submit') {
      e.preventDefault();
      window.open(`https://wa.me/${selector.innerText + input.value}`);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (isAN(input.value)) {
        window.open(`https://wa.me/${selector.innerText + input.value}`);
      } else {
        console.log('e');
      }
    }
    input.addEventListener('input', e => {
      if (!isAN(e.target.value)) {
        input.value = '';
        console.log('err');
      }
   })
  });
    // Добавить в Избранное 
  function add_favorite(a) { 
    title=document.title; 
    url=document.location; 
    try { 
      // Internet Explorer 
      window.external.AddFavorite(url, title); 
    } 
    catch (e) { 
      try { 
        // Mozilla 
        window.sidebar.addPanel(title, url, ""); 
      } 
      catch (e) { 
        // Opera 
        if (typeof(opera)=="object") { 
          a.rel="sidebar"; 
          a.title=title; 
          a.url=url; 
          return true; 
        } 
        else { 
          // Unknown 
          alert('Браузеры Safari и Chrome не поддерживают добавление в избранное. Нажмите Ctrl-D чтобы добавить страницу в закладки'); 
        } 
      } 
    } 
    return false; 
  }
});
