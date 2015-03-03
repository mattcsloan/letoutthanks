angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			title: 'Home',
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

		.when('/account/sent-password', {
			title: 'A new password has been sent!',
			templateUrl: '../views/account/password-sent.html'
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
			title: 'About Us',
			templateUrl: '../views/about/index.html'
		})

		.when('/privacy', {
			title: 'Privacy Policy',
			templateUrl: '../views/privacy.html'
		})

		.when('/contact', {
			title: 'Contact Us',
			templateUrl: '../views/contact.html'
		})

		.when('/notes', {
			title: 'All Thank You Notes',
			templateUrl: '../views/notes/index.html',
			controller: 'NotesController'
		})

		.when('/notes/by/me', {
			title: 'My Thank You Notes',
			templateUrl: '../views/notes/currentuser.html',
			controller: 'NotesController'
		})

		.when('/notes/by/:user', {
			title: 'User Thank You Notes',
			templateUrl: '../views/notes/user.html',
			controller: 'NotesController'
		})

		.when('/notes/create', {
			title: 'Create Thank You Note',
			templateUrl: '../views/notes/create.html',
			controller: 'NotesController'
		})

		.when('/notes/edit/:id', {
			title: 'Edit Thank You Note',
			templateUrl: '../views/notes/edit.html',
			controller: 'NotesController'
		})

		.when('/notes/:id', {
			title: 'Thank You Note',
			templateUrl: '../views/notes/view.html',
			controller: 'NotesController'
		})

		.otherwise({
			title: 'Page Not Found',
			templateUrl:'../views/404.html'
		});

	$locationProvider.html5Mode(true);
}]);