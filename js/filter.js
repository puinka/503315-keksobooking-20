'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var filterHousing = function (it) {
    var selectedValue = housingType.value;
    return (it.offer.type === selectedValue);
  };

  var renderFilteredAds = function () {
    window.backend.load(function (data) {
      var rawData = data;
      var filteredPins = [];


      if (housingType.value !== 'any') {
        filteredPins = rawData.filter(filterHousing);
      } else {
        filteredPins = rawData;
      }

      window.map.renderAds(filteredPins);
    });

  };

  housingType.addEventListener('change', function () {
    window.pin.removePins();
    window.card.closeCard();
    renderFilteredAds();
  });
})();
