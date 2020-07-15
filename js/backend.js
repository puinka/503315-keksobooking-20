'use strict';

(function () {


  window.backend = {

    load: function (onLoad, onError) {

      var URL = 'https://javascript.pages.academy/keksobooking/data';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;

          case 404:
            onError('Страница не найдена');
            break;

          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });


      xhr.timeout = 1000;

      xhr.open('GET', URL);
      xhr.send();


    },

    onError: function (message) {
      var message = message;
    }
  };

})();
