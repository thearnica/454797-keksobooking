'use strict';

window.synchronizeFields = function (fieldA, fieldB, valuesA, valuesB, mergeFn) {
  function onFieldChange(from, to, vA, vB) {
    return function () {
      var valueIndex = vA.indexOf(from.value);
      if (valueIndex >= 0) {
        mergeFn(to, vB[valueIndex]);
      }
    };
  }

  fieldA.addEventListener('change', onFieldChange(fieldA, fieldB, valuesA, valuesB));
  fieldB.addEventListener('change', onFieldChange(fieldB, fieldA, valuesB, valuesA));
}
