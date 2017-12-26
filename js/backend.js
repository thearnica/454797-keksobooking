'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var HTTP_CODE_OK = 200;

  var response = function (xhr, onLoad, onError) {
    return function () {
      if (xhr.status === HTTP_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка(' + xhr.status + ') ' + xhr.statusText);
      }
    };
  };

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', response(xhr, onLoad, onError));
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
