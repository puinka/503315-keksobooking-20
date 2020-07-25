'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadForm = document.querySelector('.ad-form');
  var avatarChooser = uploadForm.querySelector('#avatar');
  var avatarPreview = uploadForm.querySelector('.ad-form-header__preview img');
  var photosChooser = uploadForm.querySelector('#images');
  var photosPreview = uploadForm.querySelector('.ad-form__photo');


  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photosChooser.addEventListener('change', function () {
    var file = photosChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var newPhoto = document.createElement('img');
        newPhoto.style = 'width: 100%; height: 100%;';
        newPhoto.src = reader.result;
        photosPreview.appendChild(newPhoto);
      });

      reader.readAsDataURL(file);
    }
  });

  var resetPhotos = function () {
    avatarPreview.src = 'img/muffin-grey.svg';

    var photos = photosPreview.querySelectorAll('img');
    photos.forEach(function (item) {
      item.remove();
    });
  };

  window.photo = {
    resetPhotos: resetPhotos
  };
})();
