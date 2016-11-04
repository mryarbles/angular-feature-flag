"use strict";
var _ = require("lodash");
var angular = require("angular");

function isTrue(value) {
  return value && value.toLowerCase() !== 'false';
}

/**
 * To create a Feature flag put a key in your local storage that matches your calls to the the isActive method of this service.
 * You can also add active flags to the config block to activate a feature
 * @param $windowProvider
 * @param localStorageServiceProvider
 */
module.exports = /*@ngInject*/ function FlagProvider(
    $windowProvider,
    localStorageServiceProvider
) {

  var $window = $windowProvider.$get();

  var configData = "";

  /**
   * in the app config block a configuration object is passed in with all of the keys.
   * @param data
   */
  this.updateConfig = function(data){
    configData = data;
  };


  var Flag = function(config,$window){

    var localStorage = $window.localStorage;

    var _config = {
      prefix:"FLAG_",
      flags:[]
    };

    var _keys = {};


    this.getKey = function(){

    };

    /**
     * Test whether a flag is flagged as active either in config or in local storage.
     * @param feature - string minus the prefix.
     */
    /* this.get = function(key){
     var loc = this.getKey(key);
     var val = localStorageService.get(loc);
     return JSON.parse(val);
     };*/

    this.isActive = function(feature){

      var res;

      if(!_keys[feature]){
        var shortKey  = feature.substr(_config.prefix.length).toLowerCase();
        if(!_keys[shortKey]){
          res = false;
        } else {
          res = true;
        }
      } else {
        res = true;
      }


      return res;
    };

    /**
     * Initialize the service.
     */
    var init = function(){

      _.merge(_config,config);

      // add all of the keys from localStorage into active keys map.
      for(var key in localStorage){
        if(key.indexOf(_config.prefix) > -1){
          // Only add add keys if the flag's value is truthy.
          if(!_keys[key] && isTrue(localStorage[key])){
            var shortKey  = key.substr(_config.prefix.length).toLowerCase();
            _keys[shortKey] = key;
          }
        }
      }

      // add all the active flags from configuration to _keys
      _.forEach(_config.flags,function(value,key){
        _keys[value] = _config.prefix + value.toUpperCase();
      });

    };

    init();

  };


  this.$get = /*@ngInject*/ function FlagFactory() {
    return new Flag(configData, $window);
  };
};
