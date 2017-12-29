'use strict';
(function () {
  var synchronizeFields = function (source, destination, valuesFrom, valuesTo, callback) {
    var valueIndex = valuesFrom.indexOf(source.value);
    if (valueIndex >= 0) {
      callback(destination, valuesTo[valueIndex]);
    }
  };

  window.synchronizeFields = synchronizeFields;
})();
