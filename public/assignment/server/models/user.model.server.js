/**
 * Created by emma on 3/13/16.
 */
"use strict";

var q = require("q");


module.exports = function (mongoose) {
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);
    var api = {
        createUser: createUser,
        register: register,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUserById: updateUser,
        updateUserByIdAdmin: updateUserAdmin,
        deleteUser: deleteUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUser: findUser
    };
    return api;

    function createUser(user) {
       var deferred = q.defer();


        UserModel.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, newUser) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            UserModel.find({}, function(err, users) {
                                if(err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(users);
                                }
                            });

                        }
                    });
                }
            });

        return deferred.promise;
    }


    function register(user) {
        var deferred = q.defer();

        UserModel.findOne({username: user.username},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                if (doc) {
                    deferred.resolve(null);
                } else {
                    UserModel.create(user, function (err, newUser) {
                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            // resolve promise
                            deferred.resolve(newUser);
                        }
                    });
                }
            });

        return deferred.promise;
    }




    function findAllUsers(){
        var deferred = q.defer();
        UserModel.find({}, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        UserModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.findOne({
            username: username
        }, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();

        delete user._id;
        UserModel.update({_id: id}, {$set: user}, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                UserModel
                    .findOne({_id: id}, function(err, user){
                        if(err){
                            deferred.reject(err);
                        }
                        else{
                            deferred.resolve(user);
                        }
                    });
            }
        });

        return deferred.promise;
    }


    function updateUserAdmin(id, user) {
        var deferred = q.defer();

        delete user._id;
        UserModel.update({_id: id}, user, function (err, doc) {

            if (err) {
                deferred.reject(err);
            } else {
                // resolve promise with user
                UserModel.find({}, function (err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        UserModel.remove({_id: id}, function (err, removed) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.find({}, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }



    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },

            function (err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;

    }
    function findUser(credentials) {
        var deferred = q.defer();
        UserModel.findOne({
            username : credentials.username
        }, function(err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

};