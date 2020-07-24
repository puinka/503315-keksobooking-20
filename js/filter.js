'use strict';

(function () {

  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var filterForm = document.querySelector('.map__filters');

  var filter = {
    housing: filterForm.querySelector('#housing-type'),
    price: filterForm.querySelector('#housing-price'),
    rooms: filterForm.querySelector('#housing-rooms'),
    guests: filterForm.querySelector('#housing-guests'),
    features: filterForm.querySelector('#housing-features')
  };


  var onFilterSelected = function (data, selection, action) {
    if (selection.value !== 'any') {
      return data.filter(action);
    } else {
      return data;
    }
  };

  var filterHousing = function (item) {
    var selectedValue = filter.housing.value;
    return (item.offer.type === selectedValue);
  };

  var filterPrice = function (item) {
    var selectedValue = filter.price.value;
    switch (selectedValue) {
      case 'low':
        if (item.offer.price < PRICE_LOW) {
          return true;
        }
        break;
      case 'middle':
        if (item.offer.price >= PRICE_LOW && item.offer.price <= PRICE_HIGH) {
          return true;
        }
        break;
      case 'high':
        if (item.offer.price > PRICE_HIGH) {
          return true;
        }
        break;
    }
    return false;
  };

  var filterRooms = function (item) {
    var selectedValue = Number(filter.rooms.value);
    return (item.offer.rooms === selectedValue);
  };

  var filterGuests = function (item) {
    var selectedValue = Number(filter.guests.value);
    return (item.offer.guests === selectedValue);
  };

  var filterFeatures = function (data) {
    var featuresList = Array.from(filter.features.querySelectorAll('input'));
    var activeInputs = featuresList.filter(function (input) {
      return input.checked;
    });

    if (activeInputs.length !== 0) {
      var activeFilters = activeInputs.map(function (item) {
        return item.value;
      });

      var filteredFeatures = data.filter(function (item) {
        // сравнить item.offer.features и activeFilters - два массива
        var isContain = item.offer.features.some(function (r) {
          activeFilters.includes(r);
        });

        // работает item.offer.features.some(r=> activeFilters.includes(r)), а в синтаксисе ES5 - нет :(

        return isContain;

      });

      return filteredFeatures;
    }

    return data;
  };


  var renderFilteredAds = function (data) {

    var filteredPins = data;

    filteredPins = onFilterSelected(filteredPins, filter.housing, filterHousing);
    filteredPins = onFilterSelected(filteredPins, filter.price, filterPrice);
    filteredPins = onFilterSelected(filteredPins, filter.rooms, filterRooms);
    filteredPins = onFilterSelected(filteredPins, filter.guests, filterGuests);
    filteredPins = filterFeatures(filteredPins);

    window.map.renderAds(filteredPins);

  };

  filterForm.addEventListener('change', function () {
    window.pin.removePins();
    window.card.closeCard();
    renderFilteredAds(window.loadedData);
  });
})();
