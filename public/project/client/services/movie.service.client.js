/**
 * Created by emma on 4/20/16.
 */
(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http) {
        var api = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            dislikeMovie: dislikeMovie
        };
        return api;

        function findUserLikes (imdbID) {
            return $http.get("/api/project/details/"+imdbID+"/user");
        }

        function userLikesMovie(userId, movie) {
            return $http.post("/api/project/user/"+userId+"/details/"+movie.imdbID, movie);
        }

        function dislikeMovie(userId, movie) {
            return $http.delete("/api/project/user/"+userId+"/movie/"+movie.imdbID, movie);

        }
    }
})();