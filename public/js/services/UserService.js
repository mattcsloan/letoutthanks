//do API calls to the Node backend from Angular
angular.module('UserService', []).factory('UserSvc', function($http) {
	var svc = this;

	svc.getUser = function() {
		return $http.get('/api/users', {
			headers: { 'X-Auth': window.localStorage.token }
		});
	}

	svc.login = function(username, password) {
		return $http.post('/api/sessions', {
			username: username,
			password: password
		}).then(function(val) {
			window.localStorage.token = val.data;
			$http.defaults.headers.common['X-Auth'] = val.data;
			return svc.getUser();
		});
	}

	svc.logout = function() {
		window.localStorage.removeItem("token");
		delete $http.defaults.headers.common['X-Auth'];
		return true;
	}

	svc.createUser = function(email, name, username, password) {
		username = username.toLowerCase();
		if(username === "me") {
				console.log('Username already exists');
		} else {
			return $http.post('/api/users', {
				email: email,
				name: name,
				username: username,
				password: password
			})
			.success(function() {
				return svc.login(username, password);
			})
			.error(function(response) {
				console.log('Username already exists');
			});
		}
	}
	
	svc.resetPassword = function(username, password, newPassword) {
		return $http.post('/api/users/reset', {
			username: username,
			password: password,
			newPassword: newPassword
		});
	}

	svc.forgotPassword = function(username) {
		return $http.post('/api/users/forgot', {
			username: username
		});
	}

	

	return svc;
});