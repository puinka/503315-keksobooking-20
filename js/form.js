'use strict';

(function () {

  window.form = {

    adForm: document.querySelector('.ad-form'),
    typeSelect: document.querySelector('#type'),
    priceInput: document.querySelector('#price'),
    addressInput: document.querySelector('#address'),
    roomNumber: document.querySelector('#room_number'),
    capacity: document.querySelector('#capacity'),

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
      if (this.typeSelect.value === 'bungalo') {
        this.priceInput.min = 0;
        this.priceInput.placeholder = 0;
      } else if (this.typeSelect.value === 'flat') {
        this.priceInput.min = 1000;
        this.priceInput.placeholder = 1000;
      } else if (this.typeSelect.value === 'house') {
        this.priceInput.min = 5000;
        this.priceInput.placeholder = 5000;
      } else if (this.typeSelect.value === 'palace') {
        this.priceInput.min = 10000;
        this.priceInput.placeholder = 10000;
      }
    }

  };
})();
