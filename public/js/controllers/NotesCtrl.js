angular.module('NotesCtrl', []).controller('NotesController', ['$scope', '$routeParams', '$location', 'NoteSvc', function($scope, $routeParams, $location, NoteSvc) {
	$scope.title= "Thank You Notes";

	$scope.getNotes = function() {
		NoteSvc.get()
			.success(function(data, status) {
				$scope.notes = data;
			})
			.error(function(data, status) {
				alert("Error retreiving notes");
			});
 	};

	$scope.getRecentNotes = function() {
		NoteSvc.getRecent()
			.success(function(data, status) {
				$scope.notes = data;
			})
			.error(function(data, status) {
				alert("Error retreiving latest notes");
			});
 	};

 	//use websockets to push new note/edit note/delete note on All Notes page for all current user sessions
 	$scope.$on('ws:note_update', function(_, note) {
		$scope.getNotes();
 	});

	$scope.getNotesByUser = function() {
		var user = $routeParams.user;
		$scope.title= "Thank You Notes by " + user;
		NoteSvc.getByUser(user)
			.success(function(data, status) {
				$scope.notes = data;
			})
			.error(function(data, status) {
				alert("Error retreiving notes by " + user);
			});
 	};

	$scope.getNotesByCurrentUser = function() {
		var user = $scope.currentUser.username; //curently logged in user $routeParams.user;
		$scope.title= "My Thank You Notes";
		NoteSvc.getByCurrentUser(user)
			.success(function(data, status) {
				$scope.notes = data;
			})
			.error(function(data, status) {
				alert("Error retreiving your notes");
			});
 	};

	$scope.getNote = function() {
		var id = $routeParams.id;
		$scope.title= "Edit Thank You Note";
		NoteSvc.getNote(id)
			.success(function(data, status) {
				if(data.name === "CastError") {
				$scope.notes = "error";
				} else {
					$scope.notes = data;
				}
				if($scope.currentUser && $scope.currentUser.username === $scope.notes.username) {
					$scope.author = true;
				}
			})
			.error(function(data, status) {
				alert("Error retreiving note");
			});
 	};

 	$scope.viewUrl = function() {
		var id = $routeParams.id;
		$location.url('/notes/' + id);
 	};

 	$scope.note = {};

	$scope.addNote = function() {
		NoteSvc.create({
			yourName: $scope.note.yourName, 
			theirName: $scope.note.theirName, 
			pageTitle: $scope.note.pageTitle, 
			pageContent: $scope.note.pageContent
		});

		$scope.note.yourName = '';
		$scope.note.theirName = '';
		$scope.note.pageTitle = '';
		$scope.note.pageContent = '';

		$location.url('/notes');
 	};

	$scope.editNote = function() {
		var id = $routeParams.id;
		if($scope.currentUser.username === $scope.notes.username) {
			NoteSvc.edit(id, {
				yourName: $scope.notes.yourName, 
				theirName: $scope.notes.theirName, 
				pageTitle: $scope.notes.pageTitle, 
				pageContent: $scope.notes.pageContent
			});

			$scope.notes.yourName = '';
			$scope.notes.theirName = '';
			$scope.notes.pageTitle = '';
			$scope.notes.pageContent = '';

			$location.url('/notes/');
		}
 	};

	$scope.deleteNote = function() {
		var id = $routeParams.id;
		NoteSvc.delete(id);
		$location.url('/notes');
 	};
}]);