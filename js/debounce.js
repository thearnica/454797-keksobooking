'use strict';
(function () {
  var debounce = function (timeout, callback) {
    var tm = 0;
    return function () {
      clearTimeout(tm);
      tm = setTimeout(callback, timeout);
    };
  };

  window.debounce = debounce;
})();
