'use strict';

(function () {
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 86;

  window.pin = {
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    mainPin: document.querySelector('.map__pin--main'),

    updateAddress: function () {

      var locationX = parseInt(window.pin.mainPin.style.left, 10) + window.pin.MAIN_PIN_WIDTH / 2;
      var locationY = parseInt(window.pin.mainPin.style.top, 10) + window.pin.MAIN_PIN_HEIGHT;
      window.form.addressInput.value = locationX + ' ' + locationY;
    },

    renderPin: function (pin) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

      var pinElement = pinTemplate.cloneNode(true);

      var shiftLeft = pinElement.querySelector('img').width / 2;


      pinElement.style.left = pin.location.x + shiftLeft + 'px';
      pinElement.style.top = pin.location.y - pinElement.querySelector('img').height + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.title;

      pinElement.addEventListener('click', function () {
        if (document.querySelector('.map__card') !== null) {
          document.querySelector('.map__card').remove();
        }

        window.card.renderCard(pin);
      });

      return pinElement;
    }

  };
})();
