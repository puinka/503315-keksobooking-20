'use strict';

(function () {


  window.backend = {

    load: function (onLoad) {

      var URL = 'https://javascript.pages.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        }
      });

      xhr.open('GET', URL);
      xhr.send();


    },

    publish: function (data, onLoad, onError) {

      var URL = 'https://javascript.pages.academy/keksobooking';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', URL);
      xhr.send(data);

    }
  };

})();
