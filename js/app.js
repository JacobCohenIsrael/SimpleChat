'use_strict';

var game = angular.module('game',
[
	 'ngRoute',
	 'ui.bootstrap',
]);

game.config(function($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide)
{
	// creating a global reference to providers in order to expose them later
	game.register = 
	{
		controller		: $controllerProvider.register,
		directive		: $compileProvider.directive,
		filter			: $filterProvider.register,
		factory			: $provide.factory,
		service			: $provide.service
	};
	
	// shortcuts for creating angular modules
	window.gameController	= $controllerProvider.register;
	window.gameDirective	= $compileProvider.directive;
	window.gameFilter		= $filterProvider.register;
	window.gameFactory	= $provide.factory;
	window.gameService	= $provide.service;
	

	
	// routing resolving by controller name
	var resolver = function(controller)
	{
		/**
		 * This function takes CamelCased string and convert
		 * the string to path based on the camel case:
		 * MySpecialController => /my/special/controller
		 */
		var camelCase2path = function(name)
		{
			return name.replace(/([A-Z])/g, '/$1').toLowerCase();
		};
		
		var path		= camelCase2path(controller);
		var ctrlName	= controller + 'Controller';
		var ctrlPath	= 'controllers' + path;
		var tplPath		= 'views' + path + '.html';
		
		return {
			controller	: ctrlName,
			templateUrl	: tplPath,
			resolve		: {
				load		: function($q, $rootScope)
				{
					var defer = $q.defer();
					require([ctrlPath], function()
					{
						$rootScope.$apply(function() { defer.resolve(); });
					});
					return defer.promise;
				}
			}
		};
	};
	
	var routes = {
			'/'					: 'Home',
	};
	
	// routing configuration
	for (var p in routes)
	{
		$routeProvider.when(p, resolver(routes[p]));
	}
});