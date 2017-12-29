'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  var modalError = document.querySelector('.modal--error');
  modalError.querySelector('.modal__close').addEventListener('click', function () {
    modalError.classList.remove('modal--visible');
  });

  var showError = function (message) {
    modalError.classList.add('modal--visible');
    modalError.querySelector('.modal__message').innerHTML = message;
  };

  window.showError = showError;
})();
