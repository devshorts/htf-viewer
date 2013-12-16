var serverRoutes = require("./serverRoutes");

module.exports = function(app, config){
    new serverRoutes.ServerRoutes(app, config);
};