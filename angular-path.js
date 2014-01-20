;(function(module, angular, undefined) {
'use strict';

module.provider('PathGL', function() {
  var _asyncLoading = false;
  var _scriptUrl = '//adnanwahab.com/pathgl/dist/pathgl.min.js';

  this.asyncLoading = function(config) {
    _asyncLoading = config || _asyncLoading;
    return this;
  };

  this.scriptUrl = function(url) {
    _scriptUrl = url || _scriptUrl;
    return this;
  };

  // Create a script tag with moment as the source
  // and call our onScriptLoad callback when it
  // has been loaded
  function createScript($document, callback) {
    var scriptTag = $document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.src = _scriptUrl;
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') {
        callback();
      }
    }
    scriptTag.onload = callback;
    var s = $document.getElementsByTagName('body')[0];
        s.appendChild(scriptTag);
  }

  this.$get = function($q, $rootScope, $window) {
    var deferred = $q.defer();
      var _pathGL = $window.pathgl;

      deferred.isPromise = true;
      _pathGL.isPromise = false;

      if (_asyncLoading) {
        // Load client in the browser
        var onScriptLoad = function(callback) {
          $timeout(function() {
            deferred.resolve($window.pathgl);
          });
        };
        createScript($document[0], onScriptLoad);
      }

      return (_asyncLoading) ? deferred.promise: _pathGL;
  }
});

}(angular.module('angular-pathGL', []), angular));
