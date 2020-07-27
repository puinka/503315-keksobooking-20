'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var submitAdForm = function (evt) {
    evt.preventDefault();
    window.backend.publish(new FormData(adForm), onSusscessPublish, onErrorPublish);
  };


  var onSusscessPublish = function () {

    resetForm();
    window.modals.renderSuccess();
  };

  var onErrorPublish = function () {
    window.modals.renderError();
  };

  var resetForm = function () {
    window.main.firstLoad();
    window.map.mapSection.classList.add('map--faded');
    window.pin.removePins();
    window.photo.resetPhotos();
    window.filter.resetFilters();
    adForm.reset();
    document.querySelector('.ad-form__reset').removeEventListener('click', window.form.resetForm);
  };

  window.form = {

    adForm: adForm,
    typeSelect: document.querySelector('#type'),
    priceInput: document.querySelector('#price'),
    addressInput: document.querySelector('#address'),
    roomNumber: document.querySelector('#room_number'),
    capacity: document.querySelector('#capacity'),
    fromFieldsets: document.querySelectorAll('.ad-form fieldset'),
    mapFilters: document.querySelector('.map__filters'),
    checkIn: document.querySelector('#timein'),
    checkOut: document.querySelector('#timeout'),
    resetForm: resetForm,
    submitAdForm: submitAdForm,

    setCapacity: function () {
      var message = '';
      switch (window.form.roomNumber.value) {
        case '1':
          if (window.form.capacity.value === '2' || window.form.capacity.value === '3') {
            message = 'Слишком много народу в одной комнте!';
          } else if (window.form.capacity.value === '0') {
            message = 'Тут должен быть гость.';
          }
          break;

        case '2':
          if (window.form.capacity.value === '3') {
            message = 'Слишком много народу! Максимум 2 гостя.';
          } else if (window.form.capacity.value === '0') {
            message = 'Тут должны быть гости.';
          }
          break;

        case '3':
          if (window.form.capacity.value === '0') {
            message = 'Тут должны быть гости.';
          }
          break;


        case '100':
          if (window.form.capacity.value === '1' || window.form.capacity.value === '2' || window.form.capacity.value === '3') {
            message = 'Эта локация не для гостей.';
          }
          break;
      }
      window.form.capacity.setCustomValidity(message);
    },

    setTypePrice: function () {
      switch (window.form.typeSelect.value) {
        case 'bungalo':
          window.form.priceInput.min = 0;
          window.form.priceInput.placeholder = 0;
          break;

        case 'flat':
          window.form.priceInput.min = 1000;
          window.form.priceInput.placeholder = 1000;
          break;

        case 'house':
          window.form.priceInput.min = 5000;
          window.form.priceInput.placeholder = 5000;
          break;

        case 'palace':
          window.form.priceInput.min = 10000;
          window.form.priceInput.placeholder = 10000;
          break;
      }
    }
  };
})();
