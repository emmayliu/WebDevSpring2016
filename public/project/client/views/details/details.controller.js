/**
 * Created by emma on 4/24/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               OmdbService,
                               $rootScope,
                               $location,
                               MovieService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            OmdbService
                .findMovieByImdbID (movie.imdbID)
                .then(function(response){
                    vm.data = response.data;
                });

            MovieService
                .findUserLikes (imdbID)
                .then(function(response){
                    vm.movie = response.data;
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                vm.movie.likes = [];
                vm.movie.likes.push(currentUser._id);
                MovieService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();