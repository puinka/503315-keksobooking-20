'use strict';

(function () {

  window.map = {
    mapSection: document.querySelector('.map'),

    generateAdvertisements: function (amount) {
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
    },

    renderAds: function () {

      var similarAds = this.generateAdvertisements(window.data.ADS_AMMOUNT);

      var fragment = document.createDocumentFragment();
      for (var i = 0; i < similarAds.length; i++) {
        fragment.appendChild(window.pin.renderPin(similarAds[i]));
      }

      var filtersContainer = document.querySelector('.map__filters-container');
      this.mapSection.appendChild(fragment);

      window.map.mapSection.insertBefore(window.card.renderCard(similarAds[0]), filtersContainer);
    }
  };

})();
