'use strict';

var OFFERS_AMMOUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getNoRepeats = function (arr) {
  var unique = [];
  for (var i = 0; i < getRandomNumber(1, arr.length); i++) {
    if (getRandomNumber(0, 1)) {
      unique.push(arr[i]);
    }
  }
  return unique;
};


var addSimmilarOffer = function (amount) {
  var simmilarOffers = [];

  for (var i = 0; i < amount; i++) {

    var locationX = getRandomNumber(100, 740);
    var locationY = getRandomNumber(130, 630);

    var announcement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },

      offer: {
        title: 'title',
        address: locationX + ', ' + locationY,
        price: 5000,
        type: TYPES[getRandomNumber(1, TYPES.length)],
        rooms: getRandomNumber(1, 6),
        guests: getRandomNumber(1, 10),
        checkin: CHECK_TIMES[getRandomNumber(1, CHECK_TIMES.length)],
        checkout: CHECK_TIMES[getRandomNumber(1, CHECK_TIMES.length)],
        features: getNoRepeats(FEATURES),
        description: 'строка с описанием',
        photos: getNoRepeats(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    simmilarOffers[i] = announcement;
  }
  return simmilarOffers;
};

var renderPin = function (pin) {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pinElement = pinTemplate.cloneNode(true);

  var shiftLeft = pinElement.querySelector('img').width / 2;
  var shiftTop = pinElement.querySelector('img').height / 2;

  pinElement.style.left = pin.location.x + shiftLeft + 'px';
  pinElement.style.top = pin.location.y + shiftTop + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.title;

  return pinElement;
};

var renderOffers = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var simmilarOffers = addSimmilarOffer(OFFERS_AMMOUNT);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < simmilarOffers.length; i++) {
    fragment.appendChild(renderPin(simmilarOffers[i]));
  }
  map.appendChild(fragment);
};

renderOffers();
