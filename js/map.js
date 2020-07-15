'use strict';

(function () {

  var mapSection = document.querySelector('.map');


  window.map = {

    mapSection: mapSection,

    renderAds: function (data) {

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < data.length - 1; i++) {
        fragment.appendChild(window.pin.renderPin(data[i]));
      }

      window.map.mapSection.appendChild(fragment);

    }

  };

})();
