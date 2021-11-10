const Instagram = require('instagram-web-api')
var Q = require('q');
const config = require('../config.json')
const { username, password } = require('../config.json').instagram.credentials
const target_username = config.instagram.target_username || username
if (target_username) {
    var client = Instagram
    if (username && password) {
        client = new Instagram({ username, password })
        client.login().then(() => { console.log('Login à Instagram réussi') }).catch(console.error);
    }
    else console.log('Impossible de se connecter instagram : Couple username/password incomplet, fonctionnement sans login')
    

    exports.get = function(callback) {
        var deferred = Q.defer();
        client.getUserByUsername({ username: target_username }).then((data) => {
            if(data && data.edge_followed_by && data.edge_followed_by.count) {
                deferred.resolve(data.edge_followed_by.count);
            } else {
                deferred.reject(error);
            }
        }).catch(console.error);
        deferred.promise.nodeify(callback);
        return deferred.promise;
    };
} else console.log('Impossible de récupérer les abonnés d\'instagram, pas de compte ciblé.')