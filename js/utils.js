'use strict';

(function () {
  var modalError = document.querySelector('.modal--error');
  modalError.querySelector('.modal__close').addEventListener('click', function () {
    modalError.classList.remove('modal--visible');
  });

  window.showError = function (message) {
    modalError.classList.add('modal--visible');
    modalError.querySelector('.modal__message').innerHTML = message;
  };
})();
