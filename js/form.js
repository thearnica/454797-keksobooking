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

  var ENTER_KEYCODE = 13;

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


  var syncValues = function (element, value) {
    element.value = value;
  };
  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(document.querySelector('#timein'), document.querySelector('#timeout'), ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(document.querySelector('#type'), document.querySelector('#price'), ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueWithMin);

  var form = document.querySelector('.notice__form');
  var inputs = form.querySelectorAll('input');

  function showAllErrorMessages() {
    inputs.forEach(function (input) {
      input.style.border = '';
    });
    var allFields = [].concat.apply([], form.querySelectorAll('input'));
    var invalidFields = allFields.filter(function (input) {
      return !input.validity.valid || (input.required && !input.value);
    });
    invalidFields.forEach(function (input) {
      input.style.border = '5px solid red';
    });
    return invalidFields.length;
  }

  var submitButton = form.querySelector('.form__submit');

  submitButton.addEventListener('click', function (evt) {
    if (showAllErrorMessages()) {
      evt.preventDefault();
    }
  });

  submitButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (showAllErrorMessages()) {
        evt.preventDefault();
      }
    }
  });

  window.disabledInputs = function () {
    inputs.forEach(function (input) {
      input.getAttribute('disabled');
    });
  };

  window.includedInputs = function () {
    inputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });
  };

  window.updateAddress = function (x, y) {
    form.querySelector('[name="address"]').value = 'x: ' + x + ', y: ' + y;
  };

  checkRoomCapacity();
})();
