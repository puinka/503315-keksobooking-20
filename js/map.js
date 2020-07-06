'use strict';

(function () {

  var mapSection = document.querySelector('.map');

  var generateAdvertisements = function (amount) {
    var similarAds = [];

    for (var i = 0; i < amount; i++) {

      var locationX = window.util.getRandomNumber(100, 740);
      var locationY = window.util.getRandomNumber(130, 630);

      var advertisement = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },

        offer: {
          title: 'title',
          address: locationX + ', ' + locationY,
          price: 5000,
          type: window.data.TYPES[window.util.getRandomNumber(1, window.data.TYPES.length)],
          rooms: window.util.getRandomNumber(1, 6),
          guests: window.util.getRandomNumber(1, 10),
          checkin: window.data.CHECK_TIMES[window.util.getRandomNumber(1, window.data.CHECK_TIMES.length)],
          checkout: window.data.CHECK_TIMES[window.util.getRandomNumber(1, window.data.CHECK_TIMES.length)],
          features: window.util.getNoRepeats(window.data.FEATURES),
          photos: window.util.getNoRepeats(window.data.PHOTOS)
        },

        location: {
          x: locationX,
          y: locationY
        }
      };

      similarAds[i] = advertisement;
    }
    return similarAds;
  };

  var similarAds = generateAdvertisements(window.data.ADS_AMMOUNT);

  window.map = {

    similarAds: similarAds,
    mapSection: mapSection,

    renderAds: function () {

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.map.similarAds.length; i++) {
        fragment.appendChild(window.pin.renderPin(window.map.similarAds[i]));
      }

      window.map.mapSection.appendChild(fragment);

    }

  };

})();
