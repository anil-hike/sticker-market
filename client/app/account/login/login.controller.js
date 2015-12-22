'use strict';

class LoginController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        //this.currentUser = Auth.getCurrentUser();
        if(this.Auth.isAdmin()){
		this.$state.go('admin');
        }else{
        	console.log(this.$state);
        	this.$state.go('designer');
        }
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('stickerMarketApp')
  .controller('LoginController', LoginController);
