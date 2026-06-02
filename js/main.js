// Toggle menu mobile
(function(){
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if(burger && menu){
    burger.addEventListener('click', () => menu.classList.toggle('open'));
  }
})();
