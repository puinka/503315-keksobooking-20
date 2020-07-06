'use strict';

(function () {


  var translateType = function (typeValue) {
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
  };

  var translateRooms = function (roomValue) {
    var ruValue = '';
    if (roomValue === 1) {
      ruValue = ' комната';
    } else if (roomValue > 1 && roomValue < 5) {
      ruValue = ' комнаты';
    } else {
      ruValue = ' комнат';
    }
    return roomValue + ruValue;
  };

  var translateGuests = function (guestsValue) {
    var ruValue = '';
    if (guestsValue === 1) {
      ruValue = ' гостя';
    } else {
      ruValue = ' гостей';
    }
    return guestsValue + ruValue;
  };

  var renderFeatures = function (element, advertisement) {
    var cardFeatures = advertisement.offer.features;
    var featuresList = element.querySelector('.popup__features');

    if (cardFeatures.length > 0) {
      featuresList.innerHTML = '';

      for (var i = 0; i < cardFeatures.length; i++) {
        var currentFeature = cardFeatures[i];
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', 'popup__feature--' + currentFeature);
        featuresList.appendChild(featureItem);
      }
    } else {
      featuresList.remove();
    }

  };

  var renderPhotos = function (element, advertisement) {
    var cardPhotos = advertisement.offer.photos;
    var photosList = element.querySelector('.popup__photos');

    if (cardPhotos.length > 0) {
      var photoTemplate = element.querySelector('.popup__photo');
      photosList.innerHTML = '';


      for (var i = 0; i < cardPhotos.length; i++) {
        var photoItem = photoTemplate.cloneNode(true);
        photoItem.src = cardPhotos[i];
        photosList.appendChild(photoItem);
      }

    } else {
      photosList.remove();
    }
  };

  var closeCard = function () {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardEscPress = function (evt) {
    window.util.isEscEvent(evt, closeCard);
    document.removeEventListener('keydown', onCardEscPress);
  };

  window.card = {

    generateCard: function (advertisement) {
      var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


      var cardElement = cardTemplate.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = translateType(advertisement.offer.type);
      cardElement.querySelector('.popup__text--capacity').textContent = translateRooms(advertisement.offer.rooms) + ' для ' + translateGuests(advertisement.offer.guests);
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ' выезд до ' + advertisement.offer.checkout;
      renderFeatures(cardElement, advertisement);
      renderPhotos(cardElement, advertisement);
      cardElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
      cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;


      cardElement.querySelector('.popup__close').addEventListener('click', closeCard);
      document.addEventListener('keydown', onCardEscPress);

      return cardElement;

    },

    renderCard: function (advertisement) {
      var filtersContainer = document.querySelector('.map__filters-container');
      window.map.mapSection.insertBefore(window.card.generateCard(advertisement), filtersContainer);
    },


  };


})();
