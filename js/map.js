'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function removeNode(popup) {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  }

  var cartOfAdverts = document.querySelector('.map');
  var template = document.querySelector('template');
  var offerTemplate = template.content.querySelector('.map__card');

  var activePopup = null;
  var mainMapPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');

  var closePopup = function () {
    window.removeActiveMapPin(mapPins);
    if (activePopup) {
      removeNode(activePopup);
      activePopup = null;
    }
    document.removeEventListener('keydown', closePopupOnEscPress);
  };

  var closePopupOnEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var findButtonClosePopup = function () {
    return activePopup.querySelector('.popup__close');
  };

  var closePopupOnClick = function () {
    findButtonClosePopup(activePopup).addEventListener('click', function () {
      closePopup();
    });
  };

  var closePopupOnEnterPress = function () {
    findButtonClosePopup(activePopup).addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });
  };

  var loading = function () {
    cartOfAdverts.classList.add('map--faded');
    form.classList.add('notice__form--disabled');
    window.disabledInputs();
  };

  var openPopup = function (index) {
    activePopup = offerTemplate.cloneNode(true);
    window.renderOffer(activePopup, window.adverts[index]);
    closePopupOnClick();
    closePopupOnEnterPress();
    cartOfAdverts.appendChild(activePopup);
  };

  var setupOpenPopup = function (index) {
    closePopup();
    openPopup(index);
    document.addEventListener('keydown', closePopupOnEscPress);
  };

  mainMapPin.addEventListener('mouseup', function () {
    cartOfAdverts.classList.remove('map--faded');
    window.removeActiveMapPin(mapPins);
    window.visibleMapPins(mapPins);
    form.classList.remove('notice__form--disabled');
    window.includedInputs();
  });

  cartOfAdverts.classList.remove('map--faded');

  loading();
  var mapPins = window.renderMapPins();
  window.hideMapPins(mapPins);
  window.setupMapPins(mapPins, setupOpenPopup);
})();
