'use strict';

(function () {
  window.pin.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: window.pin.mainPin.offsetLeft - shift.x,
        y: window.pin.mainPin.offsetTop - shift.y
      };

      var limits = {
        top: 620,
        right: 1135,
        bottom: 100,
        left: 0
      };

      currentCoords.x = currentCoords.x < limits.left ? limits.left : currentCoords.x;
      currentCoords.x = currentCoords.x > limits.right ? limits.right : currentCoords.x;
      currentCoords.y = currentCoords.y > limits.top ? limits.top : currentCoords.y;
      currentCoords.y = currentCoords.y < limits.bottom ? limits.bottom : currentCoords.y;


      window.pin.mainPin.style.left = currentCoords.x + 'px';
      window.pin.mainPin.style.top = currentCoords.y + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.pin.updateAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
