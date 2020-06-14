'use strict';

var ADS_AMMOUNT = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAIN_PIN_WIDTH = 64;
var MAIN_PIN_HEIGHT = 86;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
//var adFormFieldsets = adForm.querySelectorAll('fieldset');
//var titleInput = document.querySelector('#title');
var typeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var addressInput = document.querySelector('#address');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getNoRepeats = function (arr) {
  var unique = [];
  var randomLength = getRandomNumber(1, arr.length);

  for (var i = 0; i < randomLength; i++) {
    if (getRandomNumber(0, 1)) {
      unique.push(arr[i]);
    }
  }
  return unique;
};

var generateAdvertisements = function (amount) {
  var similarAds = [];

  for (var i = 0; i < amount; i++) {

    var locationX = getRandomNumber(100, 740);
    var locationY = getRandomNumber(130, 630);

    var advertisement = {
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

    similarAds[i] = advertisement;
  }
  return similarAds;
};

var renderPin = function (pin) {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pinElement = pinTemplate.cloneNode(true);

  var shiftLeft = pinElement.querySelector('img').width / 2;


  pinElement.style.left = pin.location.x + shiftLeft + 'px';
  pinElement.style.top = pin.location.y - pinElement.querySelector('img').height + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.title;

  return pinElement;
};

var renderAds = function () {

  var similarAds = generateAdvertisements(ADS_AMMOUNT);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(renderPin(similarAds[i]));
  }
  map.appendChild(fragment);
};


var enablePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderAds();

  mainPin.removeEventListener('mousedown', mousedownOnMainPin);
  mainPin.removeEventListener('keydown', keydownOnMainPin);

  typeSelect.addEventListener('change', setTypePrice);
  roomNumber.addEventListener('change', setCapacity);
  capacity.addEventListener('change', setCapacity);
};

var setAddress = function (x, y) {

  var locationX = Number(x.substring(0, x.length - 2)) + MAIN_PIN_WIDTH / 2;
  var locationY = Number(y.substring(0, x.length - 2)) - MAIN_PIN_HEIGHT / 2;
  addressInput.value = locationX + ' ' + locationY;
};


var setCapacity = function () {
  switch (roomNumber.value) {
    case '1':
      if (capacity.value === '2' || capacity.value === '2') {
        capacity.setCustomValidity('Слишком много народу в одной комнте!');
      } else if (capacity.value === '0') {
        capacity.setCustomValidity('Тут должен быть гость.');
      }
      break;

    case '2':
      if (capacity.value === '3') {
        capacity.setCustomValidity('Слишком много народу! Максимум 2 гостя.');
      } else if (capacity.value === '0') {
        capacity.setCustomValidity('Тут должны быть гости.');
      };
      break;

    case '3':
      if (capacity.value === '0') {
        capacity.setCustomValidity('Тут должны быть гости.');
      }
      break;


    case '100':
      if (capacity.value === '1' || capacity.value === '2' || capacity.value === '3') {
        capacity.setCustomValidity('Эта локация не для гостей.');
      }
      break;

    default:
      capacity.setCustomValidity('');
  }

};


var setTypePrice = function () {
  if (typeSelect.value === 'bungalo') {
    priceInput.min = 0;
    priceInput.placeholder = 0;
  } else if (typeSelect.value === 'flat') {
    priceInput.min = 1000;
    priceInput.placeholder = 1000;
  } else if (typeSelect.value === 'house') {
    priceInput.min = 5000;
    priceInput.placeholder = 5000;
  } else if (typeSelect.value === 'palace') {
    priceInput.min = 10000;
    priceInput.placeholder = 10000;
  }
};

var mousedownOnMainPin = function (evt) {
  if (evt.button === 0) {
    enablePage();
    setAddress(mainPin.style.left, mainPin.style.top);
  }
};

var keydownOnMainPin = function (evt) {
  if (evt.key === 'Enter') {
    enablePage();
    setAddress(mainPin.style.left, mainPin.style.top);
  }
};

var firstLoad = function () {
  mainPin.addEventListener('mousedown', mousedownOnMainPin);
  mainPin.addEventListener('keydown', keydownOnMainPin);
};

firstLoad();
