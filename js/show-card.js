'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    window.removeActiveMapPin();
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

  var openPopup = function (index) {
    activePopup = offerTemplate.cloneNode(true);
    window.renderOffer(activePopup, window.adverts[index]);
    activePopup.advertIndex = index;

    closePopupOnClick();
    closePopupOnEnterPress();
    cartOfAdverts.appendChild(activePopup);
  };

  window.showCard = function (index) {
    closePopup();
    openPopup(index);
    document.addEventListener('keydown', closePopupOnEscPress);
  };

  window.hideCard = function (index) {
    if (activePopup && activePopup.advertIndex === index) {
      closePopup();
    }
  };
})();
