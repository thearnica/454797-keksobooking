'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  function response(xhr, onLoad, onError) {
    return function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка(' + xhr.status + ') ' + xhr.statusText);
      }
    };
  }

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', response(xhr, onLoad, onError));
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    return xhr;
  }

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
