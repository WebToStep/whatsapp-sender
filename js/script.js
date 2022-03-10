/* eslint-disable no-console */
/* eslint-disable linebreak-style */
window.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementsByTagName('main')[0];
  const input = document.getElementsByTagName('input')[0];
  const selector = document.querySelector('.iti__selected-dial-code');

  function isAN(value) {
    return /^[-]?\d+$/.test(value);
  }
  document.addEventListener('click', (e) => {
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
    input.addEventListener('keyup', e => {
      if (!isAN(e.target.value)) {
        input.value = '';
        console.log('err');
      }
   })
  });
});
