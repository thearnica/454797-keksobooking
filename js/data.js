'use strict';

var OFFERS_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var APPARTMENS_TYPE = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var OFFER_TYPES = Object.keys(APPARTMENS_TYPE);
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var floorRandom = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

var randomPickFrom = function (from) {
  return from[floorRandom(0, from.length)];
};

var randomPickAndTimesFrom = function (from) {
  var newFrom = [];
  var length = floorRandom(0, from.length);

  for (var i = 0; i < length - 1; i++) {
    newFrom.push(randomPickFrom(from));
  }

  return newFrom;
};

var createTemplate = function (seq) {

  var title = randomPickFrom(OFFERS_TITLE);
  var location = {
    x: 300 + Math.random() * (900 - 300),
    y: 100 + Math.random() * (500 - 100)
  };
  var type = randomPickFrom(OFFER_TYPES);
  var checkin = randomPickFrom(OFFER_CHECKINS);
  var checkout = randomPickFrom(OFFER_CHECKOUTS);
  var features = randomPickAndTimesFrom(OFFER_FEATURES);

  return {
    author: {
      avatar: 'img/avatars/user0' + seq + '.png'
    },

    offer: {
      title: title,
      address: location.x.toFixed(2) + ', ' + location.y.toFixed(2),
      price: floorRandom(1000, 1000000),
      type: type,
      rooms: floorRandom(1, 5),
      guests: floorRandom(0, 20),
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: '',
      photos: []
    },

    location: location
  };
};

var fillAdverts = function (count) {
  var adverts = [];
  for (var i = 0; i < count; i++) {
    adverts.push(createTemplate(i + 1));
  }
  return adverts;
};

window.adverts = fillAdverts(8);
