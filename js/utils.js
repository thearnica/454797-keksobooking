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

  window.debounce = function (timeout, callback) {
    var tm = 0;
    var tailCall = false;
    var fire = function () {
      tm = 0;
      if (tailCall) {
        callback();
        tm = setTimeout(fire, timeout);
      }
      tailCall = false;
    };
    return function () {
      if (!tm) {
        callback();
        tm = setTimeout(fire, timeout);
      } else {
        tailCall = true;
      }
    };
  };
})();
