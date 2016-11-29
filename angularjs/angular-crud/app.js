


angular.module('demoApp', [])
	.controller('DemoCtrl', function( $scope, demoService ) {
		$scope.name = "Rajkeshwar Prasad";

		$scope.users = [];

		demoService.listUsers()
			.then(function( data ){
				console.log('Success : ', data);
				$scope.users = makeEditable(data);
			});

		function makeEditable( userList ) {
			for (var i = 0; i < userList.length; i++) {
				userList[i].isEdit = false;
			}
			return userList;
		}

		$scope.addNewUser = function() {
			console.log('addUser : ', $scope.user);

			demoService.addUser({
				id: Date.now(),
				name: $scope.user.name,
				username: $scope.user.username,
				email: $scope.user.email
			});

			$scope.user = {};
		}

		$scope.edit = function( index ) {
			$scope.users[index].isEdit = true;
		}

		$scope.update = function( index ) {
			$scope.users[index].isEdit = false;
		}

		$scope.delete = function( index ) {
			$scope.users.splice(index, 1);
		}
	})
	.service('demoService', function( $http ){

		this.users = [];
		this.listUsers = function() {
			var __self = this;
			return $http.get('https://jsonplaceholder.typicode.com/users')
				.then(function( resp ){
					__self.users = resp.data;
					return __self.users;
				});
		}

		this.fetchUsers = function() {
			return this.users;
		}

		this.addUser = function( user ) {
			this.users.push(user);
		}
	});