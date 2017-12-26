'use strict';
(function () {
  window.synchronizeFields = function (from, to, valuesA, valuesB, callback) {
    var valueIndex = valuesA.indexOf(from.value);
    if (valueIndex >= 0) {
      callback(to, valuesB[valueIndex]);
    }
  };
})();
