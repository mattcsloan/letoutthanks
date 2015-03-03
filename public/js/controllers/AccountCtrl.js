angular.module('AccountCtrl', ['ngAnimate']).controller('AccountController', ['$scope', '$location', 'UserSvc', '$http', function($scope, $location, UserSvc, $http) {
	$scope.title= "Home";
	$scope.date = new Date();
	$scope.errormessage = '';

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
			}, function(response) {
				$scope.errormessage = response.data;
			});
	};
 
	$scope.createUser = function(email, name, username, password) {
		UserSvc.createUser(email, name, username, password)
			.success(function(response) {
				$scope.login(username, password);
			})
			.error(function(response) {
				$scope.errormessage = response;
			});
	};

	$scope.resetPassword = function(username, password, newPassword) {
		UserSvc.resetPassword(username, password, newPassword)
			.success(function(response) {
				$scope.login(username, newPassword);
			})
			.error(function(response) {
				$scope.errormessage = response;
			});
	};

	$scope.forgotPassword = function(username) {
		UserSvc.forgotPassword(username)
			.success(function(response) {
				$location.url('/account/sent-password');
			})
			.error(function(response) {
				$scope.errormessage = response;
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

	$scope.$on('$routeChangeSuccess', function (event, data) {
		$scope.errormessage = '';
		$scope.pageTitle = data.title + ' | Let Out Thanks';
	});

}]);