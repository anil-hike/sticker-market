'use strict';

(function() {

	class AdminController {
		constructor(Auth, $http) {
			// Use the User $resource to fetch all users
			var currentUser = Auth.getCurrentUser();

			this.stickerPacks = null;


			this.fetchStickerPacks = function() {
				var self = this;
				$http({
					method: 'GET',
					url: 'http://172.16.2.20:3000/stickerpacks?isApprover='+true
				}).then(function successCallback(response) {
					self.stickerPacks = response.data;
					self.stickerPacks.map(function(pack){
						if(pack.approvalStatus === 'approved')
							pack.approved = true;
						if(pack.approvalStatus === 'rejected')
							pack.rejected = true;
					})
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			}

			this.rejectStickerPack = function(pack){
				var self = this;
				$http({
					method: 'POST',
					url: 'http://172.16.2.20:3000/stickerpacks/reject/'+pack.id
				}).then(function successCallback(response) {
					pack.rejected = true;
					pack.approved = false;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			}

			this.approveStickerPack = function(pack){
				var self = this;
				$http({
					method: 'POST',
					url: 'http://172.16.2.20:3000/stickerpacks/approve/'+pack.id
				}).then(function successCallback(response) {
					pack.rejected = false;
					pack.approved = true;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			}

			this.fetchStickerPacks();
		}
	}

	angular.module('stickerMarketApp.admin')
		.controller('AdminController', AdminController);

})();
