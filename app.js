"use strict";
var swapp = angular.module("swapp", []);

swapp.directive("planetsList", function() {
  return {
  	restrict: "E",
    scope: {
    minres: "@"
    },
    templateUrl: function(elem, attr){
    	return "partials/planets.html"
    },
    controller: function( $scope, $http){
    	var populousPlanets = [];

    	console.log("IN CONTROLL")
			$http.get("http://swapi.co/api/planets/?format=json")
			 .then(function(res){
			 		var planets = res.data.results;
			 		console.log(planets)
			 			var isBigEnough = function(){
							// look at each planets population and return  
							// an array of those planets that are populous enough
							 planets.forEach(function(planet, index, all) {
								var residents = planet.residents;
								var numOfResidents = Number(residents.length);
								console.log(residents)
								//console.log("Num of residents", numOfResidents)
								if (numOfResidents >=3){
									populousPlanets.push(planet);
								}
							})
							$scope.populousPlanets = populousPlanets;
						}
						isBigEnough()
		 			})
		 	.catch(function(error){console.error(error.status);}) 
		}
	}
})

// swapp.controller("masterCtrl", function($scope, $http){
// 	console.log("master")
// })

