(function () {

'use strict';

// Initiate Angular Module
var RPGNS = angular.module('RPG', ['ngResource']);

// Setup 'ResourceService' Provider
RPGNS.factory('ResourceService', ['$resource', function ($resource) {
	return $resource('./:object');
}]);

// Setup 'CharacterCtrl' Controller
RPGNS.controller('CharacterCtrl', ['$scope','ResourceService', function ($scope, ResourceService) {
  var self = this;
  this.collection = [];

  this.addCharacter = function(event) {
    if (event.keyCode != 13) return;
    if ($scope.newCharacter == '') return;

    var attrList = ['name','race','charClass','level'];
    var charAttrbs = $scope.newCharacter.split(',');
    var newCharacter = {};

    for (var i = 0; i < charAttrbs.length; i++) {
      newCharacter[attrList[i]] = charAttrbs[i];
    }

    console.log(newCharacter);

    self.collection.push(newCharacter);
    $scope.newCharacter = '';
  };

  this.removeCharacter = function (item) {
    this.collection.forEach(function (Char, index) {
      if (Char === item) self.collection.splice(index, 1);
    });
  };

  ResourceService.query({ object: 'characters.json' }, function (response) {
    self.collection = response;
    console.log(self.collection);
  });
}]);

})();
