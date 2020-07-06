'use strict';

(function () {

  window.form = {

    adForm: document.querySelector('.ad-form'),
    typeSelect: document.querySelector('#type'),
    priceInput: document.querySelector('#price'),
    addressInput: document.querySelector('#address'),
    roomNumber: document.querySelector('#room_number'),
    capacity: document.querySelector('#capacity'),
    fromFieldsets: document.querySelectorAll('.ad-form fieldset'),
    mapFilters: document.querySelector('.map__filters'),
    checkIn: document.querySelector('#timein'),
    checkOut: document.querySelector('#timeout'),

    setCapacity: function () {
      var message = '';
      switch (this.roomNumber.value) {
        case '1':
          if (this.capacity.value === '2' || this.capacity.value === '3') {
            message = 'Слишком много народу в одной комнте!';
          } else if (window.form.capacity.value === '0') {
            message = 'Тут должен быть гость.';
          }
          break;

        case '2':
          if (this.capacity.value === '3') {
            message = 'Слишком много народу! Максимум 2 гостя.';
          } else if (this.capacity.value === '0') {
            message = 'Тут должны быть гости.';
          }
          break;

        case '3':
          if (this.capacity.value === '0') {
            message = 'Тут должны быть гости.';
          }
          break;


        case '100':
          if (this.capacity.value === '1' || this.capacity.value === '2' || this.capacity.value === '3') {
            message = 'Эта локация не для гостей.';
          }
          break;
      }
      this.capacity.setCustomValidity(message);
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
