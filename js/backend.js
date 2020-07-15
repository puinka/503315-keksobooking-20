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


    }
  };

})();
