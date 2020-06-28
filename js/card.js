'use strict';

(function () {

  window.card = {

    translateType: function (typeValue) {
      var ruValue = '';
      switch (typeValue) {
        case 'flat': ruValue = 'Квартира';
          break;
        case 'bungalo': ruValue = 'Бунгало';
          break;
        case 'house': ruValue = 'Дом';
          break;
        case 'palace': ruValue = 'Дворец';
      }
      return ruValue;
    },

    translateRooms: function (roomValue) {
      var ruValue = '';
      if (roomValue === 1) {
        ruValue = ' комната';
      } else if (roomValue > 1 && roomValue < 5) {
        ruValue = ' комнаты';
      } else {
        ruValue = ' комнат';
      }
      return roomValue + ruValue;
    },

    translateGuests: function (guestsValue) {
      var ruValue = '';
      if (guestsValue === 1) {
        ruValue = ' гостя';
      } else {
        ruValue = ' гостей';
      }
      return guestsValue + ruValue;
    },

    renderFeatures: function (ul, featuresArr) {
      ul.innerHTML = '';
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < featuresArr.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = featuresArr[i];
        fragment.appendChild(listItem);
      }
      ul.appendChild(fragment);
    },

    renderPhotos: function (div, photosArr) {
      if (photosArr.length > 0) {
        var photoTemplate = div.querySelector('img');
        photoTemplate.src = photosArr[0];

        var fragment = document.createDocumentFragment();

        for (var i = 0; i < photosArr.length; i++) {
          var cardElement = photoTemplate.cloneNode(true);
          cardElement.src = photosArr[i];
          fragment.appendChild(cardElement);
        }
        div.appendChild(fragment);
      } else {
        div.remove();
      }
    },

    renderCard: function (advertisement) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
      var cardFeatures = cardTemplate.querySelector('.popup__features');
      var cardPhotos = cardTemplate.querySelector('.popup__photos');

      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = this.translateType(advertisement.offer.type);
      cardElement.querySelector('.popup__text--capacity').textContent = this.translateRooms(advertisement.offer.rooms) + ' для ' + this.translateGuests(advertisement.offer.guests);
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ' выезд до ' + advertisement.offer.checkout;
      cardElement.querySelector('.popup__features').content = window.card.renderFeatures(cardFeatures, advertisement.offer.features);
      cardElement.querySelector('.popup__photos').content = window.card.renderPhotos(cardPhotos, advertisement.offer.photos);
      cardElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
      cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;

      return cardElement;

    }
  };


})();
