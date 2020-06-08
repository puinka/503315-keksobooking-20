'use strict';

var OFFERS_AMMOUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateItems = function (arr, min, max) {
  var amount = getRandomNumber(min, max);
  var result = [];

  for (var i = 0; i < amount; i++) {
    result[i] = arr[Math.floor(Math.random() * arr.length)];
  }
  // не знаю как сделать, чтобы элементы не повторялись
  return result;
};


var addSimmilarOffer = function (amount) {
  var simmilarOffers = [];

  for (var i = 0; i < amount; i++) {

    var offer = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
      },
      title: 'title',
      address: '{{location.x}}, {{location.y}}',
      price: 5000,
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      rooms: 1,
      guests: 2,
      checkin: CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)],
      checkout: CHECK_TIMES[Math.floor(Math.random() * CHECK_TIMES.length)],
      features: generateItems(FEATURES, 1, 4),
      description: 'строка с описанием',
      photos: generateItems(PHOTOS, 1, 4),
      location: {
        x: getRandomNumber(100, 740),
        y: getRandomNumber(130, 630)
      }
    };

    simmilarOffers[i] = offer;
  }
  return simmilarOffers;
};

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  // смещение еще не делала
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.title;

  return pinElement;
};

var renderAll = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var simmilarOffers = addSimmilarOffer(OFFERS_AMMOUNT);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < simmilarOffers.length; i++) {
    fragment.appendChild(renderPin(simmilarOffers[i]));
  }
  map.appendChild(fragment);

};

renderAll();


