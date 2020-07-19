'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var rederFilteredAds = function () {
    window.backend.load(function (data) {
      var rawData = data;
      var filteredPins = [];
      var selectedValue = housingType.value;

      rawData.filter(function (element) {
        if (element.offer.type === selectedValue) {
          filteredPins.push(element);
        } else if (selectedValue === 'any') {
          filteredPins = rawData;
        }
      });
      window.map.renderAds(filteredPins);
    });

  };

  housingType.addEventListener('change', function () {
    window.pin.removePins();
    window.card.closeCard();
    rederFilteredAds();
  });
})();
