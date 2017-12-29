'use strict';
(function () {
  var cartOfAdverts = document.querySelector('.map');
  var template = document.querySelector('template');
  var mapPinTemplate = template.content.querySelector('.map__pin');
  var pinsOfMap = document.querySelector('.map__pins');

  cartOfAdverts.classList.remove('map--faded');

  var renderMapPins = function () {
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

  var hideMapPins = function (mapPins) {
    mapPins.forEach(function (mapPin) {
      mapPin.style.display = 'none';
      mapPin.onHide();
    });
  };

  var showMapPins = function (mapPins, check) {
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

  var removeActiveMapPin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var setActiveMapPin = function (pin) {
    removeActiveMapPin();
    if (pin) {
      pin.classList.add('map__pin--active');
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
      if (evt.keyCode === window.ENTER_KEYCODE) {
        onShow(index);
      }
    });
  };

  var setupMapPins = function (mapPins, onShow, onHide) {
    mapPins.forEach(function (mapPin, index) {
      setupMapPin(mapPin, index, onShow, onHide);
    });
  };

  window.renderMapPins = renderMapPins;
  window.hideMapPins = hideMapPins;
  window.showMapPins = showMapPins;
  window.setActiveMapPin = setActiveMapPin;
  window.setupMapPins = setupMapPins;
})();
