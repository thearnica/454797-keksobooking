'use strict';
(function () {
  var MIN_COORD_Y = 100;
  var MAX_COORD_Y = 500;
  var FILTER_DEBOUNCE_TIMEOUT = 500;

  var startupScripts = [];

  var mapPins;
  var cartOfAdverts = document.querySelector('.map');
  var mainMapPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');

  var clamp = function (min, max, value) {
    return Math.min(max, Math.max(min, value));
  };

  var loading = function () {
    cartOfAdverts.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
    window.disabledInputs();
  };

  var propagatePinAddress = function () {
    var box = mainMapPin.getBoundingClientRect();
    window.updateAddress(
        mainMapPin.offsetLeft + box.width / 2,
        mainMapPin.offsetTop + box.height
    );
  };

  var mainMapPinDragger = function () {
    var mouseIsHoldedAt = null;
    mainMapPin.addEventListener('mousedown', function (evt) {
      mouseIsHoldedAt = {
        x: evt.clientX,
        y: evt.clientY
      };
    });

    document.addEventListener('mouseup', function () {
      mouseIsHoldedAt = null;
    });

    document.addEventListener('mousemove', function (evt) {
      if (mouseIsHoldedAt) {
        var delta = {
          x: -mouseIsHoldedAt.x + evt.clientX,
          y: -mouseIsHoldedAt.y + evt.clientY
        };
        mouseIsHoldedAt = {
          x: evt.clientX,
          y: evt.clientY
        };
        var left = (mainMapPin.offsetLeft + delta.x);
        var top = clamp(MIN_COORD_Y, MAX_COORD_Y, mainMapPin.offsetTop + delta.y);

        mainMapPin.style.left = left + 'px';
        mainMapPin.style.top = top + 'px';

        propagatePinAddress();
        evt.preventDefault();
      }
    }, true);
  };

  var updateFilters = window.debounce(FILTER_DEBOUNCE_TIMEOUT, function () {
    window.showMapPins(mapPins, window.filterFactory());
  });

  var initFilters = function () {
    window.getAllFilters().forEach(function (filter) {
      filter.addEventListener('change', updateFilters);
    });
  };

  var initMainMapPin = function () {
    cartOfAdverts.classList.remove('map--faded');
    window.setActiveMapPin(null);
    window.showMapPins(mapPins, window.filterFactory());
    form.classList.remove('notice__form--disabled');
    window.includedInputs();
    mainMapPinDragger();
    mainMapPin.removeEventListener('mouseup', onMainPinClick);

    form.addEventListener('reset', function () {
      mainMapPin.style.left = '';
      mainMapPin.style.top = '';
    });
  };

  var onMainPinClick = function () {
    if (window.adverts) {
      initMainMapPin();
    } else {
      startupScripts.push(initMainMapPin);
    }
  };

  // Initialization

  cartOfAdverts.classList.remove('map--faded');
  loading();

  initFilters();

  mainMapPin.addEventListener('mouseup', onMainPinClick);

  window.backend.load(function (adverts) {
    window.adverts = adverts;
    mapPins = window.renderMapPins();
    window.mapPins = mapPins;
    window.setupMapPins(mapPins, window.showCard, window.hideCard);
    window.hideMapPins(mapPins);

    startupScripts.forEach(function (cb) {
      cb();
    });
  }, window.showError);

  window.propagatePinAddress = propagatePinAddress;
})();
