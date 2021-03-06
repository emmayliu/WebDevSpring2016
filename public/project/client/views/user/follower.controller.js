/**
 * Created by emma on 4/29/16.
 */
(function () {
    angular
        .module("MovieApp")
        .controller("FollowerController", FollowerController);

    function FollowerController($rootScope, UserService) {
        var vm = this;
        var currentUser = $rootScope.currentUser;

        vm.users = currentUser.followers;
        vm.following = currentUser.following;
        vm.followingIds = [];
        vm.follow = follow;



        function init() {
            for(var f in vm.following) {
                vm.followingIds.push(vm.following[f]._id);
            }

        }

        init();

        function follow(index) {
            var newFollowing = vm.users[index];
            UserService
                .userFollowOtherUser(currentUser._id, newFollowing)
                .then(function(response){
                    currentUser.following = response.data.following;
                });
            init();
        }
    }

})();