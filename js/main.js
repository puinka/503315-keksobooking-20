'use strict';

(function () {

  var enablePage = function () {
    window.map.mapSection.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.mapFilters.classList.remove('map__filters--disabled');
    window.form.formFieldsets.forEach(function (element) {
      element.disabled = false;
    });
    window.form.mapFilterSelectors.forEach(function (element) {
      element.disabled = false;
    });

    window.pin.mainPin.removeEventListener('mousedown', mousedownOnMainPin);
    window.pin.mainPin.removeEventListener('keydown', keydownOnMainPin);

    window.form.typeSelect.addEventListener('change', window.form.onTypePriceChange);
    window.form.roomNumber.addEventListener('change', window.form.onCapacityChange);
    window.form.capacity.addEventListener('change', window.form.onCapacityChange);

    window.form.checkIn.addEventListener('change', function () {
      window.form.checkOut.value = window.form.checkIn.value;
    });

    window.form.checkOut.addEventListener('change', function () {
      window.form.checkIn.value = window.form.checkOut.value;
    });

    window.form.adForm.addEventListener('submit', window.form.onFormSubmit);

    window.backend.load(function (data) {
      window.loadedData = data;
      window.map.renderAds(data);
    });

    document.querySelector('.ad-form__reset').addEventListener('click', window.form.onFormReset);

  };

  var mousedownOnMainPin = function (evt) {
    window.util.isLeftMouseEvent(evt, enablePage, window.pin.updateAddress);
  };

  var keydownOnMainPin = function (evt) {
    window.util.isEnterEvent(evt, enablePage, window.pin.updateAddress);
  };

  var firstLoad = function () {
    window.pin.mainPin.addEventListener('mousedown', mousedownOnMainPin);
    window.pin.mainPin.addEventListener('keydown', keydownOnMainPin);

    window.form.adForm.classList.add('ad-form--disabled');
    window.form.formFieldsets.forEach(function (element) {
      element.disabled = true;
    });
    window.form.mapFilters.classList.add('map__filters--disabled');
    window.form.mapFilterSelectors.forEach(function (element) {
      element.disabled = true;
    });

    window.form.adForm.removeEventListener('submit', window.form.onFormSubmit);

  };
  firstLoad();

  window.main = {
    firstLoad: firstLoad
  };

})();
