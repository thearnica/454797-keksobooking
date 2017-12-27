'use strict';
(function () {
  var PRICE_RANGES = {
    min: 10000,
    max: 50000
  };
  var mapFilters = document.querySelector('.map__filters');

  var typeFilter = mapFilters.querySelector('[name="housing-type"]');
  var priceFilter = mapFilters.querySelector('[name="housing-price"]');
  var roomsFilter = mapFilters.querySelector('[name="housing-rooms"]');
  var guestsFilter = mapFilters.querySelector('[name="housing-guests"]');

  var featuresFilter = [].concat.apply([], mapFilters.querySelectorAll('input'));
  var allFilters = [].concat.apply([], mapFilters.querySelectorAll('select, input'));

  var compareValues = function (a, b) {
    return a === 'any' || String(a) === String(b);
  };

  var comparePriceRanges = function (range, ranges, value) {
    switch (range) {
      case 'any':
        return true;
      case 'low':
        return value < ranges.min;
      case 'middle':
        return value >= ranges.min && value <= ranges.max;
      case 'high':
        return value > ranges.max;
    }
    return false;
  };

  var extractFeatures = function () {
    return featuresFilter
        .filter(function (input) {
          return input.checked;
        })
        .map(function (input) {
          return input.value;
        });
  };

  var compareFeatures = function (filter, features) {
    return filter.reduce(function (result, feature) {
      return result && features.indexOf(feature) > -1;
    }, true);
  };

  window.filterFactory = function getFilter() {
    var features = extractFeatures();
    var type = typeFilter.value;
    var price = priceFilter.value;
    var rooms = roomsFilter.value;
    var guests = guestsFilter.value;

    return function (advert) {
      return true &&
        compareValues(type, advert.offer.type) &&
        compareValues(rooms, advert.offer.rooms) &&
        compareValues(guests, advert.offer.guests) &&
        comparePriceRanges(price, PRICE_RANGES, advert.offer.price) &&
        compareFeatures(features, advert.offer.features) &&
        true;
    };
  };

  window.getAllFilters = function () {
    return allFilters;
  };
})();
