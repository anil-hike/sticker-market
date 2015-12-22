'use strict';

(function() {

	class DesignerController {
		constructor(Auth, $http) {
			this.isLoggedIn = Auth.isLoggedIn;
			this.isAdmin = Auth.isAdmin;

			var currentUser = Auth.getCurrentUser();

			this.pack = {
				tags: [],
				lifespan: {
					from: '',
					to: ''
				},
				location: {
					lat: '',
					long: ''
				}
			};

			this.fetchStickerPacks = function() {
				var self = this;
				$http({
					method: 'GET',
					url: 'http://172.16.2.20:3000/stickerpacks?authorId='+currentUser.fakeUserId
				}).then(function successCallback(response) {
					self.stickerPacks = response.data;
				}, function errorCallback(response) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			}

			this.fetchStickerPacks();

			this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
			this.format = this.formats[0];

			this.dateOptions = {
				formatYear: 'yy',
				startingDay: 1
			};

			this.calenderOpen = false;
			this.openCalender = function() {
				this.calenderOpen = !this.calenderOpen;
			}

			this.pack.time = new Date();

			this.deleteTag = function(index) {
				this.pack.tags.splice(index, 1);
			}

			this.tempTag = '';

			this.addTag = function() {
				if (this.tempTag)
					this.pack.tags.push(this.tempTag);
				this.tempTag = ''
			}

			this.addFile = function() {
				var f = document.getElementById('file').files[0],
					r = new FileReader();
				r.onloadend = function(e) {
					var data = e.target.result;
					//send you binary data via $http or $resource or do anything else with it
				}
				r.readAsBinaryString(f);
			}

			this.createPack = function() {
				var packdata = angular.copy(this.pack);
				var self = this;

				if (packdata.cat !== 'date') {
					packdata.lifespan = null;
				}

				if (packdata.cat !== 'event') {
					packdata.events = null;
				}

				if (packdata.cat !== 'location') {
					packdata.location = null;
				}

				packdata.tags = packdata.tags.join(',');

				if (!packdata.tags) {
					packdata.tags = null
				}

				packdata.authorId = currentUser.fakeUserId;
				var formData = new FormData();

				var files = document.getElementById('file').files;

				for(var i=0; i<files.length; i++){
					formData.append('sticker-pack', files[i] );
				}

				formData.append('metadata', JSON.stringify(packdata));

				$http({
					method: 'POST',
					url: 'http://172.16.2.20:3000/stickerpacks',
					data: formData,
					headers:{'content-type': undefined}
				}).then(function successCallback(response) {
					self.showUploadForm = false;
					self.fetchStickerPacks();
				}, function errorCallback(response) {
					console.log(response)
				});
			}
		}

		delete(user) {
			user.$remove();
			this.users.splice(this.users.indexOf(user), 1);
		}
	}

	angular.module('stickerMarketApp.designer')
		.controller('DesignerController', DesignerController);

})();
