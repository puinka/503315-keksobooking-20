'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action1, action2) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action1();
        action2();
      }
    },

    isLeftMouseEvent: function (evt, action1, action2) {
      if (evt.button === 0) {
        action1();
        action2();
      }
    },

    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    getNoRepeats: function (arr) {
      var unique = [];
      var randomLength = this.getRandomNumber(1, arr.length);

      for (var i = 0; i < randomLength; i++) {
        if (this.getRandomNumber(0, 1)) {
          unique.push(arr[i]);
        }
      }
      return unique;
    }
  };

})();
