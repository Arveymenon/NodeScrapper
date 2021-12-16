const UserRouter = require("./users");
const CommonError = require("./commonError");

function routing(router) {  

    UserRouter(router);

    CommonError(router);
}

module.exports = routing;