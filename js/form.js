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

  var TYPE_TO_MINIMAL_COST = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
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

  var checkCost = function () {
    var typeSelector = document.querySelector('#type');
    var costSelector = document.querySelector('#price');
    typeSelector.addEventListener('change', function () {
      var minCost = TYPE_TO_MINIMAL_COST[typeSelector.value];
      costSelector.setAttribute('min', minCost);
      costSelector.value = minCost;
    });
  };

  var checkTime = function () {
    var timeInSelector = document.querySelector('#timein');
    var timeOutSelector = document.querySelector('#timeout');
    timeInSelector.addEventListener('change', function () {
      timeOutSelector.value = timeInSelector.value;
    });
    timeOutSelector.addEventListener('change', function () {
      timeInSelector.value = timeOutSelector.value;
    });
  };

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

  checkRoomCapacity();
  checkCost();
  checkTime();
})();
