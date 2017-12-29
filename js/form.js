'use strict';
(function () {
  var ROOM_TO_GUESTS = {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0]
  };

  var GUESTS_CAPACITY_NAMES = {
    1: 'для 1 гостя',
    2: 'для 2 гостей',
    3: 'для 3 гостей',
    0: 'не для гостей'
  };

  var checkRoomCapacity = function () {
    var roomSelector = document.querySelector('#room_number');
    var capacitySelector = document.querySelector('#capacity');
    var allowedGuests = ROOM_TO_GUESTS[roomSelector.value];
    capacitySelector.innerHTML = '';
    Object.keys(GUESTS_CAPACITY_NAMES).forEach(function (key) {
      if (allowedGuests.indexOf(+key) >= 0) {
        var option = document.createElement('option');
        option.value = key;
        option.text = GUESTS_CAPACITY_NAMES[key];
        capacitySelector.appendChild(option);
      }
    });
    var capacity = capacitySelector.value;
    if (allowedGuests.indexOf(+capacity) < 0) {
      capacitySelector.value = allowedGuests[0];
    }
    roomSelector.addEventListener('change', checkRoomCapacity);
  };

  var autoSynchronizeFields = function (field1, field2, valuesSet1, valuesSet2, callback) {
    field1.addEventListener('change', function () {
      window.synchronizeFields(field1, field2, valuesSet1, valuesSet2, callback);
    });
    field2.addEventListener('change', function () {
      window.synchronizeFields(field2, field1, valuesSet2, valuesSet1, callback);
    });
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  var showAllErrorMessages = function (inputs) {
    inputs.forEach(function (input) {
      input.style.border = '';
    });

    var invalidFields = inputs.filter(function (input) {
      return !input.validity.valid || (input.required && !input.value);
    });
    invalidFields.forEach(function (input) {
      input.style.border = '5px solid red';
    });
    return invalidFields.length;
  };

  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var inputs = [].concat.apply([], form.querySelectorAll('input'));
  var submitButton = form.querySelector('.form__submit');

  checkRoomCapacity();

  autoSynchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  autoSynchronizeFields(type, price, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueWithMin);

  submitButton.addEventListener('click', function (evt) {
    if (showAllErrorMessages(inputs)) {
      evt.preventDefault();
    }
  });

  submitButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      if (showAllErrorMessages(inputs)) {
        evt.preventDefault();
      }
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      form.reset();
      window.propagatePinAddress();
    }, window.showError);
  });

  // exports

  var disabledInputs = function () {
    inputs.forEach(function (input) {
      input.getAttribute('disabled');
    });
  };

  var includedInputs = function () {
    inputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });
  };

  var updateAddress = function (x, y) {
    form.querySelector('[name="address"]').value = 'x: ' + x + ', y: ' + y;
  };

  window.disabledInputs = disabledInputs;
  window.includedInputs = includedInputs;
  window.updateAddress = updateAddress;
})();
