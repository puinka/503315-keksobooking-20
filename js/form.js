'use strict';

(function () {


  var MIN_PRICE = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var ROOM_AMOUNT = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var GUEST_AMOUNT = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  };

  var adForm = document.querySelector('.ad-form');
  var typeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var addressInput = document.querySelector('#address');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var fromFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterSelectors = document.querySelectorAll('.map__filters select, fieldset');
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.publish(new FormData(adForm), onSusscessPublish, onErrorPublish);
  };


  var onSusscessPublish = function () {

    onFormReset();
    window.modals.renderSuccess();
  };

  var onErrorPublish = function () {
    window.modals.renderError();
  };

  var onFormReset = function () {
    window.main.firstLoad();
    window.map.mapSection.classList.add('map--faded');
    window.pin.removePins();
    window.card.onCardClose();
    window.photo.resetPhotos();
    window.filter.resetFilters();
    adForm.reset();
    document.querySelector('.ad-form__reset').removeEventListener('click', window.form.onFormReset);
  };

  window.form = {

    adForm: adForm,
    typeSelect: typeSelect,
    priceInput: priceInput,
    addressInput: addressInput,
    roomNumber: roomNumber,
    capacity: capacity,
    formFieldsets: fromFieldsets,
    mapFilters: mapFilters,
    mapFilterSelectors: mapFilterSelectors,
    checkIn: checkIn,
    checkOut: checkOut,
    onFormReset: onFormReset,
    onFormSubmit: onFormSubmit,

    onCapacityChange: function () {
      var message = '';

      if (window.form.capacity.value === GUEST_AMOUNT.ZERO && window.form.roomNumber.value !== ROOM_AMOUNT.HUNDRED) {
        if (window.form.roomNumber.value === ROOM_AMOUNT.ONE) {
          message = 'Тут должен быть гость.';
        } else {
          message = 'Тут должны быть гости.';
        }
      }

      switch (window.form.roomNumber.value) {
        case ROOM_AMOUNT.ONE:
          if (window.form.capacity.value === GUEST_AMOUNT.TWO || window.form.capacity.value === GUEST_AMOUNT.THREE) {
            message = 'Слишком много народу в одной комнте!';
          }
          break;

        case ROOM_AMOUNT.TWO:
          if (window.form.capacity.value === GUEST_AMOUNT.THREE) {
            message = 'Слишком много народу! Максимум 2 гостя.';
          }
          break;

        case ROOM_AMOUNT.HUNDRED:
          if (window.form.capacity.value === GUEST_AMOUNT.ONE || window.form.capacity.value === GUEST_AMOUNT.TWO || window.form.capacity.value === GUEST_AMOUNT.THREE) {
            message = 'Эта локация не для гостей.';
          }
          break;
      }
      window.form.capacity.setCustomValidity(message);
    },

    onTypePriceChange: function () {
      switch (window.form.typeSelect.value) {
        case 'bungalo':
          window.form.priceInput.min = MIN_PRICE.BUNGALO;
          window.form.priceInput.placeholder = MIN_PRICE.BUNGALO;
          break;

        case 'flat':
          window.form.priceInput.min = MIN_PRICE.FLAT;
          window.form.priceInput.placeholder = MIN_PRICE.FLAT;
          break;

        case 'house':
          window.form.priceInput.min = MIN_PRICE.HOUSE;
          window.form.priceInput.placeholder = MIN_PRICE.HOUSE;
          break;

        case 'palace':
          window.form.priceInput.min = MIN_PRICE.PALACE;
          window.form.priceInput.placeholder = MIN_PRICE.PALACE;
          break;
      }
    }
  };
})();
