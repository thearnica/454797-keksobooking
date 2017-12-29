'use strict';
(function () {
  var template = document.querySelector('template');
  var offerTemplate = template.content.querySelector('.map__card');
  var cartOfAdverts = document.querySelector('.map');

  var activePopup = null;

  var removeNode = function (popup) {
    if (popup.parentNode) {
      popup.parentNode.removeChild(popup);
    }
  };

  var closePopup = function () {
    window.setActiveMapPin(null);
    if (activePopup) {
      removeNode(activePopup);
      activePopup = null;
    }
    document.removeEventListener('keydown', closePopupOnEscPress);
  };

  var closePopupOnEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
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
      if (evt.keyCode === window.ENTER_KEYCODE) {
        closePopup();
      }
    });
  };

  var openPopup = function (index) {
    activePopup = offerTemplate.cloneNode(true);
    window.renderOffer(activePopup, window.adverts[index]);
    activePopup.advertIndex = index;
    window.setActiveMapPin(window.mapPins[index]);

    closePopupOnClick();
    closePopupOnEnterPress();
    cartOfAdverts.appendChild(activePopup);
  };

  var showCard = function (index) {
    closePopup();
    openPopup(index);
    document.addEventListener('keydown', closePopupOnEscPress);
  };

  var hideCard = function (index) {
    if (activePopup && activePopup.advertIndex === index) {
      closePopup();
    }
  };

  window.showCard = showCard;
  window.hideCard = hideCard;
})();
