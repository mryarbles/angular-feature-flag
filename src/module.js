var mod = angular.module("feature-flag", []);
mod.provider('Flag',                require("./FlagProvider"));
module.exports = mod.name;