'use strict';
(function () {
  var APPARTMENS_TYPE = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var RUB = '\u20BD';

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

  var compareFeaturesItems = function (features, item) {
    return features.find(function (feature) {
      return item.classList.contains('feature--' + feature);
    });
  };

  var createNewFeaturesItems = function (features, items) {
    return items.map(function (item) {
      return compareFeaturesItems(features, item) ? item : null;
    });
  };

  var renderOffer = function (offer, advert) {
    var offerTitle = offer.querySelector('h3');
    var offerAddress = offer.querySelector('p small');
    var offerPrice = offer.querySelector('.popup__price');
    var offerType = offer.querySelector('h4');
    var featuresList = offer.querySelector('.popup__features');
    var featuresItems = [].concat.apply([], offer.querySelectorAll('.feature'));
    var offerCapacity = offer.querySelector('p:nth-of-type(3)');
    var offerSchedule = offer.querySelector('p:nth-of-type(4)');
    var offerDescription = offer.querySelector('p:nth-of-type(5)');
    var offerAvatar = offer.querySelector('img');

    offerTitle.textContent = advert.offer.title;
    offerAddress.textContent = advert.offer.address;
    offerPrice.textContent = advert.offer.price + ' ' + RUB + '/ночь';
    offerType.textContent = APPARTMENS_TYPE[advert.offer.type];
    offerCapacity.textContent = createTitleRoom(advert.offer.rooms) + 'для ' + createTitleGuest(advert.offer.guests);
    offerSchedule.textContent = 'Заезд после ' + advert.offer.checkin + ' выезд ' + advert.offer.checkout;

    var filteredFeatures = createNewFeaturesItems(advert.offer.features, featuresItems);

    featuresItems.forEach(function (featuresItem) {
      if (filteredFeatures.indexOf(featuresItem) < 0) {
        featuresList.removeChild(featuresItem);
      }
    });

    offerDescription.textContent = advert.offer.description;
    offerAvatar.src = advert.author.avatar;

    return offer;
  };

  window.renderOffer = renderOffer;
})();
