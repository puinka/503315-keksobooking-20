'use strict';

(function () {

  var MAX_AMOUNT = 5;

  var mapSection = document.querySelector('.map');


  window.map = {

    mapSection: mapSection,

    renderAds: function (data) {

      var amount = data.length > MAX_AMOUNT ? MAX_AMOUNT : data.length;

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < amount - 1; i++) {
        fragment.appendChild(window.pin.renderPin(data[i]));
      }

      window.map.mapSection.appendChild(fragment);

    }

  };

})();
