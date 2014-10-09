var lusca = require('lusca');
var debug = require('debuglog')('lusca-wrapper');

module.exports = lusca;

var csrf = lusca.csrf;

lusca.csrf = function (options) {
    var luscaCsrf = csrf(options);
    var ignorePaths = [];
    if (typeof options === 'object' && options !== null && options.ignore){
        if (options.ignore instanceof Array) {
            for (var i in options.ignore) {
                //This substitution allows for matching express paths with parameters.
                //If I want to ignore "/a/path/:with/parameters"
                //This will create a RegExp: "^/a/path/[^/]+/parameters" to test against.
                var reg = new RegExp('^' + options.ignore[i].replace(/:[^\/]+/g, '[^/]+'));
                ignorePaths.push(reg);
                debug('push ignore path' + reg.toString());
            }
        }
    }
    return function(req, res, next){
        for (var i=0; i< ignorePaths.length; i++) {
            if (ignorePaths[i].test(req.path)) {
                debug('path ' + req.path + ' was ignored by lusca wrapper');
                next();
                return;
            }
        }
        debug('path ' + req.path + ' was passed to lusca csrf');
        luscaCsrf(req, res, next);
    }
};