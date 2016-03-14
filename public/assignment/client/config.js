/**
 * Created by emma on 2/27/16.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })

            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })

            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController"
            })

            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
            })

            .when("/fields", {
                templateUrl: "views/forms/fields.view.html",
            })



            .otherwise({
                redirectTo: "/home"

            })

    }

})();