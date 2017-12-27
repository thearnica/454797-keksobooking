'use strict';
(function () {
  var ENTER_KEYCODE = 13;

  var cartOfAdverts = document.querySelector('.map');
  var template = document.querySelector('template');
  var mapPinTemplate = template.content.querySelector('.map__pin');
  var pinsOfMap = document.querySelector('.map__pins');

  cartOfAdverts.classList.remove('map--faded');

  window.renderMapPins = function () {
    var adverts = window.adverts;
    var renderMapPin = function (advert) {
      var mapPin = mapPinTemplate.cloneNode(true);
      var imagePin = mapPin.querySelector('img');

      mapPin.advert = advert;
      mapPin.style.left = advert.location.x + 'px';
      mapPin.style.top = advert.location.y + 'px';
      imagePin.src = advert.author.avatar;

      return mapPin;
    };

    var fragmentPins = document.createDocumentFragment();
    var mapPins = [];

    adverts.forEach(function (advert) {
      var pin = renderMapPin(advert);
      mapPins.push(pin);
      fragmentPins.appendChild(pin);
    });

    pinsOfMap.appendChild(fragmentPins);
    return mapPins;
  };

  window.hideMapPins = function (mapPins) {
    mapPins.forEach(function (mapPin) {
      mapPin.style.display = 'none';
      mapPin.onHide();
    });
  };

  window.showMapPins = function (mapPins, check) {
    // visible
    mapPins
        .filter(function (mapPin) {
          return check(mapPin.advert);
        })
        .splice(0, 5)
        .forEach(function (mapPin) {
          mapPin.style.display = '';
        });

    // invisible
    mapPins
        .filter(function (mapPin) {
          return !check(mapPin.advert);
        })
        .forEach(function (mapPin) {
          mapPin.style.display = 'none';
          mapPin.onHide();
        });

  };

  window.removeActiveMapPin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var setupMapPin = function (mapPin, index, onShow, onHide) {
    mapPin.onHide = function () {
      onHide(index);
    };

    mapPin.addEventListener('click', function () {
      onShow(index);
    });

    mapPin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        onShow(index);
      }
    });
  };

  window.setupMapPins = function (mapPins, onShow, onHide) {
    mapPins.forEach(function (mapPin, index) {
      setupMapPin(mapPin, index, onShow, onHide);
    });
  };
})();
