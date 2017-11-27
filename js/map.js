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


var adverts = fillAdverts(8);

var cartOfAdverts = document.querySelector('.map');
cartOfAdverts.classList.remove('map--faded');
var template = document.querySelector('template');
var mapPinTemplate = template.content.querySelector('.map__pin');
var offerTemplate = template.content.querySelector('.map__card');
var pinsOfMap = document.querySelector('.map__pins');

var renderMapPins = function () {
  var renderMapPin = function (advert) {
    var mapPin = mapPinTemplate.cloneNode(true);
    var imagePin = mapPin.querySelector('img');

    mapPin.style.left = advert.location.x + 'px';
    mapPin.style.top = advert.location.y + 'px';
    imagePin.src = advert.author.avatar;

    return mapPin;
  };

  var fragmentPins = document.createDocumentFragment();

  adverts.forEach(function (advert) {
    fragmentPins.appendChild(renderMapPin(advert));
  });

  pinsOfMap.appendChild(fragmentPins);
};

renderMapPins();

var renderOffers = function () {
  var renderOffer = function (advert) {
    var offer = offerTemplate.cloneNode(true);
    var offerTitle = offer.querySelector('h3');
    var offerAddress = offer.querySelector('p small');
    var offerPrice = offer.querySelector('.popup__price');
    var offerType = offer.querySelector('h4');
    var featuresList = offer.querySelector('.popup__features');
    var featuresItems = offer.querySelectorAll('.feature');
    var offerCapacity = offer.querySelector('p:nth-of-type(3)');
    var offerSchedule = offer.querySelector('p:nth-of-type(4)');
    var offerDescription = offer.querySelector('p:nth-of-type(5)');
    var offerAvatar = offer.querySelector('img');

    offerTitle.textContent = advert.offer.title;
    offerAddress.textContent = advert.offer.address;
    offerPrice.textContent = advert.offer.price + ' \u20BD/ночь';
    offerType.textContent = APPARTMENS_TYPE[advert.offer.type];

    var createTitleRoom = function (item) {
      if (item <= 1) {
        return item + ' комната ';
      }
      if (item > 1 && item < 5) {
        return item + ' комнаты ';
      }
      return item + ' комнат ';
    };

    var createTitleGuest = function (item) {
      if (item === 1) {
        return item + ' гостя';
      }
      return item + ' гостей';
    };

    offerCapacity.textContent = createTitleRoom(advert.offer.rooms) + 'для ' + createTitleGuest(advert.offer.guests);
    offerSchedule.textContent = 'Заезд после ' + advert.offer.checkin + ' выезд ' + advert.offer.checkout;

    var compareFeaturesItems = function (items) {
      for (var i = 0; i < advert.offer.features.length; i++) {
        if (items.classList.contains('feature--' + advert.offer.features[i])) {
          return items;
        }
      }
      return null;
    };

    var createNewFeaturesItems = function (items) {
      var newFeaturesItems = [];
      items.forEach(function (item) {
        newFeaturesItems.push(compareFeaturesItems(item));
      });
      return newFeaturesItems;
    };

    var filteredFeatures = createNewFeaturesItems(featuresItems);

    featuresItems.forEach(function (featuresItem) {
      if (filteredFeatures.indexOf(featuresItem) < 0) {
        featuresList.removeChild(featuresItem);
      }
    });

    offerDescription.textContent = advert.offer.description;
    offerAvatar.src = advert.author.avatar;

    return offer;
  };

  var fragmentOffers = document.createDocumentFragment();

  adverts.forEach(function (advert) {
    fragmentOffers.appendChild(renderOffer(advert));
  });

  cartOfAdverts.appendChild(fragmentOffers);
};

renderOffers();
