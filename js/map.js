'use strict';

var offersTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offersTypes = ['flat', 'house', 'bungalo'];
var offersCheckins = ['12:00', '13:00', '14:00'];
var offersCheckouts = ['12:00', '13:00', '14:00'];
var offersFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var floorRandom = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

var randomPickFrom = function (from) {
  return from[Math.floor(Math.random() * from.length)];
};

var randomPickAndTimesFrom = function (from) {
  var newFrom = [];
  var length = Math.floor(Math.random() * from.length);

  for (var i = 0; i < length - 1; i++) {
    newFrom.push(randomPickFrom(from));
  }

  return newFrom;
};

var createTemplate = function (x) {

  var title = randomPickFrom(offersTitles);
  var location = {
    'x': 300 + Math.random() * (900 - 300),
    'y': 100 + Math.random() * (500 - 100)
  };
  var type = randomPickFrom(offersTypes);
  var checkin = randomPickFrom(offersCheckins);
  var checkout = randomPickFrom(offersCheckouts);
  var features = randomPickAndTimesFrom(offersFeatures);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + x + '.png'
    },

    'offer': {
      'title': title,
      'address': location.x.toFixed(2) + ', ' + location.y.toFixed(2),
      'price': floorRandom(1000, 10000000),
      'type': type,
      'rooms': floorRandom(1, 5),
      'guests': floorRandom(0, 20),
      'checkin': checkin,
      'checkout': checkout,
      'features': features,
      'description': '',
      'photos': []
    },

    'location': location
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

var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var offerTemplate = document.querySelector('template').content.querySelector('.map__card');
var pinsOfMap = document.querySelector('.map__pins');

var renderMapPins = function () {
  var renderMapPin = function (advert) {
    var mapPin = mapPinTemplate.cloneNode(true);

    mapPin.style.left = advert.location.x + 'px';
    mapPin.style.top = advert.location.y + 'px';

    return mapPin;
  };

  var fragmentPins = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragmentPins.appendChild(renderMapPin(adverts[i]));
  }

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

    offerTitle.textContent = advert.offer.title;
    offerAddress.textContent = advert.offer.address;
    offerPrice.textContent = advert.offer.price + ' \u20BD/ночь';

    if (advert.offer.type === 'flat') {
      offerType.textContent = 'Квартира';
    } else if (advert.offer.type === 'bungalo') {
      offerType.textContent = 'Бунгало';
    } else {
      offerType.textContent = 'Дом';
    }

    var createTitleRoom = function (item) {
      if (item <= 1) {
        return item + ' комната ';
      }
      else if (item > 1 && item < 5) {
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

    offer.querySelector('p:nth-of-type(3)').textContent = createTitleRoom(advert.offer.rooms) + 'для ' + createTitleGuest(advert.offer.guests);
    offer.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + advert.offer.checkin + ' выезд ' + advert.offer.checkout;

    var compareFeaturesItems = function (items) {
      for (var i = 0; i < advert.offer.features.length; i++) {
        if (items.classList.contains('feature--' + advert.offer.features[i])) {
          return items;
        }
      }
      return null;
    };

    var createNewFeaturesItems = function (item) {
      var newFeaturesItems = [];
      for (var i = 0; i < item.length; i++) {
        newFeaturesItems.push(compareFeaturesItems(item[i]));
      }
      return newFeaturesItems;
    };

    var filteredFeatures = createNewFeaturesItems(featuresItems);

    for (var i = 0; i < featuresItems.length; i++) {
      if (filteredFeatures.indexOf(featuresItems[i]) < 0) {
        featuresList.removeChild(featuresItems[i]);
      }
    }

    offer.querySelector('p:nth-of-type(5)').textContent = advert.offer.description;
    offer.querySelector('img').src = advert.author.avatar;

    return offer;
  };

  var fragmentOffers = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragmentOffers.appendChild(renderOffer(adverts[i]));
  }

  cartOfAdverts.appendChild(fragmentOffers);
};

renderOffers();
