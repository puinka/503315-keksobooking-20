'use strict';

(function () {


  var errorModal = document.querySelector('#error').content.querySelector('.error');
  var successModal = document.querySelector('#success').content.querySelector('.success');
  var current;

  var renderSuccess = function () {
    var main = document.querySelector('main');
    main.appendChild(successModal);

    successModal.addEventListener('click', function () {
      closeModal();
    });

    document.addEventListener('keydown', onModalEscPress);

    current = successModal;
  };

  var renderError = function () {
    var main = document.querySelector('main');
    main.appendChild(errorModal);

    var tryAgainButton = errorModal.querySelector('.error__button');

    errorModal.addEventListener('click', function () {
      closeModal();
    });

    tryAgainButton.addEventListener('click', function () {
      closeModal();
    });

    document.addEventListener('keydown', onModalEscPress);

    current = errorModal;
  };

  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
    document.removeEventListener('keydown', onModalEscPress);
  };

  var closeModal = function () {
    current.remove();
  };

  window.modals = {
    renderSuccess: renderSuccess,
    renderError: renderError
  };

})();
