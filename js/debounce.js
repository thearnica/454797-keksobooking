'use strict';
(function () {
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
