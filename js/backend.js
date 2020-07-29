'use strict';

(function () {

  var STATUS_OK = 200;
  var URL = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    PUBLISH: 'https://javascript.pages.academy/keksobooking'
  };

  window.backend = {

    load: function (onLoad) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        }
      });

      xhr.open('GET', URL.LOAD);
      xhr.send();


    },

    publish: function (data, onLoad, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('POST', URL.PUBLISH);
      xhr.send(data);

    }
  };

})();
