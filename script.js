window.addEventListener("DOMContentLoaded", () => {
   const main = document.getElementsByTagName('main')[0];
   const input = document.getElementsByTagName('input')[0];


   document.addEventListener('click', function(e) {
      if(e.target.className === 'field'){
         main.classList.add('is-focus');
      } else{
         main.classList.remove('is-focus');
      }
   });
   document.addEventListener('keydown', function(e) {
      if(e.code === 'Enter' || e.code === 'NumpadEnter'){
         window.open(`https://wa.me/${input.value}`)
      }
   });
 });