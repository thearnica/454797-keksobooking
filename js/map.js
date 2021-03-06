'use strict';
(function () {
  function clamp(min, max, value) {
    return Math.min(max, Math.max(min, value));
  }

  var mapPins;

  var cartOfAdverts = document.querySelector('.map');

  var mainMapPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');

  var loading = function () {
    cartOfAdverts.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
    window.disabledInputs();
  };

  // main map pin
  function mainMapPinDragger() {
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
        var top = clamp(100, 500, mainMapPin.offsetTop + delta.y);

        mainMapPin.style.left = left + 'px';
        mainMapPin.style.top = top + 'px';

        var box = mainMapPin.getBoundingClientRect();
        window.updateAddress(
            left + box.width / 2,
            top + box.height
        );
        evt.preventDefault();
      }
    }, true);
  }

  var updateFilters = window.debounce(500, function () {
    window.showMapPins(mapPins, window.filterFactory());
  });
  window.getAllFilters().forEach(function (filter) {
    filter.addEventListener('change', updateFilters);
  });

  function initMainMapPin() {
    cartOfAdverts.classList.remove('map--faded');
    window.removeActiveMapPin(mapPins);
    window.showMapPins(mapPins, window.filterFactory());
    form.classList.remove('notice__form--disabled');
    window.includedInputs();
    mainMapPinDragger();
    mainMapPin.removeEventListener('mouseup', initMainMapPin);

    form.addEventListener('reset', function () {
      mainMapPin.style.left = '';
      mainMapPin.style.top = '';
    });
  }

  var startupScripts = [];

  mainMapPin.addEventListener('mouseup', function () {
    if (window.adverts) {
      initMainMapPin();
    } else {
      startupScripts.push(initMainMapPin);
    }
  });

  cartOfAdverts.classList.remove('map--faded');

  loading();


  window.backend.load(function (adverts) {
    window.adverts = adverts;
    mapPins = window.renderMapPins();
    window.setupMapPins(mapPins, window.showCard, window.hideCard);
    window.hideMapPins(mapPins);

    startupScripts.forEach(function (cb) {
      cb();
    });
  }, window.showError);
})();
