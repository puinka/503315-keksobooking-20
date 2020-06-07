'use strict';

var types = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var generateFeatures = function (max) {
  var amount = (Math.floor(Math.random() * Math.floor(max)) + 1);
  var features = [];

  for (var i = 0; i < amount; i++) {
    features[i] = featuresList[Math.floor(Math.random() * featuresList.length)];
  }
  // не знаю как сделать, чтобы элементы не повторялись
  return features;
};

var generatePhotos = function (max) {
  var amount = (Math.floor(Math.random() * Math.floor(max)) + 1);
  var photos = [];

  for (var i = 0; i < amount; i++) {
    photos[i] = photosList[Math.floor(Math.random() * photosList.length)];
  }
  return photos;
};

var simmilarOffers = [];

var getRandomImg = function (max) {
  var imgSrc = 'img/avatars/user0' + (Math.floor(Math.random() * Math.floor(max)) + 1);
  return imgSrc;
};

var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var propertyLocation = {
  // из ТЗ: "Значение ограничено размерами блока, в котором перетаскивается метка." - не поняла где смотреть размер этого блока
  x: getRandomArbitrary(100, 600),
  y: getRandomArbitrary(130, 630)
};

var addSimmilarOffer = function (amount) {
  for (var i = 0; i < amount; i++) {
    var author = {
      avatar: getRandomImg(7) + '.png'
    };

    var offer = {
      author: author,
      title: 'title',
      address: '{{location.x}}, {{location.y}}',
      price: 5000,
      type: types[Math.floor(Math.random() * types.length)],
      rooms: 1,
      guests: 2,
      checkin: checkTimes[Math.floor(Math.random() * checkTimes.length)],
      checkout: checkTimes[Math.floor(Math.random() * checkTimes.length)],
      features: generateFeatures(4),
      description: 'строка с описанием',
      photos: generatePhotos(4),
      location: propertyLocation
    };

    simmilarOffers[i] = offer;
  }
  return simmilarOffers;
};

addSimmilarOffer(8);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');


var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  // смещение еще не делала
  // здесь не понимаю почему координаты генерятся только один раз и, следовательно, все 8 пинов втыкаются в одно и то же место
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < simmilarOffers.length; i++) {
  fragment.appendChild(renderPin(simmilarOffers[i]));
}
map.appendChild(fragment);

