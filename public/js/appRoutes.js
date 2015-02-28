angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '../views/home.html',
			controller: 'NotesController'
		})

		.when('/account/login', {
			title: 'Login',
			templateUrl: '../views/account/login.html'
		})

		.when('/account/reset-password', {
			title: 'Reset Your Password',
			templateUrl: '../views/account/password-reset.html'
		})

		.when('/account/forgot', {
			title: 'Reset Your Password',
			templateUrl: '../views/account/password-forgot.html'
		})

		.when('/account', {
			title: 'My Account',
			templateUrl: '../views/account/index.html'
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

		.when('/notes/by/me', {
			templateUrl: '../views/notes/currentuser.html',
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