'use strict';
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
  });
};

window.visibleMapPins = function (mapPins) {
  mapPins.forEach(function (mapPin) {
    mapPin.style.display = '';
  });
};

window.removeActiveMapPin = function (mapPins) {
  mapPins.forEach(function (mapPin) {
    mapPin.classList.remove('map__pin--active');
  });
};

var setupMapPin = function (mapPin, index, callback) {
  mapPin.addEventListener('click', function () {
    callback(index);
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      callback(index);
    }
  });
};

window.setupMapPins = function (mapPins, callback) {
  mapPins.forEach(function (mapPin, index) {
    setupMapPin(mapPin, index, callback);
  });
};
