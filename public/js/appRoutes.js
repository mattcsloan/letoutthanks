angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../views/home.html'
		})

		.when('/account/login', {
			title: 'Login',
			templateUrl: '../views/account/login.html'
		})

		.when('/account/register', {
			title: 'Register',
			templateUrl: '../views/account/register.html'
		})

		.when('/about', {
			templateUrl: '../views/about/index.html'
		})

		.when('/notes', {
			templateUrl: '../views/notes/index.html',
			controller: 'NotesController'
		})

		.when('/notes/by/:user', {
			templateUrl: '../views/notes/user.html',
			controller: 'NotesController'
		})

		.when('/notes/create', {
			templateUrl: '../views/notes/create.html',
			controller: 'NotesController'
		})

		.when('/notes/edit/:id', {
			templateUrl: '../views/notes/edit.html',
			controller: 'NotesController'
		})

		.when('/notes/:id', {
			templateUrl: '../views/notes/view.html',
			controller: 'NotesController'
		});

	$locationProvider.html5Mode(true);
}]);