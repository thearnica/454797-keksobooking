'use strict';
(function () {
  window.renderOffer = function (offer, advert) {
    var APPARTMENS_TYPE = window.APPARTMENS_TYPE;

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
})();
