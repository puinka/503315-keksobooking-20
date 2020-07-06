'use strict';

(function () {

  var enablePage = function () {
    window.map.mapSection.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.map.renderAds();

    window.pin.mainPin.removeEventListener('mousedown', mousedownOnMainPin);
    window.pin.mainPin.removeEventListener('keydown', keydownOnMainPin);

    window.form.typeSelect.addEventListener('change', window.form.setTypePrice);
    window.form.roomNumber.addEventListener('change', window.form.setCapacity);
    window.form.capacity.addEventListener('change', window.form.setCapacity);

    window.form.checkIn.addEventListener('change', function () {
      window.form.checkOut.value = window.form.checkIn.value;
    });

    window.form.checkOut.addEventListener('change', function () {
      window.form.checkIn.value = window.form.checkOut.value;
    });

    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.mapFilters.classList.remove('map__filters--disabled');

    for (var i = 0; i < window.form.fromFieldsets.length; i++) {
      window.form.fromFieldsets[i].disabled = false;
    }
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
    window.form.mapFilters.classList.add('map__filters--disabled');

    for (var i = 0; i < window.form.fromFieldsets.length; i++) {
      window.form.fromFieldsets[i].disabled = true;
    }


  };

  firstLoad();

})();
