# angular-feature-flag

## import module and include it in your app

```
var app = angular.module("app", [
  require('angular-feature-flag')
]);
```

## configuring the provider

```
// configure flags
app.config(/*@ngInject*/function(FlagProvider){
  FlagProvider.updateConfig({
    prefix: "FLAG_", // You can alter the flag prefix that is used.
    flags: ["address", "broker", "rental", "turbo_terms"] // these are flags that are enabled globally.  So once a feature is complete you can add it flag here and it will be enabled.
  });
});
```

For each of use in templates,  you can add the service to the $rootScope
```
app.run( /*@ngInject*/ function(
  $rootScope,
  Flag
) {
  
  // add FlagService instance to rootscope for easy access in templates.
  $rootScope.flag = Flag;

});
```

Then in a template: 
```
<div ng-if="flag.isActive('feature')">Your feature will appear here if the flag is active</div>
```


## Enabling flags

While a feature is in development you can enable a feature by setting a local storage key to (Using the default configuration):
FLAG_[FEATURE_NAME_IN_CAPS]: true;
 
So if you set: FLAG_VALIDATION: true in local storage, you would test in your application with:
 ```
 Flag.isActive("validation");
 ```
 
 As stated above, you can also set a flag in your config block. Eventually, you'll want to clean up your conditional code, but to make a feature live, you just sent its flag in the flag array.
 
 ```
 app.config(/*@ngInject*/function(FlagProvider){
   FlagProvider.updateConfig({
     prefix: "FLAG_", // You can alter the flag prefix that is used.
     flags: ["address", "broker", "terms"] // these are flags that are enabled globally.  So once a feature is complete you can add it flag here and it will be enabled.
   });
 });
 ```
 
 ## Accessing the provider before bootstrap
 
 If you want to access the provider before the applications bootstrap, for instance to import ui-router configuration depending on a flag, your can access the provider like this:
 
 ```
 var Config = /*@ngInject*/ function (
     $stateProvider,
     FlagProvider
 ) {
 
   var Flag = FlagProvider.$get();
   var flagActive = Flag.isActive("comm");
   if(!flagActive) return false;
   
   $stateProvider
   .state(
   ...
   
module.exports = Config;
   
 ```