angular.module('AccountCtrl', ['ngAnimate']).controller('AccountController', ['$scope', '$location', 'UserSvc', '$http', function($scope, $location, UserSvc, $http) {
	$scope.title= "Home";
	$scope.date = new Date();

	//check to see if user is logged in when app starts
	if(window.localStorage.token) {
		UserSvc.getUser()
			.then(function(response) {
				if(response) {
					$scope.$emit('login', response.data);
				}
				$http.defaults.headers.common['X-Auth'] = window.localStorage.token;
			});
	}

	$scope.login = function(username, password) {
		UserSvc.login(username, password)
			.then(function(response) {
				$scope.$emit('login', response.data);
				$location.url('/notes/by/me');
			});
	};
 
	$scope.createUser = function(email, name, username, password) {
		UserSvc.createUser(email, name, username, password)
			.then(function(response) {
				$scope.$emit('createUser', response.data);
				$location.url('/notes/by/me');
			});
	};

	//display user's account in header if logged in
	$scope.$on('login', function(_, user) {
		$scope.currentUser = user;
	});
	$scope.$on('logout', function() {
		$scope.currentUser = '';
	});
	$scope.$on('createUser', function(_, user) {
		$scope.currentUser = user;
	});

	$scope.logout = function() {
		UserSvc.logout();
 		$scope.$emit('logout', null);
		$location.url('/account/login');
	};
}]);